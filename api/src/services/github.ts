import { Octokit } from 'octokit';
import { performanceLogger, errorLogger } from '../decorators/logger';

const fetchUser = async (): Promise<string> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB,
  });

  performanceLogger.startNow();

  try {
    const res = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const username = res.data.login;

    performanceLogger.log();

    return username;
  } catch (e) {
    errorLogger.log(`Error in GitHub service: ${e.message}`);
    throw Error(e.message);
  }
};

export default fetchUser;
