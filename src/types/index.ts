// ===== INTERFACES =====
// Defines the SHAPE of our 3 core Library System entities

export interface User {
  id: number;
  name: string;
  email: string;
  role: "MEMBER" | "LIBRARIAN"; // Powers Module 3 Auth
  isActive: boolean;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  total_copies: number;
  available_copies: number; // Powers Module 4 Live Counts
  description: string; // Will be AI-generated (Module 5)
}

export interface Transaction {
  id: number;
  userId: number; // Maps to user_id in DB
  bookId: number; // Maps to book_id in DB
  status: "REQUESTED" | "APPROVED" | "BORROWED" | "RETURNED" | "OVERDUE"; // Multi-step Lifecycle
  requestDate: Date;
  dueDate: Date;
  returnDate: Date | null; // Null if not yet returned
}

// ===== TYPE ALIASES =====
// Gives a name to primitives, unions, or object shapes

// Alias for a union type (string OR number)
export type StringOrNumber = string | number;

// Alias for an object shape
export type LibraryLocation = {
  floor: number;
  shelf: string;
};

// Alias for a function signature
export type CopyFormatter = (copies: number) => string;

// ===== UNION TYPES =====
export type Status = "pending" | "active" | "inactive"; 

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

// ===== INTERSECTION TYPES =====
// Combines ALL properties. Useful for enriched data returned from an API.
// Example: A User object that also includes their current active transaction details.
export type MemberWithActiveTransaction = User & {
  activeTransaction: Transaction;
};