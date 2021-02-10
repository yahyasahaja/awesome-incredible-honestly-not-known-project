import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Card, Container, Form, Button } from "react-bootstrap";
import Administrator from "../../../../components/administrator";
import { useAdministrator } from "../../../../stores/administrator";

export default function Index() {
  const app = useAdministrator();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setError(0);
    setLoading(true);
    app.instructor
      .add({
        name: name,
        email: email,
        password: password,
      })
      .catch((result) => {
        setError(result);
        setLoading(false);
      });
  }
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  return (
    <Fragment>
      <Administrator />
      <Container style={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() => Router.push("/administrator")}
          >
            Administrator
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() => Router.push("/administrator/instructor")}
          >
            Instructor
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() => Router.push("/administrator/instructor/add")}
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Instructor</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elon Musk"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. elon.musk@tesla.com"
                />
                {error === 1 && (
                  <Form.Text className="text-danger">
                    This email is already used
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  disabled={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
            <hr />
            <Button
              disabled={
                loading || name === "" || email === "" || password === ""
              }
              onClick={() => addHandler()}
            >
              Add Instructor
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
