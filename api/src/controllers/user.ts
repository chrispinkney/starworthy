import getUsername from '../services/user';
import { errorLogger, userActionLogger } from '../decorators/logger';

const getUser = async (): Promise<string | undefined> => {
  try {
    userActionLogger.log('User Controller');
    const username: string = await getUsername();

    return username;
  } catch (e) {
    errorLogger.log(`Error in Users Controller: ${e.message}`);
    return undefined;
  }
};

export default getUser;
