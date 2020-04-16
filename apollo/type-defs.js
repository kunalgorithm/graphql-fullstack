import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    password: String!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String!
  }

  type Query {
    users: [User!]!
    user(email: String!): User!
    me: User
  }

  type Mutation {
    signup(email: String!, name: String!, password: String!): User!
    login(email: String!, password: String!): User!
    signOut: Boolean!
    createPost(title: String!): Post!
  }
`;
