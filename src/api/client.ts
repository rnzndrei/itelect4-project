// src/api/client.ts -- NEW FILE
// Every fetch call to json-server lives in this one file.

import type { Book, ApiTransaction, NewTransaction } from "../types/index";

export const API_URL = "http://localhost:3001";

// GET /books -> the whole list
export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) {
    throw new Error("Could not load books");
  }
  return res.json();
}

// GET /books/:id -> one book by ID
export async function fetchBookById(id: string): Promise<Book> {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) {
    throw new Error(`Could not load book with id "${id}"`);
  }
  return res.json();
}

// GET /transactions -> the whole list
export async function fetchTransactions(): Promise<ApiTransaction[]> {
  const res = await fetch(`${API_URL}/transactions`);
  if (!res.ok) {
    throw new Error("Could not load transactions");
  }
  return res.json();
}

// POST /transactions -> create a new transaction
export async function createTransaction(
  newTransaction: NewTransaction
): Promise<ApiTransaction> {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTransaction),
  });
  if (!res.ok) {
    throw new Error("Could not create transaction");
  }
  return res.json();
}