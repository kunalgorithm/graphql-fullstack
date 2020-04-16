import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "../apollo/client";

import { Input, Button } from "antd";
import Link from "next/link";

const Profile = () => {
  const { loading, error, data, client } = useQuery(
    gql`
      query {
        me {
          id
          name
          email
        }
      }
    `
  );
  if (loading) return <div>Loading...</div>;
  if (!data || !data.me)
    return (
      <div>
        <h1>You are not logged in.</h1>
        <Link href="/login">
          <a>Login</a>
        </Link>{" "}
        or{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </div>
    );
  return (
    <div>
      <div>
        <h1>Profile</h1>

        <div>
          {data.me.name}
          <br />
          {data.me.email}
          <br />
          <Link href="/signout">
            <Button onClick={() => {}}>Log Out</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
