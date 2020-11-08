import React, { Fragment, useState } from "react";
import { useApplication } from "../../../../../store";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AdminPanel from "../../../../../components/adminpanel";
import NewLine from "../../../../../library/newline";
import Fetch from "../../../../../library/fetch";
import SortArray from "sort-objects-array";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      type
      title
      description
      learningpath {
        _id
        order
        title
        description
      }
    }
  }`).then(result => {
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
    description: { textAlign: "justify" },
    card: { marginTop: 15 },
    cardheader: { marginBottom: 0 },
    learningpath: {
      marginTop: -32.5,
      marginRight: 27.5,
      marginBottom: -1,
    },
  };
  const app = useApplication();
  const [order, setOrder] = useState("1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [learningPath, setLearningPath] = useState(course.learningpath);
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.learningpath
      .add({
        _id: "",
        order: order,
        title: title,
        description: NewLine(description),
        course: course._id,
      })
      .then(result => {
        setLearningPath([
          ...learningPath,
          {
            _id: result,
            order: order,
            title: title,
            description: description,
          },
        ]);
        setOrder("1");
        setTitle("");
        setDescription("");
        setLoading(false);
      });
  }
  function deleteHandler(_id) {
    setLoading(true);
    app.learningpath.delete(_id).then(() => {
      setLearningPath(
        learningPath.filter(item => {
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
              Learning Path
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Body>
            <h5>{course.title}</h5>
            <small className="text-muted">
              Type :{" "}
              {course.type === "postgraduate" ? "Post Graduate" : "Master"}
            </small>
            <hr />
            <div style={styles.description}>
              {course.description}
            </div>
          </Card.Body>
        </Card>
        <Card style={styles.card}>
          <Card.Header>
            <h6 style={styles.cardheader}>Learning Path</h6>
          </Card.Header>
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
              <Button
                disabled={loading || title === "" || description === ""}
                onClick={() => addHandler()}
              >
                Add Learning Path
              </Button>
            </Form>
            <hr />
          </Card.Body>
          <ul className="timeline" style={styles.learningpath}>
            {SortArray(learningPath, "order").map(item => {
              return (
                <li key={item._id}>
                  <h6>
                    {item.order}. {item.title}{" "}
                    {loading ? (
                      <small className="text-muted">Delete</small>
                    ) : (
                      <small>
                        <a href="#!" onClick={() => deleteHandler(item._id)}>
                          Delete
                        </a>
                      </small>
                    )}
                  </h6>
                  <div style={styles.description}>
                    {item.description}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </Container>
    </Fragment>
  );
}
