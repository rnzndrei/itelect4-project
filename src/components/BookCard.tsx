import type { Book } from "../types/index";

interface BookCardProps {
  book: Book;
  variant?: "default" | "compact";
}

function BookCard({ book, variant = "default" }: BookCardProps) {
  const isCompact = variant === "compact";

  return (
    // FIXED: Changed dynamic padding to a consistent "p-5" so the layout doesn't shift
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:bg-gray-800 dark:border-gray-700">
      
      {/* Title stays exactly the same size */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {book.title}
      </h3>
      
      {/* Author is always visible */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        by {book.author}
      </p>

      {/* Badges stay in the exact same spot */}
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          {book.available_copies} available
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Total: {book.total_copies}
        </span>
      </div>

      {/* Only the description appears/disappears */}
      {!isCompact && (
        <p className="mt-3 text-sm text-gray-500 italic dark:text-gray-400">
          "{book.description}"
        </p>
      )}
    </div>
  );
}

export default BookCard;