import type { Transaction } from "../types/index";

interface TransactionBadgeProps {
  transaction: Transaction;
  variant?: "default" | "compact";
  children?: React.ReactNode;
}

function TransactionBadge({ transaction, variant = "default", children }: TransactionBadgeProps) {
  const isCompact = variant === "compact";

  // Helper to color-code the status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "REQUESTED": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "OVERDUE": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm transition-colors dark:bg-gray-800 dark:border-gray-700 ${
        isCompact ? "p-4" : "p-6"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          Transaction #{transaction.id}
        </h4>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Due: {transaction.dueDate.toLocaleDateString()}
      </p>

      {children && (
        <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

export default TransactionBadge;