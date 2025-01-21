export interface PaginationPayload {
  page: number;
  size: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  page: IPaginationInfo;
}

export interface IPaginationInfo {
  isFirstPage: boolean;
  isLastPage: boolean;
  requestPage: number;
  requestSize: number;
  totalDataCount: number;
  totalPages: number;
}