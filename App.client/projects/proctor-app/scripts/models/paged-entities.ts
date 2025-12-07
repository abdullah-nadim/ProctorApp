export class PagedEntities<T> {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: T[];

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 0;
    this.totalItems = 0;
    this.totalPages = 0;
    this.items = [];
  }
}

