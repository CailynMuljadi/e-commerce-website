// lib/api.ts
const BASE_URL = "https://sistech-ecommerce-api.leficullen.xyz/api";

export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    // Optional: Keeps data fresh while utilizing caching
    next: { revalidate: 60 }, 
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}