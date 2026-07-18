import type { Book } from "../types/index";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="book-card" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", margin: "0.5rem" }}>
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <p>Available: {book.available_copies} / {book.total_copies} copies</p>
    </div>
  );
}

export default BookCard;