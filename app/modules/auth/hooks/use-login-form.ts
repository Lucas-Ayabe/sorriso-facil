import { useField } from "@modules/forms";
import { useRouter } from "next/router";
import { LoginFormProps } from "../components";
import { login } from "../services";
import { useLoggedUser } from "./use-logged-user";

export const useLoginForm = (
  redirectTo: (isAdmin: boolean) => string
): LoginFormProps => {
  const router = useRouter();
  const [, setLoggedUser] = useLoggedUser();
  const emailProps = useField("");
  const passwordProps = useField("");

  const onLogin = async (email: string, password: string) => {
    const { token, admin } = await login(email, password);
    if (!token) alert("Login falhou");
    else {
      setLoggedUser({ token, admin });
      router.push(redirectTo(admin));
    }
  };

  return {
    email: emailProps,
    password: passwordProps,
    onLogin,
  };
};
