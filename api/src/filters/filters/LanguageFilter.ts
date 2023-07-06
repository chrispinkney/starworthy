import FilterStrategy from '../FilterStrategy';

class LanguageFilter implements FilterStrategy {
  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  applyFilter(repos: Repo[]): Repo[] {
    return repos.filter((repo) => {
      return repo.language.toUpperCase() === this.language.toUpperCase();
    });
  }
}

export default LanguageFilter;
