import React, { Fragment } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import Link from "next/link";

export default function Index() {
  const styles = {
    brand: {
      fontSize: 20,
      marginBottom: 0,
    },
  };
  return (
    <Fragment>
      <Navbar bg="light">
        <Container>
          <Link href="/">
            <h6 style={styles.brand}>SIMPLILEARN</h6>
          </Link>
          <Button variant="outline-primary">Log In</Button>
        </Container>
      </Navbar>
    </Fragment>
  );
}
