import type { Transaction } from "../types/index";

interface TransactionBadgeProps {
  transaction: Transaction;
  children?: React.ReactNode;
}

const TransactionBadge: React.FC<TransactionBadgeProps> = ({
  transaction,
  children,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <p className="font-semibold text-gray-900 dark:text-white">
        Status: {transaction.status}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Due: {transaction.dueDate.toLocaleDateString()}
      </p>
      {children}
    </div>
  );
};

export default TransactionBadge;