import type { Book, ApiTransaction, NewTransaction, AuthReply, ApiUser } from "../../types/index";
import useAuthStore from "../../store/authStore";

// 1. Get the backend URL from your .env file
export const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error("VITE_API_URL is missing. Check your .env file.");

// 2. The helper that handles the URL, the token, and error messages
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;
  
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // Attach the token if the user is logged in
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}

// 3. Public Routes (No token needed)
export function fetchBooks(): Promise<Book[]> { 
  return request<Book[]>("/api/books"); 
}

export function fetchBookById(id: string): Promise<Book> { 
  return request<Book>(`/api/books/${id}`); 
}

// 4. Private Routes (Token is attached automatically)
export function fetchTransactions(): Promise<ApiTransaction[]> { 
  return request<ApiTransaction[]>("/api/transactions"); 
}

export function createTransaction(newTransaction: NewTransaction): Promise<ApiTransaction> {
  return request<ApiTransaction>("/api/transactions", { 
    method: "POST", 
    body: JSON.stringify(newTransaction) 
  });
}

// 5. Auth Routes
export function loginUser(body: { email: string; password: string }): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", { 
    method: "POST", 
    body: JSON.stringify(body) 
  });
}

export function registerUser(body: { name: string; email: string; password: string }): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", { 
    method: "POST", 
    body: JSON.stringify(body) 
  });
}