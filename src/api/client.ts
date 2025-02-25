// src/api/client.ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

async function apiClient<T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json() as Promise<T>;
}

export default apiClient;
