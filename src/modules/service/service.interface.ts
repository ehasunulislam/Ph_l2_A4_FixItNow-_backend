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