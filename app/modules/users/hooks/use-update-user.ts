import { useField } from "@modules/forms";
import { useRouter } from "next/router";
import { updateByRole, UserRole } from "../services";

export interface UseUpdateUserProps {
  name?: string;
  email?: string;
  password?: string;
  token: string;
  role: UserRole;
  id: number;
}

export const useUpdateUser = ({
  name = "",
  email = "",
  password = "",
  role,
  token,
  id,
}: UseUpdateUserProps) => {
  const router = useRouter();
  const nameField = useField(name);
  const emailField = useField(email);
  const passwordField = useField(password);

  const onSubmit = async () => {
    await updateByRole(
      role,
      {
        id,
        name: nameField.value,
        email: emailField.value,
        password: passwordField.value,
      },
      token
    );

    router.push("/users");
  };

  return {
    name: nameField,
    email: { ...emailField, type: "email" },
    password: { ...passwordField, type: "password" },
    onSubmit,
  };
};
