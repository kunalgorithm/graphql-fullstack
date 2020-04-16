import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    password: String!
  }

  type Query {
    users: [User!]!
    # user(id: ID!): User!
    me: User
  }

  type Mutation {
    signup(email: String!, name: String!, password: String!): User!
    login(email: String!, password: String!): User!
    signOut: Boolean!
  }
`;
