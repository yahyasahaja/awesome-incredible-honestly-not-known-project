import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import Administrator from "../../../../components/administrator";
import Fetch from "../../../../libraries/fetch";
import { useAdministrator } from "../../../../stores/administrator";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allCourse {
      _id
      type
      title
    }
    allInstructor {
      _id
      name
    }
  }`).then(result => {
    /* eslint-enable */
    const allCourse = [];
    const allInstructor = [];
    result.data.allCourse.forEach((item) => allCourse.unshift(item));
    result.data.allInstructor.forEach((item) => allInstructor.unshift(item));
    return {
      allCourse: allCourse,
      allInstructor: allInstructor,
    };
  });
  return {
    props: {
      allCourse: results.allCourse,
      allInstructor: results.allInstructor,
    },
  };
}

export default function Index({ allCourse, allInstructor }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.class.add({
      name: name,
      course: course,
      instructor: instructor,
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
            onClick={() => Router.push("/administrator/class")}
          >
            Class
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() => Router.push("/administrator/class/add")}
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Class</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kelas RPL A"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Control
                  as="select"
                  disabled={loading}
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="" hidden>
                    Select Course
                  </option>
                  {allCourse.map((item) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.type === "postgraduate"
                          ? "Post Graduate"
                          : "Master"}{" "}
                        - {item.title}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Instructor</Form.Label>
                <Form.Control
                  as="select"
                  disabled={loading}
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                >
                  <option value="" hidden>
                    Select Instructor
                  </option>
                  {allInstructor.map((item) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form>
            <hr />
            <Button
              disabled={
                loading || name === "" || course === "" || instructor === ""
              }
              onClick={() => addHandler()}
            >
              Add Class
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
