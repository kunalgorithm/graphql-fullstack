import { getUserId, Context } from "../../utils";

export const post = {
  async createDraft(parent, { title, content }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const numPosts = await ctx.prisma.posts.count();

    return ctx.prisma.posts.create({
      data: {
        post_id: numPosts,
        title,
        content,
        author_id: {
          connect: { id: userId }
        }
      }
    });
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.prisma.posts.findOne({
      where: { post_id: id }
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.prisma.posts.delete({ where: { post_id: id } });
  }
};
