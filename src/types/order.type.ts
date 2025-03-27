export interface IServiceData {
  id_order_service?: number;
  id_service: number;
  discount: number;
  price?: number;
  description?: string;
  suggested_date?: string;
}

export interface ICreateOrderService {
  id_user: string;
  price?: number;
  services?: IServiceData[];
  pre_name: string;
  pre_email: string;
  pre_ddi?: string;
  pre_ddd?: string;
  pre_phone: string;
}

export interface IUpdateOrderRequest {
  id_order: string;
  id_user?: string;
  id_costumer?: string;
  price?: number;
  id_status_order?: number;
  services?: IServiceData[];
  pre_name?: string;
  pre_email?: string;
  pre_ddi?: string;
  pre_ddd?: string;
  pre_phone?: string;
}
