import getUsername from '../services/user';
import { errorLogger, userActionLogger } from '../decorators/logger';

const getUser = async (): Promise<{ username: string }> => {
  try {
    userActionLogger.log('User requested getUsername');

    const username: { username: string } = await getUsername();

    return username;
  } catch (e) {
    errorLogger.log(`Error in starsController: ${e.message}`);
    throw Error(e.message);
  }
};

export default getUser;
