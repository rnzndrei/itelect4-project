import type { User, Book, Transaction } from "../types/index";

export const member: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@university.edu",
  role: "MEMBER",
  isActive: true,
};

export const allBooks: Book[] = [
  {
    id: 101,
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    total_copies: 5,
    available_copies: 3,
    description: "A handbook of agile software craftsmanship.",
  },
  {
    id: 102,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "978-0135957059",
    total_copies: 4,
    available_copies: 1,
    description: "Your journey to mastery.",
  },
];

export const allTransactions: Transaction[] = [
  {
    id: 1001,
    userId: member.id,
    bookId: 101,
    status: "APPROVED",
    requestDate: new Date("2026-07-15"),
    dueDate: new Date("2026-07-29"),
    returnDate: null,
  },
  {
    id: 1002,
    userId: member.id,
    bookId: 102,
    status: "BORROWED",
    requestDate: new Date("2026-07-10"),
    dueDate: new Date("2026-07-24"),
    returnDate: null,
  },
];