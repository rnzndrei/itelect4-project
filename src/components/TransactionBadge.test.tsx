import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransactionBadge from "./TransactionBadge";
import type { ApiTransaction } from "../types/index";

// 1. Create a sample transaction object to pass to the component
const sample: ApiTransaction = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  userId: "665f1c2ab4e8d3a1f0c9e001",
  bookId: "6ad2f5f2e3cb1c912321b039",
  status: "REQUESTED" as const,
  requestDate: "2026-10-25T02:15:00.000Z",
  dueDate: "2026-11-08T02:15:00.000Z",
  returnDate: null,
};

describe("TransactionBadge", () => {
  it("shows RETURNED when the status is RETURNED", () => {
    const returnedSample = { ...sample, status: "RETURNED" as const }; // <-- ADD "as const" HERE
    
    render(<TransactionBadge transaction={returnedSample} />);
    
    expect(screen.getByText("Status: RETURNED")).toBeInTheDocument();
  });

  it("shows RETURNED when the status is RETURNED", () => {
    // 4. Create a copy of the sample but change the status
    const returnedSample = { ...sample, status: "RETURNED" as const };
    
    render(<TransactionBadge transaction={returnedSample} />);
    
    expect(screen.getByText("Status: RETURNED")).toBeInTheDocument();
  });
});