import React, { useState } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// local imports
import { loginUser } from "../components/auth";
import withApollo from "../components/apollo/with-apollo";

import { Input, Button, message } from "antd";
import Link from "next/link";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { error, client, loading }] = useMutation(
    LOGIN_MUTATION
  );
  if (error) message.error(error.message);

  return (
    <div>
      <h3>Log in</h3>

      <div>
        <form
          noValidate
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            loginMutation({ variables: { email, password } })
              .then(result => loginUser(result.data.login.token, client))
              .catch(err => console.error(err));
          }}
        >
          <div>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button htmlType="submit" type="default" loading={loading}>
              Log In
            </Button>
          </div>

          <Link href="/signup">
            <a>Don't have an account? Sign Up</a>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withApollo(SignIn);
