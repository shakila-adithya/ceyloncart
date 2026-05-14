import type { Product } from "../types/Product";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=100`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
