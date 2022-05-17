import { useAppSelector } from "@hooks";
import { select } from "../user.slice";

export const useUsers = () => {
  return useAppSelector(select.users);
};
