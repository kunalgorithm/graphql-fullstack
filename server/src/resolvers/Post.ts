import { Context } from "../utils";

export const Post = {
  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.posts.findOne({ where: { post_id: id } }).author_id();
  }
};
