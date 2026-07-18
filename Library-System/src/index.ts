import type {
  User,
  Book,
  Transaction,
  StringOrNumber,
  ApiResponse,
  UserUpdate,
  BookPreview,
  PublicBook,
  RoleCount,
  MemberWithActiveTransaction,
} from "../types/index";
import { TransactionStatus, UserRole } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "library-system";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to the ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== USING INTERFACES =====
const librarian: User = {
  id: 1,
  name: "Maria Santos",
  email: "maria@university.edu",
  role: "LIBRARIAN",
  isActive: true,
};

const member: User = {
  id: 2,
  name: "Juan dela Cruz",
  email: "juan@university.edu",
  role: "MEMBER",
  isActive: true,
};

const book: Book = {
  id: 101,
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  total_copies: 5,
  available_copies: 3,
  description: "A handbook of agile software craftsmanship.",
};

const transaction: Transaction = {
  id: 1001,
  userId: member.id,
  bookId: book.id,
  status: TransactionStatus.APPROVED,
  requestDate: new Date("2026-07-15"),
  dueDate: new Date("2026-07-29"),
  returnDate: null,
};

console.log("Librarian:", librarian.name);
console.log("Book Available:", book.available_copies, "/", book.total_copies);
console.log("Transaction Status:", transaction.status);

// ===== TYPE NARROWING =====
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase(); // TypeScript knows: input is string
  }
  return input.toFixed(2); // TypeScript knows: input is number
}

function formatDateOrString(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // TypeScript knows: it's a Date
  }
  return value; // TypeScript knows: it's a string
}

console.log(processInput("clean code")); // CLEAN CODE
console.log(processInput(3.14159));      // 3.14
console.log(formatDateOrString(transaction.dueDate)); // e.g., "7/29/2026"

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser = getFirst<User>([member]);
const foundBook = getById<Book>([book], 101);

console.log(firstUser?.name); // Juan dela Cruz
console.log(foundBook?.title); // Clean Code

// ===== GENERIC INTERFACE USAGE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: member,
  message: "User fetched successfully",
};

const booksResponse: ApiResponse<Book[]> = {
  success: true,
  data: [book],
};

console.log("API Response Name:", userResponse.data.name);

// ===== USING UTILITY TYPES =====
// Partial<T>
const patch: UserUpdate = { name: "Juan D. Cruz" };

// Pick<T, K>
const preview: BookPreview = { id: 101, title: "Clean Code", author: "Robert C. Martin" };

// Omit<T, K>
const publicProfile: PublicBook = {
  id: 101,
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  description: "A handbook of agile software craftsmanship.",
};

// Record<K, T>
const roleCount: RoleCount = { MEMBER: 45, LIBRARIAN: 2 };

// ReturnType<T>
function createTransaction(userId: number, bookId: number) {
  return {
    id: 1002,
    userId,
    bookId,
    status: TransactionStatus.REQUESTED,
    requestDate: new Date(),
    dueDate: new Date(),
    returnDate: null,
  };
}

type NewTransaction = ReturnType<typeof createTransaction>;
const gt1Transaction: NewTransaction = createTransaction(member.id, book.id);
console.log("New Transaction Status:", gt1Transaction.status);

// ===== USING ENUMS =====
let currentStatus: TransactionStatus = TransactionStatus.REQUESTED;
console.log("Current Status:", currentStatus); // "REQUESTED"

currentStatus = TransactionStatus.APPROVED;
console.log("Is Approved?", currentStatus === TransactionStatus.APPROVED); // true

const currentUserRole: UserRole = UserRole.MEMBER;
console.log("Current Role:", currentUserRole); // "MEMBER"