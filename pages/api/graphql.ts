import { ApolloServer, gql } from "apollo-server-micro";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import Photon from "@generated/photon";
const photon = new Photon();

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type Mutation {
    signup(
      email: String!
      password: String!
      firstName: String
      lastName: String
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
  type User {
    firstName: String
    lastName: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return photon.users.findMany({});
    },
  },
  Mutation: {
    signup: async function signup(
      parent,
      { email, name, password, firstName, lastName },
      ctx
    ) {
      console.log(`Signup() ${name} ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await photon.users.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          // password: hashedPassword,
        },
      });

      return {
        token: jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET ? process.env.APPSECRET : "appsecret321"
        ),
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
        token: jwt.sign(
          { userId: user.id },
          process.env.APP_SECRET ? process.env.APPSECRET : "appsecret321"
        ),
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
