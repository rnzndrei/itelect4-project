# Library System (ITELECT4 Project)

A strictly-typed TypeScript web application for managing university library operations. This project is built incrementally, session by session, demonstrating mastery of advanced TypeScript concepts, React component architecture, and type-safe state management.

## 📚 Project Concept
The Library System manages three core entities:
1. **User**: Features role-based access control (`MEMBER` or `LIBRARIAN`) to power future UI conditional rendering.
2. **Book**: Includes inventory tracking (`total_copies`, `available_copies`) to support live count updates.
3. **Transaction**: Implements a multi-step status lifecycle (`REQUESTED` → `APPROVED` → `BORROWED` → `RETURNED` / `OVERDUE`).

## 🛠️ Tech Stack
- **Language**: TypeScript (Strict Mode)
- **Frontend Framework**: React 18+ with Vite
- **Build Tool**: Vite
- **Styling**: CSS (with Tailwind CSS integration planned for future sessions)

## ✨ TypeScript Features Implemented
- **Core Interfaces**: Strict shapes for `User`, `Book`, and `Transaction`.
- **Generics**: Reusable `ApiResponse<T>` interface and constrained generic functions (`getFirst<T>`, `getById<T>`).
- **Utility Types**: Practical applications of `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`, and `ReturnType<T>`.
- **Enums**: Runtime `TransactionStatus` enum for lifecycle management and `const enum` for `UserRole`.
- **Type Narrowing**: Safe runtime checks using `typeof` and `instanceof`.
- **Typed React Components**: Reusable UI components (`UserCard`, `BookCard`, `TransactionBadge`) with explicit `Props` interfaces and typed event handlers (`React.MouseEvent`, `React.ChangeEvent`).

## 📂 Project Structure
itelect4-project/
├── src/
│   ├── components/       # Reusable, strictly-typed React components
│   │   ├── BookCard.tsx
│   │   ├── TransactionBadge.tsx
│   │   └── UserCard.tsx
│   ├── types/
│   │   └── index.ts      # All core interfaces, types, enums, and generics
│   ├── App.tsx           # Main application component with mock data
│   └── main.tsx          # Vite React entry point
├── index.html
├── package.json
├── tsconfig.json         # Configured for strict TypeScript checking
└── README.md

🚀 How to Run
Prerequisites: Ensure you have Node.js (v18+) and npm installed.
Clone the repository:
   git clone <your-repo-url>
   cd itelect4-project
Install dependencies:
   npm install
Verify TypeScript (Zero Errors):
   npx tsc --noEmit
Start the development server:
   npm run dev