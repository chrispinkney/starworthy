interface FilterStrategy {
  applyFilter(repos: Repo[]): Repo[];
}

export default FilterStrategy;
