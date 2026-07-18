import UserCard from "./components/UserCard";
import BookCard from "./components/BookCard";
import TransactionBadge from "./components/TransactionBadge";
import type { User, Book, Transaction } from "./types/index";

// ===== MOCK DATA (Matching GT1 Interfaces) =====
const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@university.edu",
  role: "MEMBER",
  isActive: true,
};

const mockBook: Book = {
  id: 101,
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  total_copies: 5,
  available_copies: 3,
  description: "A handbook of agile software craftsmanship.",
};

const mockTransaction: Transaction = {
  id: 1001,
  userId: mockUser.id,
  bookId: mockBook.id,
  status: "APPROVED", // Matches the union type from GT1
  requestDate: new Date("2026-07-15"),
  dueDate: new Date("2026-07-29"),
  returnDate: null,
};

// ===== MAIN APP COMPONENT =====
function App() {
  return (
    <div className="app" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Library System Dashboard</h1>
      
      {/* 1. User Component with typed event handler callback */}
      <UserCard 
        user={mockUser} 
        onSelect={(u) => console.log(`Selected user for action: ${u.name}`)} 
      />
      
      {/* 2. Book Component (List-then-Detail setup) */}
      <BookCard book={mockBook} />
      
      {/* 3. Transaction Component with children prop */}
      <TransactionBadge transaction={mockTransaction}>
        <p style={{ color: "green", fontWeight: "bold" }}>Status: Approved & Ready for Pickup!</p>
      </TransactionBadge>
    </div>
  );
}

export default App;