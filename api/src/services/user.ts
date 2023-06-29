import { errorLogger } from '../decorators/logger';
import fetchUser from './github';

const getUsername = (): Promise<string> => {
  try {
    return fetchUser();
  } catch (e) {
    errorLogger.log(`Error in user service: ${e.message}`);
    throw Error(e.message);
  }
};

export default getUsername;
