// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name);
    navigate("/transactions");
  };

  return (
    <div className="max-w-sm space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Library Login
      </h2>
      
      <div className="grid gap-1.5">
        <Label htmlFor="name" className="text-foreground">
          Your Name
        </Label>
        <Input 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Juan dela Cruz" 
        />
      </div>

      <Button 
        onClick={handleLogin} 
        disabled={name.trim() === ""} 
        className="w-full"
      >
        Log In
      </Button>
    </div>
  );
}

export default LoginPage;