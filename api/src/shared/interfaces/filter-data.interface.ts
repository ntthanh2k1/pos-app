interface FilterData<T> {
  page: number;

  limit: number;

  search: string;

  searchColumns: (keyof T)[];

  /**
   * Key-value pairs to filter data by. By default it accepts any partial
   * properties of the entity <T>, but we also allow additional arbitrary
   * keys so that callers can pass filters that reference joined or related
   * entities (e.g. `branchId`).
   */
  filters: Partial<T> & Record<string, any>;

  orderBy: keyof T;

  orderDir: "ASC" | "DESC" | null;
}

export default FilterData;
