import FilterStrategy from '../FilterStrategy';

class ContributorsFilter implements FilterStrategy {
  private minContributors: number;

  constructor(minContributors: number) {
    this.minContributors = minContributors;
  }

  applyFilter(repos: Repo[]): Repo[] {
    return repos.filter((repo) => repo.contributors >= this.minContributors);
  }
}

export default ContributorsFilter;
