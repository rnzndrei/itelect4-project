import { useState, useEffect, useRef } from "react";
import type { User, Book } from "./types/index";
import UserCard from "./components/UserCard";
import BookCard from "./components/BookCard";
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
];

function App() {
  // 1. useState<T> for multiple pieces of state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // 2. Custom hooks
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious<string>(searchTerm);
  
  // 3. useRef for DOM reference
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the input programmatically
  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  // 4. useEffect to load mock data on mount (replacing hard-coded JSX)
  useEffect(() => {
    // Simulate network request delay
    const timer = setTimeout(() => {
      setBooks(mockBooks);
      setIsLoading(false);
    }, 600);

    // Cleanup function to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  // 5. Typed onChange handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Dynamic filtering based on state
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state UI
  if (isLoading) {
    return <p style={{ padding: "2rem" }}>Loading library catalog...</p>;
  }

  return (
    <div className="app" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Library System Dashboard</h1>
      
      {/* User Component */}
      <UserCard 
        user={mockUser} 
        onSelect={(u) => console.log(`Action triggered for: ${u.name}`)} 
      />

      <div style={{ margin: "1.5rem 0" }}>
        {/* Input with useRef and typed onChange */}
        <input
          ref={searchInputRef}
          value={searchTerm}
          type="text"
          placeholder="Search books by title or author..."
          onChange={handleSearchChange}
          style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
        />
        <button onClick={focusSearch} style={{ padding: "0.5rem 1rem" }}>
          Focus Search
        </button>
      </div>

      {/* Demonstrating usePrevious hook */}
      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p style={{ color: "gray", fontSize: "0.9rem", marginTop: "-1rem" }}>
          Previous search: "{previousSearch}"
        </p>
      )}

      {/* Demonstrating useToggle hook */}
      <button onClick={() => toggleDetails()} 
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
      >
        {showDetails ? "Hide" : "Show"} Book Descriptions
      </button>

      {/* 6. Dynamic rendering via state (NO hard-coded JSX) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredBooks.map((book) => (
          <div key={book.id}>
            <BookCard book={book} />
            {showDetails && (
              <p style={{ marginLeft: "1rem", color: "#555", fontStyle: "italic" }}>
                {book.description}
              </p>
            )}
          </div>
        ))}
        
        {filteredBooks.length === 0 && (
          <p>No books found matching "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
}

export default App;