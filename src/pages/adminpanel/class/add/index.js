import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import AdminPanel from "../../../../components/adminpanel";
import Fetch from "../../../../libraries/fetch";
import { useApplication } from "../../../../stores";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allCourse {
      _id
      type
      title
    }
  }`).then(result => {
    /* eslint-enable */
    const allCourse = [];
    result.data.allCourse.forEach((item) => allCourse.unshift(item));
    return {
      allCourse: allCourse,
    };
  });
  return {
    props: {
      allCourse: results.allCourse,
    },
  };
}

export default function Index({ allCourse }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useApplication();
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.class.add({
      name: name,
      course: course,
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
            <Link href="/adminpanel/class">Class</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel/class/add">Add</Link>
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
            </Form>
            <hr />
            <Button
              disabled={loading || name === "" || course === ""}
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
