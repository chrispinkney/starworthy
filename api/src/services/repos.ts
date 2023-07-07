import { Octokit } from 'octokit';
import {
  performanceLogger,
  errorLogger,
  userActionLogger,
} from '../decorators/logger';
import {
  readRepos,
  writeUser,
  writeRepos,
  findUser,
  deleteRepos,
  findRandom,
  deleteRepo,
} from './db';
import { fetchUser, starRepo, unstarRepo } from './github';

export const getRepos = async (): Promise<GitHubRepo[]> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB,
  });

  performanceLogger.startNow();
  const perPage = 100;

  try {
    const res = await octokit.request('GET /user/starred', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      per_page: 1,
    });

    const regex = /&page=[0-9]*/g;
    const pageQuery = res.headers.link?.match(regex);

    let starredRepos: GitHubRepo[] = [];

    if (pageQuery?.length === 2) {
      const starredCount = parseInt(
        pageQuery[1].slice(pageQuery[1].indexOf('=') + 1),
        10,
      );

      const numberOfTimes = Math.floor(starredCount / perPage) + 1;

      const promises = await Promise.all(
        [...Array(numberOfTimes).keys()].map((i) =>
          octokit.request('GET /user/starred', {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
            per_page: perPage,
            page: i + 1,
          }),
        ),
      );

      starredRepos = new Array(starredCount);

      promises.forEach((repoSet, j) => {
        repoSet.data.forEach((repo, i) => {
          starredRepos[(j * perPage + i) as number] = {
            repoId: repo.id,
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            language: repo.language,
            issues: repo.open_issues_count,
            url: repo.html_url,
            createdAt: repo.created_at,
            owner: repo.owner.login,
          };
        });
      });
    }

    performanceLogger.log();

    return starredRepos;
  } catch (e) {
    errorLogger.log(`Error in repo service: ${e.message}`);
    return [];
  }
};

export const fetchRepos = async (
  language?: string,
  stars?: number,
  contributors?: number,
  issues?: number,
  prs?: number,
): Promise<Repo[] | undefined> => {
  performanceLogger.startNow();

  const username = await fetchUser();
  const user = await findUser(username);

  if (user && (language || stars || contributors || issues || prs)) {
    performanceLogger.log();
    return readRepos(user.id, language, stars, contributors, issues, prs);
  }

  if (user) {
    performanceLogger.log();
    return readRepos(user.id);
  }

  return undefined;
};

export const fetchRandomRepo = async (): Promise<Repo> => {
  performanceLogger.startNow();

  const randomRepo = await findRandom();

  performanceLogger.log();

  return randomRepo;
};

export const removeRepo = async (owner: string, repo: string) => {
  if (owner && repo) {
    performanceLogger.startNow();
    // delete repo from github
    await unstarRepo(owner, repo);

    // delete repo from db
    await deleteRepo(owner, repo);

    performanceLogger.log();
  }
};

export const removeRepos = async (
  githubRepos: GitHubRepo[],
  dbRepos: Repo[],
) => {
  if (dbRepos) {
    performanceLogger.startNow();

    const githubRepoIds = githubRepos.map((repo) => repo.repoId);

    const missingRepoIds = dbRepos.reduce((acc, repo) => {
      if (!githubRepoIds.includes(repo.repo_id)) {
        acc.push(repo.repo_id);
      }
      return acc;
    }, []);

    if (missingRepoIds.length > 0) {
      deleteRepos(missingRepoIds);
    }

    performanceLogger.log();
  }
};

export const storeRepos = async () => {
  userActionLogger.log('Repo-DB refresh initialized');
  performanceLogger.startNow();

  const username = await fetchUser();
  let user = await findUser(username);

  if (!user) {
    user = await writeUser(username);
  }

  const starredRepos = await getRepos();

  if (user) {
    // check to see if user has repos in db already
    const dbrepos = await readRepos(user.id);

    // if user has repos in db, remove unstarred repos
    if (dbrepos) {
      await removeRepos(starredRepos, dbrepos);
    }

    // write repos to db
    await writeRepos(starredRepos, user.id);
  }

  performanceLogger.log();
};

export const addRepo = async (owner: string, repo: string) => {
  if (owner && repo) {
    performanceLogger.startNow();
    // star repo on github
    await starRepo(owner, repo);

    // force update to db with newly starred repo
    await storeRepos();

    performanceLogger.log();
  }
};

// store repos immediately upon start up if in production
if (process.env.NODE_ENV === 'production') storeRepos();
