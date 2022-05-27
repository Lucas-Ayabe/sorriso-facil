export const matchWith = <T extends object>(pattern: T) => {
  return (value: keyof T) => {
    return pattern[value];
  };
};
