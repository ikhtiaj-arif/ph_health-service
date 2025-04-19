type IOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};
type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortOrder: string;
  sortBy: string;
};
const calculatePagination = (options: IOptions):IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};

export const paginationHelpers = {
  calculatePagination,
};
