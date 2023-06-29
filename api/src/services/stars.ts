import { Octokit } from 'octokit';
import {
  performanceLogger,
  errorLogger,
  userActionLogger,
} from '../decorators/logger';
import { findUser, writeUser, writeRepos } from './db';
import fetchUser from './user';

export const stars = async (): Promise<GitHubRepo[]> => {
  const octokit = new Octokit({
    auth: process.env.github,
  });

  const perPage = 100;
  performanceLogger.startNow();

  try {
    const res = await octokit.request('GET /user/starred', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      per_page: 1,
    });

    const regex = /&page=[0-9]*/g;
    const pageQuery = res.headers.link?.match(regex);

    let starredRepos: GitHubRepo[] = [];

    if (pageQuery?.length === 2) {
      const starredCount = parseInt(
        pageQuery[1].slice(pageQuery[1].indexOf('=') + 1),
        10,
      );

      const numberOfTimes = Math.floor(starredCount / perPage) + 1;

      const promises = await Promise.all(
        [...Array(numberOfTimes).keys()].map((i) =>
          octokit.request('GET /user/starred', {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
            per_page: perPage,
            page: i + 1,
          }),
        ),
      );

      starredRepos = new Array(starredCount);

      promises.forEach((repoSet, j) => {
        repoSet.data.forEach((repo, i) => {
          starredRepos[(j * perPage + i) as number] = {
            repoId: repo.id,
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            language: repo.language,
            issues: repo.open_issues_count,
            url: repo.html_url,
            createdAt: repo.created_at,
          };
        });
      });
    }

    performanceLogger.log();
    return starredRepos;
  } catch (e) {
    errorLogger.log(`Error in stars service: ${e.message}`);
    return [];
  }
};

export const fetchRepos = async (): Promise<Repo[] | undefined> => {
  userActionLogger.log('Stars Controller');

  // get username based on token from github api
  const user = await fetchUser();

  // if the user no exist in db store username, pull, and store repos in db
  // otherwise pull from api and store in db if last sync time is >1h
  const userExistsInDb = await findUser(user);
  if (!userExistsInDb) await writeUser(user);

  // get starredRepos from github api
  const starredRepos = await stars();

  // store repos in db
  // store many repos with the userid of the user
  if (userExistsInDb) {
    await writeRepos(starredRepos, userExistsInDb.id);
  }

  return starredRepos;
};
