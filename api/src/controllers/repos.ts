import { fetchRepos, fetchRandomRepo } from '../services/repos';
import { errorLogger, userActionLogger } from '../decorators/logger';

export const getRepos = async (): Promise<Repo[] | undefined> => {
  try {
    userActionLogger.log('user requested getUser');
    const repos = await fetchRepos();

    return repos;
  } catch (e) {
    errorLogger.log(`Error in starsController: ${e.message}`);
    return undefined;
  }
};

export const getRandom = async (): Promise<Repo> => {
  try {
    userActionLogger.log('user requested getRandom');
    const repos = await fetchRandomRepo();

    return repos;
  } catch (e) {
    errorLogger.log(`Error in starsController: ${e.message}`);
    throw Error(e.message);
  }
};
