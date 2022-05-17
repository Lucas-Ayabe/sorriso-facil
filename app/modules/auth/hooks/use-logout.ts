import { useRouter } from "next/router";
import { logout } from "../services";

export const useLogout = (redirectOnLogoutTo = "/login") => {
  const router = useRouter();
  return () => logout().then(() => router.push(redirectOnLogoutTo));
};
