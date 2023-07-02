import getUsername from '../services/user';
import { errorLogger, userActionLogger } from '../decorators/logger';

const getUser = async (): Promise<string> => {
  try {
    userActionLogger.log('User requested getUsername');

    const username: string = await getUsername();

    return username;
  } catch (e) {
    errorLogger.log(`Error in starsController: ${e.message}`);
    throw Error(e.message);
  }
};

export default getUser;
