import { apiRoutes } from "@modules/http/config";

type LoginResponse = { token: string; admin: boolean };

export const login = async (email: string, password: string) => {
  return apiRoutes
    .post<LoginResponse>("/login", { email, password })
    .then(({ data }) => data)
    .catch((): LoginResponse => ({ token: "", admin: false }));
};
