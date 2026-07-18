import type { User, Book, Transaction, MemberWithActiveTransaction, StringOrNumber } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "library-system";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
  return `Welcome to the ${name} -- AY ${year}!`;
}

// void: function that does NOT return a value
function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
// [!] any -- disables TypeScript type checking. Avoid in production.
let anything: any = "hello";
anything = 42; 
anything = true; 

// unknown -- the safer version of any. Requires type checking before use.
let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // OK -- TypeScript knows it's a string here
}

// never -- a function that NEVER returns (e.g., always throws)
function throwLibraryError(message: string): never {
  throw new Error(`Library System Error: ${message}`);
}

// ===== USING INTERFACES (Library System Entities) =====
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
  description: "A handbook of agile software craftsmanship.", // Normally AI-generated
};

const transaction: Transaction = {
  id: 1001,
  userId: member.id,
  bookId: book.id,
  status: "APPROVED",
  requestDate: new Date("2026-07-15"),
  dueDate: new Date("2026-07-29"),
  returnDate: null, // Not yet returned
};

console.log("Librarian:", librarian.name);
console.log("Book Available:", book.available_copies, "/", book.total_copies);
console.log("Transaction Status:", transaction.status);

// ===== TYPE NARROWING =====
// Narrowing with typeof
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase(); // TypeScript knows: input is string here
  }
  return input.toFixed(2); // TypeScript knows: input is number here
}

// Narrowing with instanceof (Perfect for Date objects in Transactions)
function formatDateOrString(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // TypeScript knows: it's a Date
  }
  return value; // TypeScript knows: it's a string
}

console.log(processInput("clean code")); // CLEAN CODE
console.log(processInput(3.14159));      // 3.14
console.log(formatDateOrString(transaction.dueDate)); // e.g., "7/29/2026"

// ===== USING INTERSECTION TYPE =====
const memberWithTransaction: MemberWithActiveTransaction = {
  ...member,
  activeTransaction: transaction,
};

console.log(`${memberWithTransaction.name} has a transaction status of: ${memberWithTransaction.activeTransaction.status}`);