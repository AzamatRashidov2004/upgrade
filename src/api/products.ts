// src/api/products.ts
import apiClient from "./client";
import { Product } from "../types/product";

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface ProductFilter {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  processor?: string;
  memory?: string;
  storage?: string;
  color?: string;
  page?: number;
  limit?: number;
}

export const getProducts = async (
  filter: ProductFilter
): Promise<ProductsResponse> => {
  const query = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, value.toString());
  });

  return apiClient<ProductsResponse>(`/products?${query.toString()}`);
};

export const getProductById = async (id: string): Promise<Product> => {
  return apiClient<Product>(`/products/${id}`);
};
