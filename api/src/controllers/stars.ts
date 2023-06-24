import findAll from '../services/db';
import stars from '../services/stars';
import { errorLogger, userActionLogger } from '../decorators/logger';

export const starsController = async (): Promise<string | undefined> => {
  try {
    userActionLogger.log('Stars Controller');
    const starredRepos = await stars();

    return starredRepos;
  } catch (e) {
    errorLogger.log(`Error in starsController: ${e.message}`);
    return undefined;
  }
};

export const ping = async (): Promise<{ email: string }[] | undefined> => {
  try {
    userActionLogger.log('user requested ping');
    const paella = await findAll();

    return paella;
  } catch (e) {
    errorLogger.log(e.message);
    return undefined;
  }
};
