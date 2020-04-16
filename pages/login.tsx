import React, { useState } from "react";
import { gql } from "apollo-boost";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import { Input, Button, message, Row, Col } from "antd";
import { useRouter } from "next/router";

import { withApollo } from "../apollo/client";
import Field from "../components/Field";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      name
    }
  }
`;

function SignIn() {
  const [loginMutation, { error, client, loading }] = useMutation(
    LOGIN_MUTATION
  );
  const router = useRouter();

  return (
    <Row justify="center">
      <Col md={12} sm={18} xs={24}>
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

              if (result.data && result.data.login) {
                await router.push("/");
              }
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
            placeholder="Email"
          />

          <Field
            type="password"
            name="password"
            autoComplete="password"
            required
            placeholder="Password"
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
      </Col>
    </Row>
  );
}

export default withApollo(SignIn);
