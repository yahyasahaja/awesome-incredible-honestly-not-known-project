import React, { Fragment, useState } from "react";
import { useApplication } from "../../../../store";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AdminPanel from "../../../../components/adminpanel";
import NewLine from "../../../../library/newline";
import Link from "next/link";

export default function Index() {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useApplication();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.course.add({
      _id: "",
      type: type,
      title: title,
      description: NewLine(description),
    });
  }
  return (
    <Fragment>
      <AdminPanel />
      <Container style={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel">Admin Panel</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel/course">Course</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel/course/add">Add</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      disabled={loading}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" hidden>
                        Select Type
                      </option>
                      <option value="postgraduate">Post Graduate</option>
                      <option value="master">Master</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={title}
                      disabled={loading}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. React JS"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  disabled={loading}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your course clearly"
                />
              </Form.Group>
            </Form>
            <hr />
            <Button
              disabled={
                loading || type === "" || title === "" || description === ""
              }
              onClick={() => addHandler()}
            >
              Add Course
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
