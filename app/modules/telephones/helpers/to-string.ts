import { TelephoneDto } from "../services";

export const toString = (telephone: TelephoneDto) => {
  return `(${telephone.ddd}) ${telephone.number}`;
};
