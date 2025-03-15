export interface User {
  id_user?: string;
  name: string;
  email: string;
  password?: string;
  id_position: number;
  ddi?: string;
  ddd?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserRequest extends User {
  password: string;
}
