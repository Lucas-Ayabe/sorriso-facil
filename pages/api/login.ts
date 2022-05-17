import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/modules/auth";
import { sorrisoFacilApi } from "@modules/http/config";

type LoginResponse = { token: string; admin: boolean };

type ResponseData = {
  token: string;
  admin: boolean;
  error?: string;
};

type RequestData = {
  email?: string;
  password?: string;
};

const authenticate = async ({ email = "", password = "" }: RequestData) => {
  return sorrisoFacilApi
    .post<LoginResponse>("/login", { email, password })
    .then(({ data }) => data)
    .catch((): LoginResponse => ({ token: "", admin: false }));
};

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { body } = req;
  if (!(body.email || body.password)) {
    res.status(400).json({
      token: "",
      admin: false,
      error: "Login Falhou",
    });
    return;
  }

  const { token, admin } = await authenticate(body);
  const status = token ? 200 : 400;
  const payload = token
    ? { token, admin }
    : {
        token: "",
        admin: false,
        error: "Login Falhou",
      };

  if (token) {
    req.session.user = payload;
    await req.session.save();
  }

  res.status(status).json(payload);
};

export default withIronSessionApiRoute(login, sessionOptions);
