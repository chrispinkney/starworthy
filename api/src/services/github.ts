import { Octokit } from 'octokit';
import { performanceLogger, errorLogger } from '../decorators/logger';

export const fetchUser = async (): Promise<string> => {
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

export const unstarRepo = async (
  owner: string,
  repo: string,
): Promise<void> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB,
  });

  performanceLogger.startNow();

  try {
    await octokit.request(`DELETE /user/starred/${owner}/${repo}`, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    performanceLogger.log();
  } catch (e) {
    errorLogger.log(`Error in GitHub service: ${e.message}`);
  }
};

export const starRepo = async (owner: string, repo: string) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB,
  });

  performanceLogger.startNow();

  try {
    await octokit.request(`PUT /user/starred/${owner}/${repo}`, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    performanceLogger.log();
  } catch (e) {
    errorLogger.log(`Error in GitHub service: ${e.message}`);
  }
};
