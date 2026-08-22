// src/pages/BooksPage.tsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import BookCard from "../components/BookCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchBooks } from "../api/client";

function BooksPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">Loading library catalog...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
        {error.message} -- Is json-server running on port 3001?
      </div>
    );
  }

  const filteredBooks = data.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Library Catalog
      </h2>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books by title or author..."
        className="w-full rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((b) => (
          <Link key={b.id} to={`/books/${b.id}`}>
            <BookCard book={b} variant="compact" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;