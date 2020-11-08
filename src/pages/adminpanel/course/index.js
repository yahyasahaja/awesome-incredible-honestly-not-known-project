import React, { Fragment } from "react";
import { Breadcrumb, Button, Card, Container, FormControl } from "react-bootstrap";
import AdminPanel from "../../../components/adminpanel";
import Fetch from "../../../library/fetch";
import Router from "next/router";
import Link from "next/link";

export async function getServerSideProps() {
  const results = await Fetch(`{
    allCourse {
      _id
      type
      title
      description
    }
  }`).then(result => {
    return {
      course: result.data.allCourse
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
        </Breadcrumb>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button onClick={() => Router.push("/adminpanel/course/add")}>
                  Add Course
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
            <hr />
            {course.map((item, index) => {
              return (
                <Fragment key={item._id}>
                  <h6 style={{ marginBottom: 2 }}>{item.title}</h6>
                  <small className="text-muted">
                    Type :{" "}
                    {item.type === "postgraduate" ? "Post Graduate" : "Master"}
                  </small>
                  <br />
                  <small>
                    <Link
                      href="/adminpanel/course/keyfeature/[course]"
                      as={"/adminpanel/course/keyfeature/" + item._id}
                    >
                      Key Feature
                    </Link>
                    {" / "}
                    <Link
                      href="/adminpanel/course/learningpath/[course]"
                      as={"/adminpanel/course/learningpath/" + item._id}
                    >
                      Learning Path
                    </Link>
                    {" / "}
                    <Link
                      href="/adminpanel/course/edit/[course]"
                      as={"/adminpanel/course/edit/" + item._id}
                    >
                      Edit Course
                    </Link>
                  </small>
                  {index !== course.length - 1 && <hr />}
                </Fragment>
              );
            })}
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
