import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onSelect(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Quick note updated:", e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {user.name}
      </h3>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
        {user.role}
      </p>
      <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      
      <button
        onClick={handleClick}
        className="mt-4 w-full rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Select User
      </button>
      
      <input
        onChange={handleChange}
        placeholder="Add a quick note..."
        className="mt-3 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
}

export default UserCard;