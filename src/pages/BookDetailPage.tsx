// src/pages/BookDetailPage.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import BookCard from "../components/BookCard";
import { fetchBookById } from "../api/client";

function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["books", id],
    queryFn: () => fetchBookById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">Loading book details...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h2>
      <div className="max-w-sm">
        <BookCard book={data} variant="default" />
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