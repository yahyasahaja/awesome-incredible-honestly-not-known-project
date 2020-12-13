import Router from "next/router";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Administrator from "../../../../components/administrator";
import NewLine from "../../../../libraries/newline";
import { useAdministrator } from "../../../../stores/administrator";

export default function Index() {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.course.add({
      type: type,
      title: title,
      description: NewLine(description),
    });
  }
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
            onClick={() => Router.push("/administrator/course")}
          >
            Course
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() => Router.push("/administrator/course/add")}
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Course</b>
          </Card.Header>
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
