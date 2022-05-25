import { useField } from "@modules/forms";
import { useRouter } from "next/router";
import { useBoolean } from "usehooks-ts";
import { createByRole } from "../services";

export interface UseCreateUserProps {
  name?: string;
  email?: string;
  password?: string;
  token: string;
}

export const useCreateUser = ({
  name = "",
  email = "",
  password = "",
  token,
}: UseCreateUserProps) => {
  const router = useRouter();
  const nameField = useField(name);
  const emailField = useField(email);
  const passwordField = useField(password);
  const { toggle, value } = useBoolean();

  const onSubmit = async () => {
    await createByRole(
      value ? "administrator" : "dentist",
      {
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
    admin: { checked: value, onChange: toggle },
    onSubmit,
  };
};
