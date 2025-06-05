export interface ServiceType {
  id_service?: number;
  description: string;
  type: string;
  price: string;
  time: string;
  observation: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceRequest extends ServiceType {
  id_service: number;
}
