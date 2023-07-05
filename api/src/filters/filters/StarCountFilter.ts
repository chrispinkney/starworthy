import FilterStrategy from '../FilterStrategy';

class StarCountFilter implements FilterStrategy {
  private minStars: number;

  constructor(minStars: number) {
    this.minStars = minStars;
  }

  applyFilter(repos: Repo[]): Repo[] {
    return repos.filter((repo) => repo.stars >= this.minStars);
  }
}

export default StarCountFilter;
