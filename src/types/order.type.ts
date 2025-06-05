export interface IServiceData {
  id_order_service?: number;
  id_service: number;
  discount: string;
  quantity: number;
  price?: string;
  description?: string;
  time?: string;
  suggested_date?: string;
}

export interface ICreateOrderService {
  id_user: string;
  price?: string;
  order_number?: string;
  services?: IServiceData[];
  pre_name: string;
  pre_email: string;
  pre_ddi?: string;
  pre_ddd?: string;
  pre_phone: string;
  id_cond_pag: string;
  id_coupons: string;
}

export interface IUpdateOrderRequest {
  id_order: string;
  id_user?: string;
  id_costumer?: string;
  price?: string;
  id_status_order?: number;
  services?: IServiceData[];
  pre_name?: string;
  pre_email?: string;
  pre_ddi?: string;
  pre_ddd?: string;
  pre_phone?: string;
  id_cond_pag?: string;
  id_coupons?: string;
}

export interface IListOrdersRequest {
  search?: string;
  page: number;
  perpage: number;
  id_user?: string;
}

export interface IListOrdersResponse {
  orders: any[];
  page: number;
  perpage: number;
  lastPage: number;
  totalCount: number;
  userPosition?: number;
}
