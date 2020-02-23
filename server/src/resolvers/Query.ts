import { getUserId, Context } from "../utils";

export const Query = {
  feed(parent, args, ctx: Context) {
    return ctx.prisma.posts.findMany({});
  },

  drafts(parent, args, ctx: Context) {
    const id = getUserId(ctx);

    const where = {
      published: false,
      author: {
        id
      }
    };

    return ctx.prisma.posts.findMany({});
  },

  post(parent, { id }, ctx: Context) {
    return ctx.prisma.posts.findOne({ where: { post_id: id } });
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma.users.findOne({ where: { id } });
  }
};
