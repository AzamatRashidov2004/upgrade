// src/api/users.ts
import apiClient from "./client";
import { User } from "../types/user";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export const createUser = async (
  userData: CreateUserRequest
): Promise<{ user: User; token: string }> => {
  return apiClient<{ user: User; token: string }>("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getUser = async (id: string): Promise<User> => {
  return apiClient<User>(`/users/${id}`);
};
