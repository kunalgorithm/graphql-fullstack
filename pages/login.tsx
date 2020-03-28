import React, { useState } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// local imports
import { loginUser } from "../components/auth";
import withApollo from "../components/apollo/with-apollo";
import Snackbar from "../components/Snackbar";
import { Input, Button } from "antd";
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

  const [loginMutation, { error, client }] = useMutation(LOGIN_MUTATION);
  return (
    <div>
      {error && <Snackbar message="This doesnt work yet 🙁" />}
      <div>
        <div>Log in</div>
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
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>

          <Link href="/signup">
            <a>Don't have an account? Sign Up</a>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withApollo(SignIn);
