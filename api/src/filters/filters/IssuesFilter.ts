import FilterStrategy from '../FilterStrategy';

class IssuesFilter implements FilterStrategy {
  private minIssues: number;

  constructor(minIssues: number) {
    this.minIssues = minIssues;
  }

  applyFilter(repos: Repo[]): Repo[] {
    return repos.filter((repo) => repo.issues >= this.minIssues);
  }
}

export default IssuesFilter;
