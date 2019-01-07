const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they're logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  }
};

module.exports = Mutations;
