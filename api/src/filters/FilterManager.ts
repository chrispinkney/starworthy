import FilterStrategy from './FilterStrategy';

class FilterManager {
  private filters: FilterStrategy[];

  constructor(filters: FilterStrategy[]) {
    this.filters = filters;
  }

  applyFilters(repos: Repo[]): Repo[] {
    let filteredRepos = [...repos];

    this.filters.forEach((filter) => {
      filteredRepos = filter.applyFilter(filteredRepos);
    });

    return filteredRepos;
  }
}

export default FilterManager;
