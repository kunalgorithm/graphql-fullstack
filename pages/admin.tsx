import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "../apollo/client";
import Users from "../components/Users";

export default withApollo(() => {
  if (process.env.NODE_ENV === "production")
    return <div>This page is only viewable on localhost.</div>;

  return <Users />;
});
