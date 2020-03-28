# GraphQL Fullstack Boilerplate

A monorepo web application boilerplate with authentication, a graphQL api, database access, and material-ui styling. Visit the demo at https://graphql-fullstack.now.sh

![Screenshot](static/screenshot.png)

# But Why

When building a new project, choosing a technology stack, configuring it, wiring it all together, and figuring out how to dpeloy it properly tends to take far more time that building and shipping features (the important _and_ fun part). This boilerplate starts you off with an app that already works, so you can get right to the good stuff.

# Features

⚡️ Deploy a full-featured production-ready web application in less than 60 seconds.

🔐 Allow users to sign up and log in with an email and password, view their profiles and data, and log out.

📃 Includes a splash page, login page, sign up page, and dashboard.

🤖‍‍ Uses prebuilt commonly-used components, including a sidebar, top navigation bar, animated line graph with [Recharts](http://recharts.org/en-US/), and [Material Icons](https://material.io/resources/icons/).

☁️ [Zero Config Deployments](https://zeit.co/blog/zero-config). It just works 🔥

# Quick Start

Clone the repository

```bash
git clone https://github.com/kunalgorithm/graphql-fullstack
```

install dependencies, then run the development server:

```bash
npm install
npm run dev
```

# Deploy

Deploy to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

Install the `now` CLI

```bash
npm install --global now
```

Then deploy using

```bash
now
```

# Tech stack

🤖 [Typescript](https://www.typescriptlang.org) - static types, used throughout the client and server (especially handy for the auto-generated prisma2 client).

🌚 [Next 9](https://github.com/zeit/next.js) - server-side rendering, file-based routing in the `pages` directory, and serverless build of of graphql API within `pages/api/graphql.ts` using [API Routes](https://github.com/zeit/next.js#api-routes)

🦋 [Apollo](https://www.apollographql.com/docs/react/hooks-migration/) (React Hooks API) - GraphQL client for queries and mutations.

🦄 [Prisma](https://prisma.io) - Next-generation database access and migration tools.

💅 [Material UI](https://material-ui.com) - Material UI components, CSS-in-JS styles solutions, and theme.

▲ [ZEIT now](https://now.sh) - serverless monorepo deployment

# Development

## Create new data types

Install the prisma CLI

```
npm install -g prisma
```

Then open `datamodel.graphql` in the `prisma` directory. Add a new optional field, _githubUrl_ to a data type, _User_.

```
type User {
  id: ID! @id @unique
  email: String!  @unique
  password: String!
}
```

becomes

```
type User {
  id: ID! @id @unique
  email: String!  @unique
  password: String!
+ githubUrl: String
}
```

Note that `!` signals that the field is required.

### Run the database migration

Once you've made the change to `datamodel.graphql`, create the migration by running `prisma deploy`, which applied a migration to synchronize changes with the database and generates a new prisma client to access it.

### Make it available to the frontend.

Now that you've added a new field to your database and made it available to the _server_, you need to make it available to your _client_ by defining it within the graphQL endpoint's type definitions.

Open the API route at `pages/api/graphql.ts` and extend

```
type User {
  ...
}
```

to

```
type User {
  ...
+ graphqlUrl: String
}
```

# Need help?

Send me a DM on twitter! [@kunalgorithm](https://twitter.com/kunalgorithm)
