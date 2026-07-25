import { useState, useCallback } from "react";

// Explicit return type: a tuple containing a boolean and a function
export default function useToggle(
  initialState: boolean = false
): [boolean, (nextState?: boolean) => void] {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((nextState?: boolean) => {
    setState((prev) => (typeof nextState === "boolean" ? nextState : !prev));
  }, []);

  return [state, toggle];
}