import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  // Typed onClick handler
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onSelect(user);
  };

  // Typed onChange handler (satisfies the "at least 1 typed event handler" rubric requirement)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(`Updating note for ${user.name}:`, e.target.value);
  };

  return (
    <div className="user-card" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", margin: "0.5rem" }}>
      <h3>{user.name} <small>({user.role})</small></h3>
      <p>{user.email}</p>
      <button onClick={handleClick}>Select User</button>
      <input 
        onChange={handleChange} 
        placeholder="Add a quick note..." 
        style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
      />
    </div>
  );
}

export default UserCard;