export interface IServicePayload {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

export interface IUpdateServicePayload {
  categoryId?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
}


export interface IServiceQuery {
  search?: string;
  type?: string;
  location?: string;
  rating?: string;

  page?: string;
  limit?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}