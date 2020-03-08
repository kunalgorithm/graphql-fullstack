import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// local imports
import { loginUser } from "../components/auth";
import withApollo from "../components/apollo/with-apollo";
import Snackbar from "../components/Snackbar";

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

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    loginMutation({ variables: { email, password } })
      .then(result => loginUser(result.data.login.token, client))
      .catch(err => console.error(err));

  }

  return (
    <Container component="main" maxWidth="xs">
      {error && <Snackbar message="This doesnt work yet 🙁" />}

      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={e => setPassword(e.target.value)}
            />

          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSubmit}
            >
              Sign In
            </button>

          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </Container>
  );
}

export default withApollo(SignIn);
