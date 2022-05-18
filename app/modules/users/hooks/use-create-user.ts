import { useTextField } from "@modules/forms";
import { sorrisoFacilApi } from "@modules/http/config";
import { useRouter } from "next/router";
import { useBoolean } from "usehooks-ts";

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
  const nameField = useTextField(name);
  const emailField = useTextField(email);
  const passwordField = useTextField(password);
  const { toggle, value } = useBoolean();

  const onSubmit = async () => {
    const resource = value ? "administrator" : "dentist";
    await sorrisoFacilApi.post(
      `/${resource}`,
      {
        name: nameField.value,
        email: emailField.value,
        password: passwordField.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
