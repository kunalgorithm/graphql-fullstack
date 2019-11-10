import * as jwt from "jsonwebtoken";
import { Photon } from "@generated/photon";
import * as bcrypt from "bcryptjs";

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

export async function login(parent, { email, password }, ctx) {
  process.env.NODE_ENV === "development" &&
    console.log(`DEBUG: login()  ${email}`);
  const user = await ctx.photon.users.findOne({ where: { email } });

  if (!user) {
    throw new Error(`No user found for email: ${email}`);
  }

  const passwordValid = await bcrypt.compare(
    password,
    user.password || "password"
  );
  if (!passwordValid) {
    throw new Error("Invalid password");
  }
  return {
    token: jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET ? process.env.APPSECRET : "appsecret321"
    ),
    user,
  };
}

export async function signup(
  parent,
  { firstName, lastName, email, password },
  ctx
) {
  process.env.NODE_ENV === "development" &&
    console.log(`DEBUG: Signup() ${firstName} ${lastName} ${email}`);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await ctx.photon.users.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return {
    token: jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET ? process.env.APPSECRET : "appsecret321"
    ),
    user,
  };
}
