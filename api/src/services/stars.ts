import { Octokit } from 'octokit';

const stars = async () => {
  const octokit = new Octokit({
    auth: process.env.github,
  });

  const perPage: number = 100;

  try {
    const res = await octokit.request('GET /user/starred', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      per_page: 1,
    });

    const regex = /&page=[0-9]*/g;
    const pageQuery = res.headers.link?.match(regex);
    const starredCount = parseInt(
      pageQuery[1].slice(pageQuery[1].indexOf('=') + 1),
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

    const starredRepos = new Array(starredCount);

    promises.forEach((repoSet, j) => {
      repoSet.data.forEach((repo, i) => {
        starredRepos[(j * perPage + i) as number] = {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          issues: repo.open_issues_count,
          url: repo.html_url,
        };
      });
    });

    return JSON.stringify(starredRepos);
  } catch (e) {
    console.log(`Error: ${e.messsage}`);
  }
};

export default stars;
