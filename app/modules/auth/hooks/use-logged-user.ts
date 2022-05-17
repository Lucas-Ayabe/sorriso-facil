import { useLocalStorage } from "usehooks-ts";

export function useLoggedUser() {
  return useLocalStorage("@auth:user", { admin: false, token: "" });
}
