import Router from "next/router";
import React from "react";
import { Nav } from "react-bootstrap";

export default function Index({ activeKey }) {
  return (
    <Nav variant="tabs" defaultActiveKey={activeKey}>
      <Nav.Item onClick={() => Router.push("/user/learn/class")}>
        <Nav.Link eventKey="class">Class</Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={() => Router.push("/user/learn/status")}>
        <Nav.Link eventKey="status">Status</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
