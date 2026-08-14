import type { Book } from "../types/index";

interface BookCardProps {
  book: Book;
  variant?: "default" | "compact";
}

function BookCard({ book, variant = "default" }: BookCardProps) {
  const isCompact = variant === "compact";

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:bg-gray-800 dark:border-gray-700`}>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {book.title}
      </h3>
      {!isCompact && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
      )}
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          {book.available_copies} available
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Total: {book.total_copies}
        </span>
      </div>
    </div>
  );
}

export default BookCard;