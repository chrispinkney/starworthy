import { errorLogger, performanceLogger } from '../decorators/logger';
import fetchUser from './github';

const getUsername = (): Promise<string> => {
  try {
    performanceLogger.startNow();

    const username = fetchUser();

    performanceLogger.log();

    return username;
  } catch (e) {
    errorLogger.log(`Error in user service: ${e.message}`);
    throw Error(e.message);
  }
};

export default getUsername;
