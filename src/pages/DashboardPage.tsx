import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function DashboardPage() {
  const userName = useAuthStore((state) => state.userName);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  // If not logged in, redirect to login
  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Welcome back, <span className="font-semibold">{userName}</span>!
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          You are logged in. Navigate to Transactions to manage your book requests.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;