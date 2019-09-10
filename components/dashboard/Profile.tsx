import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../apollo/with-apollo";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { logoutUser } from "../auth";
import theme from "../theme";

const useStyles = makeStyles({
  profile: {
    flex: 1,
  },
});

const Profile = ({}) => {
  const classes = useStyles(theme);
  const { loading, error, data, client } = useQuery(
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
  if (!data || !data.me) return <Title>You are not logged in.</Title>;
  return (
    <Container maxWidth="sm">
      <Box my={1}>
        <Title>Profile</Title>

        <Typography className={classes.profile}>
          {" "}
          {data.me.firstName} {data.me.lastName}
          <br />
          {data.me.email}
          <br />
          <Button onClick={() => logoutUser(client)}>Log Out</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default withApollo(Profile);
