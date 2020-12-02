import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import AdminPanel from "../../../../../components/adminpanel";
import Fetch from "../../../../../libraries/fetch";
import { useApplication } from "../../../../../stores";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    allCourse {
      _id
      type
      title
    }
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
      course {
        _id
      }
      task {
        _id
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const allCourse = [];
    result.data.allCourse.forEach((item) => allCourse.unshift(item));
    return {
      allCourse: allCourse,
      classdata: result.data.classById,
    };
  });
  return {
    props: {
      allCourse: results.allCourse,
      classdata: results.classdata,
    },
  };
}

export default function Index({ allCourse, classdata }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useApplication();
  const [name, setName] = useState(classdata.name);
  const [course, setCourse] = useState(classdata.course[0]._id);
  const [loading, setLoading] = useState(false);
  function saveHandler() {
    setLoading(true);
    app.class.update({
      _id: classdata._id,
      name: name,
      course: course,
    });
  }
  function deleteHandler() {
    setLoading(true);
    app.class.delete(classdata._id);
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
            <Link
              href="/adminpanel/class/edit/[class]"
              as={"/adminpanel/class/edit/" + classdata._id}
            >
              {classdata.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/edit/[class]"
              as={"/adminpanel/class/edit/" + classdata._id}
            >
              Edit
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Edit Class</b>
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
              onClick={() => saveHandler()}
              style={{ marginRight: 10 }}
            >
              Save Changes
            </Button>
            <Button
              variant="danger"
              disabled={loading || classdata.task.length !== 0}
              onClick={() => deleteHandler()}
            >
              Delete Class
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}