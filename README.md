WEBSITE LINK: https://itelect4-project-iota.vercel.app/

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


---
# Library System (Frontend)

This is the frontend interface for the Library System application, built for ITELECT4. It connects to a live Express API to manage user accounts and book transactions.

##  Live Site
**[Insert your Vercel Frontend URL here, e.g., https://itelect4-project-iota.vercel.app]**

## 🛠 Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Zustand (Auth), React Query (Server State)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

## ✨ Features
- **Authentication:** Real user registration and login using JWT.
- **Session Persistence:** Auth state is saved in LocalStorage.
- **Book Catalog:** View available books fetched from the live API.
- **Transaction Management:** Request books and view request history.
- **Responsive Design:** Fully responsive UI with Dark Mode support.

## ⚙️ Environment Variables
This project requires a `.env` file in the root directory. **Never commit this file.**

```env
VITE_API_URL=https://your-backend-url.vercel.app
