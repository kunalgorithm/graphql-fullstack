import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import { PrismaClient } from "@prisma/client";
// or const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const apolloServer = new ApolloServer({
  schema,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
