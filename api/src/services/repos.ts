import { performanceLogger, userActionLogger } from '../decorators/logger';
import {
  readRepos,
  writeUser,
  writeRepos,
  findUser,
  deleteRepos,
  findRandom,
  deleteRepo,
  readLanguages,
  readReposCount,
} from './db';
import { fetchUser, unstarRepo, getRepos } from './github';

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

export const fetchLanguages = async (): Promise<Repo> => {
  performanceLogger.startNow();

  const username = await fetchUser();
  const user = await findUser(username);

  let languages;

  if (user) {
    languages = await readLanguages(user?.id);
  }

  performanceLogger.log();

  return languages;
};

export const fetchReposCount = async (): Promise<Repo> => {
  performanceLogger.startNow();

  const username = await fetchUser();
  const user = await findUser(username);

  let count;

  if (user) {
    count = await readReposCount(user?.id);
  }

  performanceLogger.log();

  return count;
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

// store repos immediately upon start up if in production
if (process.env.NODE_ENV === 'production') storeRepos();
