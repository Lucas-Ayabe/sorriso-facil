import { NextApiRequest, NextApiResponse } from "next";

export type ApiRoute<T = any> = (
  _req: NextApiRequest,
  res: NextApiResponse<T>
) => Promise<void>;
