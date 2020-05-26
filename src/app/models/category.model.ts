export interface CategoryModelServer {
  id: number;
  title: string;
}

export interface ServerResponse {
  count: number;
  categories: CategoryModelServer[];
}
