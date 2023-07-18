import { Octokit } from 'octokit';
import { performanceLogger, errorLogger } from '../decorators/logger';

export const octokit = new Octokit({
  auth: process.env.GITHUB,
});

export const fetchUser = async (): Promise<string> => {
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

export const fetchContributors = async (
  owner: string,
  repo: string,
): Promise<number> => {
  performanceLogger.startNow();

  const perPage = 100;

  let totalContributors = 0;

  try {
    const res = await octokit.request(
      `GET /repos/${owner}/${repo}/contributors`,
      {
        owner,
        repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        per_page: 1,
      },
    );

    const regex = /&page=[0-9]*/g;
    const pageQuery = res.headers.link?.match(regex);

    if (pageQuery?.length === 2) {
      const starredCount = parseInt(
        pageQuery[1].slice(pageQuery[1].indexOf('=') + 1),
        10,
      );

      const numberOfTimes = Math.floor(starredCount / perPage) + 1;

      const promises = await Promise.all(
        [...Array(numberOfTimes).keys()].map((i) =>
          octokit.request(`GET /repos/${owner}/${repo}/contributors`, {
            owner,
            repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
            per_page: perPage,
            page: i + 1,
          }),
        ),
      );

      promises.forEach((batch) => {
        totalContributors += batch.data.length;
      });
    }

    performanceLogger.log();

    return totalContributors;
  } catch (e) {
    errorLogger.log(`Error in repo service: ${e.message}`);
    return -1;
  }
};

export const fetchPullRequests = async (
  owner: string,
  repo: string,
): Promise<number> => {
  performanceLogger.startNow();

  const perPage = 100;

  let totalPullRequests = 0;

  try {
    const res = await octokit.request(`GET /repos/${owner}/${repo}/pulls`, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      per_page: 1,
    });

    const regex = /&page=[0-9]*/g;
    const pageQuery = res.headers.link?.match(regex);

    if (pageQuery?.length === 2) {
      const starredCount = parseInt(
        pageQuery[1].slice(pageQuery[1].indexOf('=') + 1),
        10,
      );

      const numberOfTimes = Math.floor(starredCount / perPage) + 1;

      const promises = await Promise.all(
        [...Array(numberOfTimes).keys()].map((i) =>
          octokit.request(`GET /repos/${owner}/${repo}/pulls`, {
            owner,
            repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
            per_page: perPage,
            page: i + 1,
          }),
        ),
      );

      promises.forEach((batch) => {
        totalPullRequests += batch.data.length;
      });
    }

    performanceLogger.log();

    return totalPullRequests;
  } catch (e) {
    errorLogger.log(`Error in repo service: ${e.message}`);
    return -1;
  }
};

export const unstarRepo = async (
  owner: string,
  repo: string,
): Promise<void> => {
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
