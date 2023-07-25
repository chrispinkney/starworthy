import { errorLogger, performanceLogger } from '../decorators/logger';
import { fetchUser } from './github';

const getUsername = async (): Promise<{ username: string }> => {
  try {
    performanceLogger.startNow();

    const username = await fetchUser();

    performanceLogger.log();

    return { username };
  } catch (e) {
    errorLogger.log(`Error in user service: ${e.message}`);
    throw Error(e.message);
  }
};

export default getUsername;
