import Link from "next/link";
import React, { Fragment } from "react";
import { Button, Container, Navbar } from "react-bootstrap";

export default function Index() {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link href="/">
            <Navbar.Brand>SIMPLILEARN</Navbar.Brand>
          </Link>
          <Button variant="outline-light">Log In</Button>
        </Container>
      </Navbar>
    </Fragment>
  );
}
