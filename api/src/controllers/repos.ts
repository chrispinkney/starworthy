import { fetchRepos } from '../services/repos';
import { errorLogger, userActionLogger } from '../decorators/logger';

const getRepos = async (): Promise<Repo[] | undefined> => {
  try {
    userActionLogger.log('user requested getUser');
    const repos = await fetchRepos();

    return repos;
  } catch (e) {
    errorLogger.log(`Error in starsController: ${e.message}`);
    return undefined;
  }
};

export default getRepos;
