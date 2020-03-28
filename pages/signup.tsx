import React, { useState } from "react";

import { useRouter } from "next/router";
import Snackbar from "../components/Snackbar";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { loginUser } from "../components/auth";
import withApollo from "../components/apollo/with-apollo";
import Link from "next/link";
import { Input, Button } from "antd";

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      user {
        firstName
        lastName
        email
      }
      token
    }
  }
`;

function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");

  const [signupMutation, { loading, error, data, client }] = useMutation(
    SIGNUP_MUTATION
  );

  return (
    <div>
      {error && <Snackbar message="This doesnt work yet 🙁" />}

      <div>
        <div>Sign up</div>
        <form
          noValidate
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            signupMutation({
              variables: { firstName, lastName, email, password }
            })
              .then(result => loginUser(result.data.signup.token, client))
              .catch(err => console.error(err));
          }}
        >
          <div>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button htmlType="submit" type="default" loading={loading}>
              Sign Up
            </Button>
          </div>

          <Link href="/login">
            <a>Already have an account? Log in</a>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withApollo(SignUp);
