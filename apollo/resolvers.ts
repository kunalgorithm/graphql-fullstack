import { AuthenticationError, UserInputError } from "apollo-server-micro";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcrypt";
import v4 from "uuid/v4";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export interface Context {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
}

const JWT_SECRET = getConfig().serverRuntimeConfig.JWT_SECRET;

const users: {
  id: string;
  name: string;
  email: string;
  password: string;
}[] = [];


function validPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

export const resolvers = {
  Query: {
    async me(_parent, _args, ctx: Context, _info) {
      const { token } = cookie.parse(ctx.req.headers.cookie ?? "");
      if (token) {
        try {
          const { id, email } = jwt.verify(token, JWT_SECRET);

          return users.find((user) => user.id === id && user.email === email);
        } catch {
          throw new AuthenticationError(
            "Authentication token is invalid, please log in"
          );
        }
      }
    },
    async users(_parent, _args, ctx: Context, _info) {
      return ctx.prisma.user.findMany();
    },
  },

  Mutation: {
    async signup(_parent, args, ctx: Context, _info): Promise<User> {

      const salt = bcrypt.genSaltSync();

      const user = await ctx.prisma.user.create({data: {

        email: args.email,
        name: args.name,
        password: bcrypt.hashSync(args.password, salt),
      }})


      return user;
    },

    async login(_parent, args, ctx: Context, _info) {

      const user = await ctx.prisma.user.findOne({where: {email:args.email}})

      if (user && validPassword(user, args.input.password)) {
        const token = jwt.sign(
          { email: user.email, id: user.id, time: new Date() },
          JWT_SECRET,
          {
            expiresIn: "6h",
          }
        );

        ctx.res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          })
        );

        return user;
      }

      throw new UserInputError("Invalid email and password combination");
    },
    async signOut(_parent, _args, ctx: Context, _info) {
      ctx.res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          maxAge: -1,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return true;
    },
  },
};
