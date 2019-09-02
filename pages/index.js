import fetch from "isomorphic-unfetch";
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import ProTip from "../components/ProTip";
import Link from "../components/Link";

const Index = ({ users }) => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        GraphQL Serverless Web App
      </Typography>
      <Link href="/login" color="secondary">
        Login
      </Link>{" "}
      or{" "}
      <Link href="/signup" color="secondary">
        Sign up
      </Link>
    </Box>
  </Container>
);

export default Index;
