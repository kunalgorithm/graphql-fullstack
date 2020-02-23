import { Context } from "../utils";

export const User = {
  posts: ({ id }, args, ctx: Context) => {
    return ctx.prisma.users.findOne({ where: { id } }).posts();
  }
};
