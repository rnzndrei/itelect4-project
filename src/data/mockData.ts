// src/data/mockData.ts
import type { User } from "../types/index";

// Only the demo user remains -- books and transactions now come from the API
export const member: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@university.edu",
  role: "MEMBER",
  isActive: true,
};