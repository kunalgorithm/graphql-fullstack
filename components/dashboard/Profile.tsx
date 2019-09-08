import fetch from "isomorphic-unfetch";
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../lib/with-apollo";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

import theme from "../theme";

const useStyles = makeStyles({
  profile: {
    flex: 1,
  },
});

const Profile = ({}) => {
  const classes = useStyles(theme);
  const { loading, error, data } = useQuery(
    gql`
      query {
        me {
          firstName
          lastName
          email
        }
      }
    `
  );
  if (loading) return <div>Loading...</div>;
  if (data)
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Title>Profile</Title>

          <Typography className={classes.profile}>
            {data && data.me ? (
              <>
                {" "}
                {data.me.firstName} {data.me.lastName}
                <br />
                {data.me.email}
              </>
            ) : (
              <h4>You are not logged in.</h4>
            )}
          </Typography>
        </Box>
      </Container>
    );
};

export default withApollo(Profile);
