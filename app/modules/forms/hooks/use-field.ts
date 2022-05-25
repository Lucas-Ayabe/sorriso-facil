import { useState } from "react";

export const useField = <T>(initialValue: T) => {
  const [value, onChange] = useState(initialValue);

  return {
    value,
    onChange,
  };
};
