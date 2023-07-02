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
} from './db';
import fetchUser from './github';

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

export const fetchRepos = async (): Promise<Repo[] | undefined> => {
  performanceLogger.startNow();

  const username = await fetchUser();
  const user = await findUser(username);

  if (user) {
    return readRepos(user.id);
  }

  performanceLogger.log();

  return undefined;
};

export const fetchRandomRepo = async (): Promise<Repo> => {
  performanceLogger.startNow();

  const randomRepo = await findRandom();

  performanceLogger.log();

  return randomRepo;
};

export const removeRepos = async (
  githubRepos: GitHubRepo[],
  dbRepos: Repo[],
) => {
  if (dbRepos) {
    performanceLogger.startNow();

    const vercelRepoIds = dbRepos.map((dbObj) => dbObj.repo_id);
    const githubRepoIds = githubRepos.map((dbObj) => dbObj.repoId);

    const missingRepoIds = vercelRepoIds.filter(
      (repoId: number) => !githubRepoIds.includes(repoId),
    );

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

// store repos immediately upon start up if in production
if (process.env.NODE_ENV === 'production') storeRepos();
