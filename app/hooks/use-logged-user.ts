import { select } from "@/app.slice";
import { useAppSelector } from "./use-app-selector";

export function useLoggedUser() {
  return useAppSelector(select.loggedUser);
}
