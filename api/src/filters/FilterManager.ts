import FilterStrategy from './FilterStrategy';

/*
A FilterManager is created and desired filters are specified to
constructor before being applied. see src\services\db for implementation details
*/
class FilterManager {
  private filters: FilterStrategy[];

  constructor(filters: FilterStrategy[]) {
    this.filters = filters;
  }

  // applies all given filters passed in to the constructor, see /filters
  applyFilters(repos: Repo[]): Repo[] {
    let filteredRepos = [...repos];

    this.filters.forEach((filter) => {
      filteredRepos = filter.applyFilter(filteredRepos);
    });

    return filteredRepos;
  }
}

export default FilterManager;
