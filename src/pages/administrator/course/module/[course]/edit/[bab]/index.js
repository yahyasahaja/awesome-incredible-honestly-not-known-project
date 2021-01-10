import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import Administrator from "../../../../../../../components/administrator";
import Fetch from "../../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
    }
    babById(_id:"` + ctx.params.bab + `") {
      _id
      name
      order
      materi {
        _id
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const course = {
      _id: result.data.courseById._id,
      title: result.data.courseById.title,
    };
    const bab = {
      _id: result.data.babById._id,
      name: result.data.babById.name,
      order: result.data.babById.order,
      materi: result.data.babById.materi,
    };
    return {
      course: course,
      bab: bab,
    };
  });
  return {
    props: {
      course: results.course,
      bab: results.bab,
    },
  };
}

export default function Index({ course, bab }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [order, setOrder] = useState(bab.order);
  const [name, setName] = useState(bab.name);
  const [loading, setLoading] = useState(false);
  function saveHandler() {
    setLoading(true);
    app.bab
      .update({
        _id: bab._id,
        name: name,
        order: order,
      })
      .then(() => {
        Router.push("/administrator/course/module/" + course._id);
      });
  }
  function deleteHandler() {
    setLoading(true);
    app.bab.delete(bab._id).then(() => {
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
              Router.push(
                "/administrator/course/module/" +
                  course._id +
                  "/edit/" +
                  bab._id
              )
            }
          >
            {bab.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/course/module/" +
                  course._id +
                  "/edit/" +
                  bab._id
              )
            }
          >
            Edit
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Edit BAB</b>
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
                onClick={() => saveHandler()}
                style={{ marginRight: 10 }}
              >
                Save Changes
              </Button>
              <Button
                variant="danger"
                disabled={loading || bab.materi.length !== 0}
                onClick={() => deleteHandler()}
              >
                Delete BAB
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
