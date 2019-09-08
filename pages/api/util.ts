import * as jwt from "jsonwebtoken";
import Photon from "@generated/photon";
export interface Context {
  photon: Photon;
  req: any;
}

export function getUserId(ctx: Context) {
  try {
    const Authorization = ctx.req.headers.authorization;
    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");
      const { userId } = jwt.verify(token, "appsecret321") as {
        userId: string;
      };
      return userId;
    }
  } catch (error) {}

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
