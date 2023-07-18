declare type User = {
  id: number;
  github_username: string;
};

declare type GitHubRepo = {
  repoId: number;
  name: string;
  description: string | null;
  stars: number;
  language: string | null;
  issues: number;
  url: string;
  createdAt: string | null;
  owner: string;
  contributors: number;
  pullRequests: number;
};

declare type UserId = {
  userId: number;
};

declare type Repo = GitHubRep & UserId;
