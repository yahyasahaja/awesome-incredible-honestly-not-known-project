import Router from "next/router";
import React from "react";
import { Container, Navbar, Dropdown } from "react-bootstrap";
import { useInstructor } from "../stores/instructor";

export default function Index() {
  const app = useInstructor();
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Instructor</Navbar.Brand>
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark">
            {app.session.data.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => Router.push("/instructor/profile")}>
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => app.session.logout()}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
