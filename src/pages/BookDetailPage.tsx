import { useParams, useNavigate } from "react-router";
import BookCard from "../components/BookCard";
import { allBooks } from "../data/mockData";

function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Convert string param to number to match Book.id type
  const bookId = id ? parseInt(id, 10) : NaN;
  const book = allBooks.find((b) => b.id === bookId);

  if (book === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
        No book found with ID "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Book Details
      </h2>
      <div className="max-w-sm">
        <BookCard book={book} variant="default" />
      </div>
      <button
        onClick={() => navigate("/books")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Books
      </button>
    </div>
  );
}

export default BookDetailPage;