import React, { Fragment, useState } from "react";
import { useApplication } from "../../../../../store";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AdminPanel from "../../../../../components/adminpanel";
import Fetch from "../../../../../library/fetch";
import SortArray from "sort-objects-array";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      type
      title
      description
      keyfeature {
        _id
        order
        title
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
    keyfeature: {
      marginTop: -32.5,
      marginRight: 27.5,
      marginBottom: -1,
    },
  };
  const app = useApplication();
  const [order, setOrder] = useState("1");
  const [title, setTitle] = useState("");
  const [keyFeature, setKeyFeature] = useState(course.keyfeature);
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.keyfeature
      .add({
        _id: "",
        order: order,
        title: title,
        course: course._id,
      })
      .then(result => {
        setKeyFeature([
          ...keyFeature,
          {
            _id: result,
            order: order,
            title: title,
          },
        ]);
        setOrder("1");
        setTitle("");
        setLoading(false);
      });
  }
  function deleteHandler(_id) {
    setLoading(true);
    app.keyfeature.delete(_id).then(() => {
      setKeyFeature(
        keyFeature.filter(item => {
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
              href="/adminpanel/course/keyfeature/[course]"
              as={"/adminpanel/course/keyfeature/" + course._id}
            >
              Key Feature
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
            <h6 style={styles.cardheader}>Key Feature</h6>
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
                      placeholder="e.g. 200+ Hours Of Applied Learning"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                disabled={loading || title === ""}
                onClick={() => addHandler()}
              >
                Add Key Feature
              </Button>
            </Form>
            <hr />
          </Card.Body>
          <ul className="timeline" style={styles.keyfeature}>
            {SortArray(keyFeature, "order").map(item => {
              return (
                <li key={item._id}>
                  <h6 style={styles.cardheader}>
                    {item.order}. {item.title}
                  </h6>
                  {loading ? (
                    <small className="text-muted">Delete</small>
                  ) : (
                    <small>
                      <a href="#!" onClick={() => deleteHandler(item._id)}>
                        Delete
                      </a>
                    </small>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </Container>
    </Fragment>
  );
}
