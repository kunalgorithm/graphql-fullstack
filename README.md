# GraphQL Fullstack Web Application 

A monorepo web application with authentication, a graphQL api, database access, and material-ui styling. 

## Tech stack 

[Nextjs](https://github.com/zeit/next.js) - server-side rendering, file-based routing in the `pages` directory, and serverless build of of graphql API within `pages/api/graphql.ts` using [API Routes](https://github.com/zeit/next.js#api-routes)
[Prisma 2](https://github.com/prisma/prisma2) - Next-generation database access and migration tools. *NOTE: Prisma 2 is currently in the preview phase and is not yet ready for use in production.*
[Material UI](https://material-ui.com) - Material UI components, CSS-in-JS styles solutions, and theme. 
[ZEIT now](https://now.sh) - serverless monorepo deployment


## How to use


Clone the repository

```bash
git clone https://github.com/kunalgorithm/graphql-fullstack
```


install dependencies, then run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

