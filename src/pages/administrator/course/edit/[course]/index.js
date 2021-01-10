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
import Administrator from "../../../../../components/administrator";
import Fetch from "../../../../../libraries/fetch";
import NewLine from "../../../../../libraries/newline";
import { useAdministrator } from "../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      type
      title
      description
      learningpath {
        _id
      }
      keyfeature {
        _id
      }
      quiz {
        _id
      }
      bab {
        _id
      }
      class {
        _id
      }
      enrollment {
        _id
      }
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      course: result.data.courseById,
    };
  });
  return {
    props: {
      course: results.course,
    },
  };
}

export default function Index({ course }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [type, setType] = useState(course.type);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [loading, setLoading] = useState(false);
  function saveHandler() {
    setLoading(true);
    app.course.update({
      _id: course._id,
      type: type,
      title: title,
      description: NewLine(description),
    });
  }
  function deleteHandler() {
    setLoading(true);
    app.course.delete(course._id);
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
            onClick={() =>
              Router.push("/administrator/course/edit/" + course._id)
            }
          >
            {course.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/edit/" + course._id)
            }
          >
            Edit
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Edit Course</b>
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
              onClick={() => saveHandler()}
              style={{ marginRight: 10 }}
            >
              Save Changes
            </Button>
            <Button
              variant="danger"
              disabled={
                loading ||
                course.learningpath.length !== 0 ||
                course.keyfeature.length !== 0 ||
                course.quiz.length !== 0 ||
                course.bab.length !== 0 ||
                course.class.length !== 0 ||
                course.enrollment.length !== 0
              }
              onClick={() => deleteHandler()}
            >
              Delete Course
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
