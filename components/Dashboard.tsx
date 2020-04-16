import React from "react";

import Profile from "./Profile";
import { Row, Col } from "antd";
import Users from "./Users";
import Posts from "./Posts";

export default function Dashboard() {
  return (
    <div>
      <Row>
        <Col span={8}>
          <Row>
            <Profile />
          </Row>
          <Row>
            <Users />
          </Row>
        </Col>
        <Col span={8}>
          <Posts />
        </Col>
        {/* <Col span={8}>
          <Users />
        </Col> */}
      </Row>
      <style jsx>{`
        display: block;
        width: 100%;
      `}</style>
    </div>
  );
}
