import TransactionBadge from "../components/TransactionBadge";
import { allTransactions } from "../data/mockData";

function TransactionsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Transactions
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allTransactions.map((t) => (
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