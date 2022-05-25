import { sorrisoFacilApi, auth } from "@modules/http";
import { MaybeAsync } from "purify-ts";
import { User } from "../user.slice";

export type UserRole = "administrator" | "dentist";
export interface UserDto {
  name: string;
  email: string;
  password: string;
}

export const findAllByRole = async (
  role: UserRole,
  token: string
): Promise<User[]> => {
  return sorrisoFacilApi
    .get(`/${role}s`, { headers: auth(token) })
    .catch(() => ({ data: { content: [] } }))
    .then(({ data }) => {
      return (
        data.content?.map((user: any) => {
          return {
            ...user,
            id: `${role}-${user.id}`,
            isAdmin: role === "administrator",
          };
        }) ?? []
      );
    });
};

export const findAll = async (token: string): Promise<User[]> => {
  const users = await Promise.all([
    findAllByRole("administrator", token),
    findAllByRole("dentist", token),
  ]);

  return users.reduce((acc, current) => acc.concat(current), []);
};

export const findByRole = (role: UserRole, id: number, token: string) => {
  const endpoint = `/${role}/${id}`;
  const config = { headers: auth(token) };

  return MaybeAsync<User>(async () => {
    const { data } = await sorrisoFacilApi.get(endpoint, config);
    return data;
  });
};

export const createByRole = async (
  role: UserRole,
  data: UserDto,
  token: string
) => {
  const config = { headers: auth(token) };
  return sorrisoFacilApi.post(`/${role}`, data, config);
};

export const updateByRole = async (
  role: UserRole,
  data: UserDto & { id: number },
  token: string
) => {
  const config = { headers: auth(token) };
  return sorrisoFacilApi.put(`/${role}/${data.id}`, data, config);
};

export const deleteByRole = (role: UserRole, id: number, token: string) => {
  const endpoint = `/${role}/${id}`;
  const config = { headers: auth(token) };

  return sorrisoFacilApi.delete(endpoint, config);
};
