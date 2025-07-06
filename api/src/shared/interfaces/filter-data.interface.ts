interface FilterData<T> {
  page: number;

  limit: number;

  search: string;

  searchColumns: (keyof T)[];

  filters: Partial<T>;

  orderBy: keyof T;

  orderDir: "ASC" | "DESC" | null;
}

export default FilterData;
