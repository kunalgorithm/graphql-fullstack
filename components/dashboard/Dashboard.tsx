import React from "react";

import Profile from "./Profile";
import { Copyright } from "./Copyright";

export default function Dashboard() {
  return (
    <div>
      <main>
        <div>
          <Profile />
        </div>
        <Copyright />
      </main>
    </div>
  );
}
