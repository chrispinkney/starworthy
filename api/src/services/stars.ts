import { Octokit } from 'octokit';

const stars = async () => {
  const octokit = new Octokit({ auth: process.env.github });
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  return login;
};

export default stars;
