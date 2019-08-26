import fetch from "isomorphic-unfetch";
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Users = ({ users }) => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <div>
        {users.map((user, i) => (
          <div key={i}>{user.name}</div>
        ))}
      </div>
    </Box>
  </Container>
);

Users.getInitialProps = async () => {
  const response = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/graphql"
      : `https://api-routes-graphql-app.kunalgorithm.now.sh/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query: "{ users { name } }" }),
    }
  );

  const {
    data: { users },
  } = await response.json();

  return { users };
};

export default Users;
