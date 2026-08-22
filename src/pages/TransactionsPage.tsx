import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionBadge from "../components/TransactionBadge";
import { fetchTransactions, createTransaction } from "../api/client";
import useAuthStore from "../store/authStore";
import type { ApiTransaction, NewTransaction } from "../types/index";

// NO PROPS HERE. Just a plain function.
function TransactionsPage() {
  const [bookId, setBookId] = useState<string>("");
  const queryClient = useQueryClient();

  // 1. READ: Type this explicitly as ApiTransaction[]
  const { data, isPending, isError } = useQuery<ApiTransaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  // 2. WRITE
  const addTransaction = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setBookId("");
    },
  });

  const handleRequest = (): void => {
    if (!bookId) return;

    addTransaction.mutate({
      userId: 1,
      bookId: parseInt(bookId, 10),
      status: "REQUESTED",
      requestDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      returnDate: null,
    } as NewTransaction);
  };

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">Loading transactions...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
        Could not load transactions. Is the API running?
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Transactions
      </h2>

      <div className="mb-6 flex gap-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="flex-1 rounded border border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a book to request...</option>
          <option value="1">Clean Code</option>
          <option value="2">The Pragmatic Programmer</option>
          <option value="3">Designing Data-Intensive Applications</option>
        </select>
        <button
          onClick={handleRequest}
          disabled={!bookId || addTransaction.isPending}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addTransaction.isPending ? "Requesting..." : "Request Book"}
        </button>
      </div>

      {addTransaction.isError && (
        <p className="mb-4 text-sm text-red-700 dark:text-red-400">
          {addTransaction.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data?.map((t) => (
          <TransactionBadge key={t.id} transaction={t}>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Book ID: {t.bookId}
            </p>
          </TransactionBadge>
        ))}
      </div>
    </div>
  );
}

export default TransactionsPage;