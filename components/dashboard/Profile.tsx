import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../apollo/with-apollo";
import { Input, Button } from "antd";

import { logoutUser } from "../auth";

const Profile = ({}) => {
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
  if (!data || !data.me) return <h1>You are not logged in.</h1>;
  return (
    <div>
      <div>
        <h1>Profile</h1>

        <div>
          {data.me.firstName} {data.me.lastName}
          <br />
          {data.me.email}
          <br />
          <Button onClick={() => logoutUser(client)}>Log Out</Button>
        </div>
      </div>
    </div>
  );
};

export default withApollo(Profile);
