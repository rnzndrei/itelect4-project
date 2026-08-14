// At the TOP of src/index.ts
import type { 
  User, Book, Transaction, 
  StringOrNumber, ApiResponse, UserUpdate, BookPreview, PublicBook, RoleCount,
  TransactionStatus, UserRole 
} from "./types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "library-system";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== USING INTERFACES =====
const member: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
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
  status: "REQUESTED",
  requestDate: new Date(),
  dueDate: new Date(),
  returnDate: null,
};

console.log("Member:", member);
console.log("Book:", book);
console.log("Transaction:", transaction);

// ===== TYPE NARROWING =====
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser = getFirst<User>([member]);
const foundUser = getById<User>([member], 1);

console.log("First User:", firstUser?.name);
console.log("Found User:", foundUser?.email);

// ===== GENERIC INTERFACE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: member,
};

const bookResponse: ApiResponse<Book[]> = {
  success: true,
  data: [book],
};

console.log("API User:", userResponse.data.name);
console.log("API Book:", bookResponse.data[0].title); // <-- USED

// ===== USING UTILITY TYPES =====
const patch: UserUpdate = { name: "Juan D. Cruz" };
console.log("Patch:", patch); // <-- USED

const preview: BookPreview = { id: 101, title: "Clean Code", author: "Robert C. Martin" };
console.log("Preview:", preview); // <-- USED

const publicProfile: PublicBook = {
  id: 101,
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  description: "A handbook of agile software craftsmanship.",
};
console.log("Public Profile:", publicProfile); // <-- USED

const roleCount: RoleCount = { MEMBER: 45, LIBRARIAN: 2 };
console.log("Role Count:", roleCount); // <-- USED

// ===== ReturnType<T> =====
function makeTransaction(bookId: number) {
  return { 
    id: 1, 
    userId: 1, 
    bookId, 
    status: "REQUESTED" as TransactionStatus, 
    requestDate: new Date(), 
    dueDate: new Date(), 
    returnDate: null 
  };
}

type NewTransaction = ReturnType<typeof makeTransaction>;
const gt1Transaction: NewTransaction = makeTransaction(101);
console.log("New Transaction:", gt1Transaction); // <-- USED

// ===== USING TYPES (formerly Enums) =====
let status: TransactionStatus = "REQUESTED";
console.log("Status:", status);

status = "APPROVED";
console.log("Is Approved?", status === "APPROVED");

const currentRole: UserRole = "MEMBER";
console.log("Current Role:", currentRole);

// ===== FORCE USAGE OF PRIMITIVES TO SATISFY STRICT COMPILER =====
console.log("FullStack:", isFullStack, "Nothing:", nothing, "NotSet:", notSet);