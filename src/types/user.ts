export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  current_order?: {
    order_id: string;
    status: string;
  };
  purchase_history: string[];
}
