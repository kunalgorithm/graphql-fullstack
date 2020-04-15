import React, { useState } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// local imports
import { loginUser } from "../components/auth";
import withApollo from "../components/apollo/with-apollo";

import { Input, Button, message } from "antd";
import Link from "next/link";
import Field from "../components/Field";

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
  const [loginMutation, { error, client, loading }] = useMutation(
    LOGIN_MUTATION
  );

  return (
    <div>
      <h3>Log in</h3>

      <form
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const {
            email,
            password,
            //@ts-ignore
          } = event.currentTarget.elements;

          try {
            await client.resetStore();
            const result: { data?: any } = await loginMutation({
              variables: {
                email: email.value,
                password: password.value,
              },
            });

            if (result.data) loginUser(result.data.login.token, client);
          } catch (error) {
            message.error(error.message);
          }
        }}
      >
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />

        <Field
          type="password"
          name="password"
          autoComplete="password"
          required
          label="Email"
        />

        <div>
          <Button htmlType="submit" type="default" loading={loading}>
            Log In
          </Button>
        </div>

        <div>
          <Link href="/signup">
            <a>Don't have an account? Sign Up</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default withApollo(SignIn);
