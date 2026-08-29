// One schema. The rules live here, and the TypeScript type is DERIVED
// from it -- so a rule and its type can never drift apart.
import { z } from "zod";

export const transactionSchema = z.object({
  // Book ID must be selected (not empty)
  bookId: z.string().min(1, "Please select a book."),
  
  // Optional: Add a reason for request
  reason: z
    .string()
    .min(10, "Please provide at least 10 characters explaining your request.")
    .max(200, "Reason must be less than 200 characters.")
    .refine(
      (text) => !text.includes("http"),
      "Reason cannot contain URLs."
    ),
});

// z.infer reads the schema and hands back the TypeScript type:
// { bookId: string; reason: string }
export type TransactionFormValues = z.infer<typeof transactionSchema>;