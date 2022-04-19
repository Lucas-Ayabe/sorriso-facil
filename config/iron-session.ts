export const ironSessionConfig = {
  cookieName: "sorriso_facil_cookiename",
  password: process.env.IRON_SESSION_PASSWORD as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      admin?: boolean;
    };
  }
}
