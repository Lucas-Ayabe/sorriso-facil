import { useState } from "react";

export const useTextField = (initialValue = "") => {
  const [value, onChange] = useState(initialValue);

  return {
    value,
    onChange,
  };
};
