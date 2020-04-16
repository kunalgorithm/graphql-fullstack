import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "../apollo/client";

export default () => {
  const { loading, error, data } = useQuery(
    gql`
      query {
        users {
          email
          name
        }
      }
    `
  );
  return (
    <div>
      <h2>Users</h2>
      <div>
        {data &&
          data.users &&
          data.users.map((user, i) => (
            <div key={i}>
              {user.name} - {user.email}
            </div>
          ))}
      </div>
    </div>
  );
};
