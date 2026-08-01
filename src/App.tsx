import { useState, useEffect, useRef } from "react";
import type { User, Book, Transaction } from "./types/index";
import UserCard from "./components/UserCard";
import BookCard from "./components/BookCard";
import TransactionBadge from "./components/TransactionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// ===== MOCK DATA =====
const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@university.edu",
  role: "MEMBER",
  isActive: true,
};

const mockBooks: Book[] = [
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
  {
    id: 103,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "978-1449373320",
    total_copies: 3,
    available_copies: 0,
    description: "The big ideas behind reliable, scalable, and maintainable systems.",
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 1001,
    userId: mockUser.id,
    bookId: 101,
    status: "APPROVED",
    requestDate: new Date("2026-07-15"),
    dueDate: new Date("2026-07-29"),
    returnDate: null,
  },
];

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious<string>(searchTerm);

  // Simulate fetching data on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(mockBooks);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styled Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse rounded-lg bg-gray-200 px-6 py-4 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          Loading library catalog...
        </div>
      </div>
    );
  }

  // Styled Error State
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
          <h2 className="text-lg font-bold">Could not load catalog</h2>
          <p className="mt-1 text-sm">Please check your connection and try again.</p>
          <button 
            onClick={() => { setIsError(false); setIsLoading(true); }}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    // Dark mode class-based wrapper
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 transition-colors dark:bg-gray-900">
        
        {/* Header & Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Library System</h1>
          
          <button
            onClick={() => toggleDarkMode()}
            className="rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          
          <button
            onClick={() => setIsError(true)}
            className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
          >
            Simulate Error
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex gap-2">
          <input
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search books by title or author..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            onClick={focusSearch}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Search
          </button>
        </div>

        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Previous search: "{previousSearch}"
          </p>
        )}

        <button 
          onClick={() => toggleDetails()} 
          className="mb-6 rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
        >
          {showDetails ? "Hide" : "Show"} Book Descriptions
        </button>

        {/* Responsive Grid Layout (Requirement: sm: and lg: breakpoints) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* 1. User Component */}
          <UserCard user={mockUser} onSelect={setSelectedUser} />
          {selectedUser && (
            <div className="rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 sm:col-span-2 lg:col-span-2">
              Action triggered for: <strong>{selectedUser.name}</strong>
            </div>
          )}

          {/* 2. Book Components (Dynamic via state) */}
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              variant={showDetails ? "default" : "compact"} 
            />
          ))}

          {/* 3. Transaction Component (with children prop) */}
          {mockTransactions.map((txn) => (
            <TransactionBadge key={txn.id} transaction={txn} variant="default">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ✓ Ready for pickup at the front desk!
              </p>
            </TransactionBadge>
          ))}

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
              No books found matching "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;