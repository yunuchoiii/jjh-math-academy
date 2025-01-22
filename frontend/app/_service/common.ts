export interface PaginationPayload {
  page: number;
  size: number;
  searchKeyword?: string;
  searchType?: "title" | "content" | "title+content";
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