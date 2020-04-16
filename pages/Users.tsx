import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../components/apollo/with-apollo";

export default withApollo(() => {
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
});
