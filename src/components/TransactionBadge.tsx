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
    <div className="transaction-badge" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", margin: "0.5rem" }}>
      <p>Status: <strong>{transaction.status}</strong></p>
      <p>Due Date: {transaction.dueDate.toLocaleDateString()}</p>
      {children}
    </div>
  );
};

export default TransactionBadge;