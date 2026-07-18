// ===== INTERFACES (Part 1 Core Entities) =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "MEMBER" | "LIBRARIAN";
  isActive: boolean;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  total_copies: number;
  available_copies: number;
  description: string;
}

export interface Transaction {
  id: number;
  userId: number;
  bookId: number;
  status: TransactionStatus; // Using the enum below
  requestDate: Date;
  dueDate: Date;
  returnDate: Date | null;
}

// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- reusable across the app
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
// Partial<T> -- update payload only needs the changed fields
export type UserUpdate = Partial<User>;

// Pick<T, K> -- a lightweight preview object for list views
export type BookPreview = Pick<Book, "id" | "title" | "author">;

// Omit<T, K> -- safe to expose publicly (hides internal copy counts)
export type PublicBook = Omit<Book, "total_copies" | "available_copies">;

// Record<K, T> -- dashboard-style counts for specific keys
export type RoleCount = Record<"MEMBER" | "LIBRARIAN", number>;

// ===== ENUMS =====
// Regular enum -- exists at runtime; great for multi-step lifecycle
export enum TransactionStatus {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  BORROWED = "BORROWED",
  RETURNED = "RETURNED",
  OVERDUE = "OVERDUE",
}

// const enum -- inlined at compile time, zero runtime overhead
export const enum UserRole {
  MEMBER = "MEMBER",
  LIBRARIAN = "LIBRARIAN",
}

// ===== TYPE ALIASES & UNIONS (From Session 1) =====
export type StringOrNumber = string | number;

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

// Intersection Type: combines ALL properties
export type MemberWithActiveTransaction = User & {
  activeTransaction: Transaction;
};