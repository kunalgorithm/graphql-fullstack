import React, { useState } from "react";

import { useRouter } from "next/router";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { withApollo } from "../apollo/client";
import Link from "next/link";
import { Input, Button, message, Row, Col } from "antd";
import Field from "../components/Field";

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

  const [signupMutation, { loading, error, data, client }] = useMutation(
    SIGNUP_MUTATION
  );

  return (
    <Row justify="center">
      <Col md={12} sm={18} xs={24}>
        <h3>Sign up</h3>
        <form
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const {
              email,
              name,
              password,
              //@ts-ignore
            } = event.currentTarget.elements;

            try {
              await client.resetStore();
              const result: { data?: any } = await signupMutation({
                variables: {
                  email: email.value,
                  password: password.value,
                  name: name.value,
                },
              });

              if (result.data && result.data.signup) {
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
          <Field placeholder="Name" name="name" type="name" />

          <Field
            type="password"
            name="password"
            autoComplete="password"
            required
            placeholder="Password"
          />

          <div>
            <Button htmlType="submit" type="default" loading={loading}>
              Sign Up
            </Button>
          </div>

          <Link href="/login">
            <a>Already have an account? Log in</a>
          </Link>
        </form>
      </Col>
    </Row>
  );
}

export default withApollo(SignUp);
