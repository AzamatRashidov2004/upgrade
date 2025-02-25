export interface OrderItem {
  product: string;
  configuration: {
    condition: string;
    color: string;
    storage: string;
  };
  quantity: number;
  price_at_purchase: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shipping_address: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  created_at: Date;
}
