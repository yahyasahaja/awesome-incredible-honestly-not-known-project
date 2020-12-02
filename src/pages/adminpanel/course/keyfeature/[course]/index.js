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
import { useApplication } from "../../../../../stores";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
      keyfeature {
        _id
        order
        title
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
    keyfeaturecard: { marginTop: 15 },
  };
  const app = useApplication();
  const [add, setAdd] = useState(false);
  const [order, setOrder] = useState("");
  const [title, setTitle] = useState("");
  const [keyFeature, setKeyFeature] = useState(course.keyfeature);
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.keyfeature
      .add({
        order: order,
        title: title,
        course: course._id,
      })
      .then((result) => {
        setKeyFeature([
          ...keyFeature,
          {
            _id: result,
            order: order,
            title: title,
          },
        ]);
        setOrder("");
        setTitle("");
        setLoading(false);
      });
  }
  function deleteHandler(_id) {
    setLoading(true);
    app.keyfeature.delete(_id).then(() => {
      setKeyFeature(
        keyFeature.filter((item) => {
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
              {course.title}
            </Link>
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
          <Card.Header className="d-flex justify-content-between">
            <b>Add Key Feature</b>
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
                        placeholder="e.g. 200+ Hours Of Applied Learning"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Button
                  disabled={loading || order === "" || title === ""}
                  onClick={() => addHandler()}
                >
                  Add Key Feature
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>
        <Card style={styles.keyfeaturecard}>
          <Card.Header>
            <b>Key Feature List</b>
          </Card.Header>
          <ListGroup variant="flush">
            {SortArray(keyFeature, "order").map((item) => {
              return (
                <ListGroup.Item action key={item._id}>
                  <b>
                    {item.order}. {item.title}
                  </b>
                  {loading ? (
                    <div className="text-muted">Delete key feature</div>
                  ) : (
                    <div>
                      <a href="#!" onClick={() => deleteHandler(item._id)}>
                        Delete key feature
                      </a>
                    </div>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Container>
    </Fragment>
  );
}
