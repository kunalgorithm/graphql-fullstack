import fetch from "isomorphic-unfetch";
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../components/lib/with-apollo";

const Users = ({}) => {
  const { loading, error, data } = useQuery(
    gql`
      query {
        users {
          firstName
          lastName
        }
      }
    `
  );

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users
        </Typography>

        <div>
          {data &&
            data.users &&
            data.users.map((user, i) => <div key={i}>{user.firstName} {user.lastName}</div>)}
        </div>
      </Box>
    </Container>
  );
};

export default withApollo(Users);
