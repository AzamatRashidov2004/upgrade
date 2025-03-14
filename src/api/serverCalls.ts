// types.ts
export interface Product {
  _id: string;
  device_type: 'iPhone' | 'MacBook' | 'iPad';
  model: string;
  price: number;
  image?: string;
  condition: string;
  battery: string;
  color: string;
  storage: number | string;
  ram?: number;
  cpu?: string;
  connectivity?: string;
}
 
export interface OrderItem {
  product: string | Product;
  configuration: {
    condition: string;
    storage: string | number;
    color: string;
    cpu?: string;
    ram?: number;
    connectivity?: string;
  };
  quantity: number;
  price_at_purchase: number;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  purchase_history: string[] | Order[];
  current_order?: {
    order_id: string | Order;
    status?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ConfigOptions {
  storage: (number | string)[];
  color: string[];
  condition: string[];
  price: { min: number; max: number };
  ram?: number[];
  cpu?: string[];
  connectivity?: string[];
}

export interface ProductFilter {
  page?: number;
  limit?: number;
  device_type?: 'iPhone' | 'MacBook' | 'iPad';
  model?: string;
  condition?: string;
  battery?: string;
  color?: string;
  storage?: string | number;
  ram?: number;
  cpu?: string;
  connectivity?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number; 
  pages: number;
  limit: number;
  data: Product[],
}

export interface ConfigOptionsType {
  storage: (string | number)[],
  color: string[],
  condition: string[],
  price: { min: number, max: number },
  ram?: number[],
  cpu?: string[];
  connectivity?: string[];
}

export interface ProductByIdResponse {
  success: boolean,
  data: {
    product: Product,
    configOptions: ConfigOptionsType,
  }
}




const API_BASE = 'http://localhost:5000/api';

// Product API Calls
export const productApi = {
  async getProducts(filter?: ProductFilter): Promise<ProductsResponse> {
    const query = new URLSearchParams(filter as Record<string, string>).toString();
    const response = await fetch(`${API_BASE}/products?${query}`);
    const data = await response.json();
    return data;
  },

  async getProductById(id: string): Promise<ProductByIdResponse> {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const data = await response.json();
    return data;
  },

  async getConfigOptions(model: string, deviceType: 'iPhone' | 'MacBook' | 'iPad'): Promise<ConfigOptions> {
    const response = await fetch(
      `${API_BASE}/products/config-options?model=${encodeURIComponent(model)}&device_type=${deviceType}`
    );
    const data = await response.json();
    return data.data;
  },

  async getUniqueModels(): Promise<Product[]> {
    const response = await fetch(`${API_BASE}/products/unique-models`);
    const data = await response.json();
    return data.data;
  },
};

// User API Calls
export const userApi = {
  async createUser(userData: Omit<User, '_id' | 'created_at' | 'updated_at'>): Promise<User> {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${API_BASE}/users/${id}`);
    return await response.json();
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return await response.json();
  },

  async deleteUser(id: string): Promise<void> {
    await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE}/users/${userId}/orders`);
    const data = await response.json();
    return data;
  },
};

// Order API Calls
export const orderApi = {
  async createOrder(orderData: {
    userId: string;
    items: Array<{
      productId: string;
      configuration: OrderItem['configuration'];
      quantity: number;
      price: number;
    }>;
    shippingAddress: Order['shipping_address'];
  }): Promise<Order> {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return await response.json();
  },

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE}/orders/${id}`);
    return await response.json();
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE}/orders/user/${userId}`);
    return await response.json();
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await fetch(`${API_BASE}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  },

  async deleteOrder(id: string): Promise<void> {
    await fetch(`${API_BASE}/orders/${id}`, { method: 'DELETE' });
  },

  async getAllOrders(): Promise<{ user: User; orders: Order[] }[]> {
    const response = await fetch(`${API_BASE}/orders/allorders`);
    return await response.json();
  },
};