import FilterStrategy from '../FilterStrategy';

class PullRequestsFilter implements FilterStrategy {
  private minPullRequests: number;

  constructor(minPullRequests: number) {
    this.minPullRequests = minPullRequests;
  }

  applyFilter(repos: Repo[]): Repo[] {
    return repos.filter((repo) => repo.pullRequests >= this.minPullRequests);
  }
}

export default PullRequestsFilter;
