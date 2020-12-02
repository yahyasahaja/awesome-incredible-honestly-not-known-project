import Link from "next/link";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-feather";
import SortArray from "sort-objects-array";
import AdminPanel from "../../../../../components/adminpanel";
import Fetch from "../../../../../libraries/fetch";
import NewLine from "../../../../../libraries/newline";
import { useApplication } from "../../../../../stores";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
      learningpath {
        _id
        order
        title
        description
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
    buttonadd: { padding: 0 },
    description: { textAlign: "justify" },
    learningpathcard: { marginTop: 15 },
  };
  const app = useApplication();
  const [add, setAdd] = useState(false);
  const [order, setOrder] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [learningPath, setLearningPath] = useState(course.learningpath);
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.learningpath
      .add({
        order: order,
        title: title,
        description: NewLine(description),
        course: course._id,
      })
      .then((result) => {
        setLearningPath([
          ...learningPath,
          {
            _id: result,
            order: order,
            title: title,
            description: description,
          },
        ]);
        setOrder("");
        setTitle("");
        setDescription("");
        setLoading(false);
      });
  }
  function deleteHandler(_id) {
    setLoading(true);
    app.learningpath.delete(_id).then(() => {
      setLearningPath(
        learningPath.filter((item) => {
          return item._id !== _id;
        })
      );
      setLoading(false);
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
            <Link
              href="/adminpanel/course/learningpath/[course]"
              as={"/adminpanel/course/learningpath/" + course._id}
            >
              {course.title}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/course/learningpath/[course]"
              as={"/adminpanel/course/learningpath/" + course._id}
            >
              Learning Path
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <b>Add Learning Path</b>
            <Button
              size="sm"
              variant="light"
              style={styles.buttonadd}
              onClick={() => setAdd(!add)}
            >
              {add ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
          </Card.Header>
          {add === true && (
            <Card.Body>
              <Form>
                <Row>
                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label>Order</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        disabled={loading}
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        placeholder="e.g. 1"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={10}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        value={title}
                        disabled={loading}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. VSCode Installation"
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
                    placeholder="Describe your learning path clearly"
                  />
                </Form.Group>
                <hr />
                <Button
                  disabled={loading || title === "" || description === ""}
                  onClick={() => addHandler()}
                >
                  Add Learning Path
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>
        <Card style={styles.learningpathcard}>
          <Card.Header>
            <b>Learning Path List</b>
          </Card.Header>
          <ListGroup variant="flush">
            {SortArray(learningPath, "order").map((item) => {
              return (
                <ListGroup.Item action key={item._id}>
                  <div>
                    <b>
                      {item.order}. {item.title}
                    </b>{" "}
                    {loading ? (
                      <small className="text-muted">Delete</small>
                    ) : (
                      <small>
                        <a href="#!" onClick={() => deleteHandler(item._id)}>
                          Delete
                        </a>
                      </small>
                    )}
                  </div>
                  <div style={styles.description}>{item.description}</div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Container>
    </Fragment>
  );
}
