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
  status: TransactionStatus;
  requestDate: Date;
  dueDate: Date;
  returnDate: Date | null;
}

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type BookPreview = Pick<Book, "id" | "title" | "author">;
export type PublicBook = Omit<Book, "total_copies" | "available_copies">;
export type RoleCount = Record<"MEMBER" | "LIBRARIAN", number>;

export type TransactionStatus = 
  | "REQUESTED" 
  | "APPROVED" 
  | "BORROWED" 
  | "RETURNED" 
  | "OVERDUE";

export type UserRole = "MEMBER" | "LIBRARIAN";

// ===== TYPE ALIASES & UNIONS =====
export type StringOrNumber = string | number;

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

// ===== INTERSECTION TYPE =====
export type MemberWithActiveTransaction = User & {
  activeTransaction: Transaction;
};