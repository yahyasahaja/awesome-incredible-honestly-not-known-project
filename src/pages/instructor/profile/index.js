import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Instructor from "../../../components/instructor";
import Fetch from "../../../libraries/fetch";
import { useInstructor } from "../../../stores/instructor";

export default function Index() {
  const app = useInstructor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      return new Promise((resolve, reject) => {
        if (app.session.data._id === undefined) {
          resolve();
          Router.push("/instructor/login");
        } else {
          /* eslint-disable */
          Fetch(`{
            instructorByParam(_id:"` + app.session.data._id + `") {
              name
              email
            }
          }`).then((result) => {
            /* eslint-enable */
            resolve(result.data.instructorByParam);
          });
        }
      });
    }
    getData().then((result) => {
      setName(result.name);
      setEmail(result.email);
      setLoading(false);
    });
  }, [app.session.data._id]);
  function saveHandler() {
    setError(0);
    setLoading(true);
    app.profile
      .update({
        name: name,
        email: email,
        password: password,
        confirmation: confirmation,
      })
      .then(() => {
        setPassword("");
        setConfirmation("");
        setLoading(false);
      })
      .catch((result) => {
        setError(result);
        setLoading(false);
      });
  }
  return (
    <Fragment>
      <Instructor />
      <br />
      <Container>
        <Card>
          <Card.Header>
            <b>{loading ? "Loading..." : "Profile"}</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                {error === 1 && (
                  <Form.Text className="text-danger">
                    This email is already used
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirmation Password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  disabled={loading}
                />
                {error === 2 && (
                  <Form.Text className="text-danger">
                    Incorrect Password
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                block
                disabled={
                  loading ||
                  name === "" ||
                  email === "" ||
                  password === "" ||
                  confirmation === ""
                }
                onClick={() => saveHandler()}
              >
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
