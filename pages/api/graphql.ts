import { ApolloServer, gql } from "apollo-server-micro";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Photon from "@generated/photon";
const photon = new Photon();

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type Mutation {
    signup(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
  type User {
    name: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    async users(parent, args, context) {
      return await photon.users();
    },
  },
  Mutation: {
    signup: async function signup(parent, { email, name, password }, ctx) {
      console.log(`Signup() ${name} ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await photon.users.create({
        data: {
          email,
          password: hashedPassword,
          // password: hashedPassword,
        },
      });

      return {
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
        user,
      };
    },
    login: async function login(parent, { email, password }, ctx) {
      console.log(`login()  ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await photon.users.findOne({ where: { email } });

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
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
        user,
      };
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
