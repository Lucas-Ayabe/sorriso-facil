import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/modules/auth";

type ResponseData = {
  token: string;
};

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  req.session.destroy();
  res.status(200).json({ token: "" });
};

export default withIronSessionApiRoute(logout, sessionOptions);
