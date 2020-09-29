import React, { Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import { Button, Container, Navbar } from "react-bootstrap";
import Router from "next/router";

export default function Index() {
  const styles = {
    brand: {
      fontSize: 20,
      marginBottom: 0,
    },
  };
  return useObserver(() => (
    <Fragment>
      <Navbar bg="light">
        <Container>
          <div>
            <h6 style={styles.brand} onClick={() => Router.push("/")}>
              SIMPLILEARN
            </h6>
          </div>
          <div>
            <Button variant="outline-primary">Log In</Button>
          </div>
        </Container>
      </Navbar>
    </Fragment>
  ));
}
