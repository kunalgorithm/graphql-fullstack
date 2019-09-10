import cookie from "cookie";
import Router from "next/router";
import gql, { ApolloClient } from "apollo-boost";

export const loginUser = (token, client) => {
  // USE COOKIES FOR SSR: Store the token in cookie
  document.cookie = cookie.serialize("token", token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  client.clearStore();
  redirect({}, "/app");
  // TODO Force a reload of all the current queries now that the user is
  // logged in
  // client.cache.reset().then(() => {
  //     redirect({}, '/profile');
  // });
  return;
};
export const logoutUser = (client: ApolloClient<any>) => {
  redirect({}, "/");
  document.cookie = cookie.serialize("token", "");
  client.clearStore();

  return;
};

export const redirect = (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};

export const checkLoggedIn = (apolloClient: ApolloClient<any>) =>
  apolloClient
    .readQuery({ query: null })

    // .query({
    //   query: gql`
    //     query me {
    //       me {
    //         id
    //         email
    //       }
    //     }
    //   `,
    // })
    .then(({ data }) => {
      console.log("user data", data);

      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      console.log("no user data");
      return { loggedInUser: {} };
    });
