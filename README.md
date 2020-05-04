# GraphQL Fullstack Boilerplate

A monorepo web application boilerplate with a graphQL API, server-side cookie authentication with bcrypt and [jwt](https://jwt.io), database access with [Prisma 2](https://prisma.io), and styling with [Ant Design](https://ant.design).

![Screenshot](public/screenshot.png)

# But Why

When building a new project, choosing a technology stack, configuring it, wiring it all together, and figuring out how to dpeloy it properly tends to take far more time that building and shipping features (the important _and_ enjoyable part). This boilerplate starts you off with an app that already works, so you can get right to the good stuff.

# Features

⚡️ Deploy a full-featured production-ready web application in less than 60 seconds.

🔐 Allow users to sign up and log in with an email and password, view their profiles and data, and log out. Outputs feedback for loading and errors states to enhance UX.

📃 Includes a splash page, login page, sign up page, and dashboard.

🤖‍‍ Includes wired up forms, queries, mutations, snackbars, and more commonly used components.

☁️ [Zero Config Deployments](https://zeit.co/blog/zero-config). It just works 🔥

# Quick Start

Clone the repository

```bash
git clone https://github.com/kunalgorithm/graphql-fullstack
```

install dependencies, then run the development server:

```bash
yarn
yarn dev
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

🌚 [Next 9.3](https://github.com/zeit/next.js) - server-side rendering, file-based routing in the `pages` directory, and serverless build of of graphql API within `pages/api/graphql.ts` using [API Routes](https://github.com/zeit/next.js#api-routes).

🦋 [Apollo](https://www.apollographql.com/docs/react/hooks-migration/) (React Hooks API) - GraphQL client for queries and mutations.

🦄 [Prisma](https://prisma.io) - Next-generation database access and migration tools.

💅 [Ant Design](https:/ant.design) - Beautiful, responsive, easy-to-use components.

▲ [ZEIT now](https://now.sh) - serverless monorepo deployment.

# Development

## Create new data types

Create a new project and install the prisma CLI, along with typescript, as development dependencies

```
npm init -y
yarn add -D @prisma/cli typescript ts-node @types/node
```

You can now invoke the prisma CLI

```
npx prisma
```

Then, open `schema.prisma` in the `prisma` directory and add the following

```prisma
datasource sqlite {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native"]
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  password String

}

```

## Migrate your database

`yarn migrate:save`

and add a name, perhaps simply "init", to save your first database migration. When asked whether to create a SQLite file, select yes. Then, apply the migration by running

`yarn migrate:up`

Finally, run

`yarn generate`

to generate the prisma client to reflect the new changes.

### Adding a new field

Open `schema.prisma` in the `prisma` directory. Add a new optional field, _githubUrl_ to a data type, _User_.

```prisma
model User {
  id         Int      @id @default(autoincrement())
  createdAt  DateTime @default(now())
  email      String   @unique
  name       String?
  password   String
  githubUrl  String?
}
```

> Note: the `?` signals that the field is optional.

### Make it available to the frontend.

Now that you've added a new field to your database and made it available to the _server_, you need to make it available to your _client_ by defining it within the graphQL endpoint's type definitions.

Open the API type defintion file at `apollo/typedefs.js` and extend

```diff
type User {
  ...
+ graphqlUrl: String
}
```

Now, render the new data on the app by adding it to the query on the `Profile` component

```diff
const { loading, error, data, client } = useQuery(
  gql`
    query {
      me {
        id
        name
        email
+       githubUrl
      }
    }
  `
);
```

## Authentication

The API sets a server-side cookie with `http: only` enabled on the root of the domain, seen in the `login` and `signup` resolvers:

```ts
ctx.res.setHeader(
  "Set-Cookie",
  cookie.serialize("token", token, {
    httpOnly: true,
    maxAge: 6 * 60 * 60, // 6 hours
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
);
```

which is automatically attached to subsequent requests to the server and parsed and accessible via NextJS's API Routes for resolvers that require authenticated users:

```ts
const { token } = cookie.parse(ctx.req.headers.cookie ?? "");

if (token) {
  try {
    const { id, email } = jwt.verify(token, JWT_SECRET);
    return await ctx.prisma.user.findOne({ where: { id } });
  } catch {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
}
```

This solves two problems pervasive in modern javascript applications:

1. The cookies cannot be read from client-side javascript, protecting the application from cross-site forgery attacks.
2. The cookie is attached to requests received by the server automatically, allowing server-side requests from Next to be authenticated without requiring the client to handle and attach the token manually. This not only speeds up data requests, but cleans up the client-side code quite a bit.

## Deployment

This app uses SQLite for local development, which stores application data in a local file. To deploy the platform, however, you'll have to provision a postgres or MySQL database in the cloud for your deployment to connect to.

You can prepare for this by switching from developing on SQLite locally to a local postgres instance. To do this, change the datasource in `schema.prisma` to

```prisma
datasource postgres {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

and set the `DATABASE_URL` as an environment variable in your terminal

```bash
export DATABASE_URL=postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public
```

Then, follow the instructions above for _Migrating your database_, then restart your development server on the same terminal and ensure you can read and write data to the new database correctly.

### Deploying Render

You deploy this app and a managed postgres instance on [Render](https://render.com) and connect to it securely with an internal connection string, only useable by applications on the Render platform.

> Note: that web service starter plan deployments and postgres database starter instances each cost \$7/month on render at the time of writing.

To deploy on render, just hit

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/kunalgorithm/fullstack-graphql)

## Contributions welcome!

Feel free to open an issue or submit a pull request 🙂

## Need help?

Send me a DM on twitter! [@kunalgorithm](https://twitter.com/kunalgorithm)
