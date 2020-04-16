import React from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "../apollo/client";

import { Input, Button } from "antd";

import { logoutUser } from "./auth";
import Link from "next/link";

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;
const Profile = ({}) => {
  const [signOut] = useMutation(SignOutMutation);
  return (
    <div>
      <Button onClick={() => {}}>Log Out</Button>
    </div>
  );
};

export default withApollo(Profile);
