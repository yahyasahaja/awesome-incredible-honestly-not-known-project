import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import Router from "next/router";

export default function Index() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Admin Panel</Navbar.Brand>
        <Button variant="outline-dark" onClick={() => Router.push("/")}>
          Home Page
        </Button>
      </Container>
    </Navbar>
  );
}
