# Library System

A TypeScript-based web application for managing university library operations. It features role-based access (Member/Librarian), a multi-step transaction lifecycle, and AI-assisted book descriptions.

## Project Concept
This project fulfills the requirements for a full-stack TypeScript application, demonstrating:
- Strict type checking with Interfaces and Type Aliases.
- Generic types (`ApiResponse<T>`) and generic functions (`getById`).
- Utility types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`).
- Enumerations for robust state management (e.g., `TransactionStatus`).
- Type narrowing (`typeof`, `instanceof`) for safe runtime operations.

## How to Run
1. Ensure you have Node.js and TypeScript installed.
2. Initialize the project (if not already done): `npm init -y`
3. Install TypeScript as a dev dependency: `npm install -D typescript`
4. Initialize `tsconfig.json`: `npx tsc --init`
5. Run the type checker to verify zero errors: `npx tsc --noEmit`
6. Execute the code: `npx ts-node src/index.ts` 
   *(Alternatively, compile with `npx tsc` and run with `node dist/index.js`)*