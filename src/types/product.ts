export interface ProductCondition {
  condition: string;
  detail: {
    price: number;
    quantity: number;
  };
  is_available: boolean;
}

export interface ProductSpecifications {
  conditions: ProductCondition[];
  processors: Array<{ name: string; speed?: string }>;
  memories: Array<{ size: string; type?: string }>;
  storage_options: Array<{ capacity: string; type?: string }>;
  color_options: Array<{ name: string; hex_code: string }>;
}

export interface Product {
  _id: string;
  product_title: string;
  category: "iPhone" | "MacBook" | "iPad";
  specifications: ProductSpecifications;
  created_at: Date;
}

export interface CheapestCombination {
  condition: ProductCondition;
  storage_option?: { capacity: string; type?: string };
  color_option?: { name: string; hex_code: string };
  totalPrice: number;
}
