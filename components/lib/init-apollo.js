import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV !== "development") return;
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

let apolloClient = null;

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== "undefined";
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      errorLink,
      new HttpLink({
        uri:
          process.env.NODE_ENV === "development"
            ? "http://localhost:4000/"
            : `https://cosign-api.onrender.com/`, // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        // Use fetch() polyfill on the server
        fetch: !isBrowser && fetch,
      }),
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
