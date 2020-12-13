import Link from "next/link";
import Router from "next/router";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Container,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import Administrator from "../../../components/administrator";
import Fetch from "../../../libraries/fetch";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allCourse {
      _id
      type
      title
      description
    }
  }`).then(result => {
    /* eslint-enable */
    const course = [];
    result.data.allCourse.forEach((item) => course.unshift(item));
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
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Course List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() => Router.push("/administrator/course/add")}
                >
                  Add Course
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {course.length !== 0 && (
            <ListGroup variant="flush">
              {course.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.title}</b>
                    </div>
                    <small className="text-muted">
                      Type :{" "}
                      {item.type === "postgraduate"
                        ? "Post Graduate"
                        : "Master"}
                    </small>
                    <br />
                    <small>
                      <Link
                        href="/administrator/course/edit/[course]"
                        as={"/administrator/course/edit/" + item._id}
                      >
                        Edit Course
                      </Link>
                      {" / "}
                      <Link
                        href="/administrator/course/keyfeature/[course]"
                        as={"/administrator/course/keyfeature/" + item._id}
                      >
                        Key Feature
                      </Link>
                      {" / "}
                      <Link
                        href="/administrator/course/learningpath/[course]"
                        as={"/administrator/course/learningpath/" + item._id}
                      >
                        Learning Path
                      </Link>
                      {" / "}
                      <Link
                        href="/administrator/course/quiz/[course]"
                        as={"/administrator/course/quiz/" + item._id}
                      >
                        Quiz
                      </Link>
                    </small>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Card>
      </Container>
    </Fragment>
  );
}
