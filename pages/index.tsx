import React from "react";

import Link from "next/link";
import { Copyright } from "../components/dashboard/Copyright";

const Index = ({ users }) => (
  <div>
    <div>
      <div>GraphQL Fullstack Web App</div>
      <Link href="/login">
        <a>Login</a>
      </Link>{" "}
      ,{" "}
      <Link href="/signup">
        <a>Sign up</a>
      </Link>
      ,{" or "}
      <Link href="/app">
        <a>skip to the Dashboard.</a>
      </Link>
    </div>
    <div>
      <Copyright />
    </div>
  </div>
);

export default Index;
