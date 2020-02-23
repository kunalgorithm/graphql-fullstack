import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  request: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: number;
    };
    return userId;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
