import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (state === null || state === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, state]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== JSON.stringify(state)) {
        try {
          const newValue = event.newValue !== null 
            ? JSON.parse(event.newValue) 
            : initialValue;
          setState(newValue);
        } catch (error) {
          console.error("Error parsing storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, state]);

  return [state, setState];
}