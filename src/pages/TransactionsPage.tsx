// src/pages/TransactionsPage.tsx -- Session 8 Version
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiTransaction, Book } from "../types/index";
import { transactionSchema } from "../schemas/transactionSchema";
import type { TransactionFormValues } from "../schemas/transactionSchema";
import TransactionBadge from "../components/TransactionBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchTransactions, createTransaction, fetchBooks } from "../api/client";

function TransactionsPage() {
  const queryClient = useQueryClient();

  // useForm holds the values, runs the schema, and stores the errors.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    mode: "onBlur",
    defaultValues: { bookId: "", reason: "" },
  });

  // Fetch books for the dropdown
  const booksQuery = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // Fetch existing transactions
  const { data, isPending, isError } = useQuery<ApiTransaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  // Mutation to create a new transaction
  const addTransaction = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      reset(); // clears every field at once
    },
  });

  // handleSubmit only calls this after the schema passes.
  const onSubmit = (values: TransactionFormValues): void => {
    addTransaction.mutate({
      userId: 1, // Hardcoded for demo (would come from auth in real app)
      bookId: parseInt(values.bookId, 10),
      status: "REQUESTED",
      requestDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      returnDate: null,
    });
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

      {/* Request Form with Shadcn UI */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="bookId" className="text-foreground">
            Select Book
          </Label>
          <select
            id="bookId"
            {...register("bookId")}
            className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground"
          >
            <option value="">Select a book...</option>
            {booksQuery.data?.map((book) => (
              <option key={book.id} value={book.id.toString()}>
                {book.title} (Available: {book.available_copies})
              </option>
            ))}
          </select>
          {errors.bookId && (
            <p className="text-sm text-red-600">{errors.bookId.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="reason" className="text-foreground">
            Reason for Request
          </Label>
          <Input
            id="reason"
            {...register("reason")}
            placeholder="I need this book for my research on..."
          />
          {errors.reason && (
            <p className="text-sm text-red-600">{errors.reason.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={addTransaction.isPending}
          className="justify-self-start"
        >
          {addTransaction.isPending ? "Requesting..." : "Request Book"}
        </Button>
      </form>

      {addTransaction.isError && (
        <p className="mb-4 text-sm text-red-700 dark:text-red-400">
          {addTransaction.error.message}
        </p>
      )}

      {/* Transactions List */}
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