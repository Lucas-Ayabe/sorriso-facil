import { ironSessionConfig } from "@config/iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { ApiRoute } from "@types";

type Data = {
  name: string;
};

const handler: ApiRoute<Data> = async (_req, res) => {
  res.status(200).json({ name: "John Doe" });
};

export default withIronSessionApiRoute(handler, ironSessionConfig);
