interface PaginateData<T> {
  data: T[];

  page: number;

  limit: number;

  totalRecords: number;

  totalPages: number;

  hasPrev: boolean;

  hasNext: boolean;
}

export default PaginateData;
