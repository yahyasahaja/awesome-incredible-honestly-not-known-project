import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import Administrator from "../../../../../../components/administrator";
import Fetch from "../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
    }
  }`).then(result => {
    /* eslint-enable */
    const course = {
      _id: result.data.courseById._id,
      title: result.data.courseById.title,
    };
    return {
      course: course,
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
  const [order, setOrder] = useState("1");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.bab
      .add({
        name: name,
        order: order,
        course: course._id,
      })
      .then(() => {
        Router.push("/administrator/course/module/" + course._id);
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
            onClick={() =>
              Router.push("/administrator/course/module/" + course._id)
            }
          >
            {course.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/module/" + course._id)
            }
          >
            Module
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/module/" + course._id + "/add")
            }
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add BAB</b>
          </Card.Header>
          <Card.Body>
            <Form>
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
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. BAB I"
                />
              </Form.Group>
              <hr />
              <Button
                disabled={loading || name === ""}
                onClick={() => addHandler()}
              >
                Add BAB
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
