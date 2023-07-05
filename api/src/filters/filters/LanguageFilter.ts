import FilterStrategy from '../FilterStrategy';

class LanguageFilter implements FilterStrategy {
  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  applyFilter(repos: Repo[]): Repo[] {
    return repos.filter((repo) => repo.language === this.language);
  }
}

export default LanguageFilter;
