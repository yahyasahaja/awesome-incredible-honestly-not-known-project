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
import SortArray from "sort-objects-array";
import AdminPanel from "../../../../../components/adminpanel";
import Fetch from "../../../../../library/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
      quiz {
        _id
        title
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const quiz = [];
    result.data.courseById.quiz.forEach((item) => quiz.unshift(item));
    const course = {
      _id: result.data.courseById._id,
      title: result.data.courseById.title,
      quiz: quiz,
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
              href="/adminpanel/course/quiz/[course]"
              as={"/adminpanel/course/quiz/" + course._id}
            >
              {course.title}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/course/quiz/[course]"
              as={"/adminpanel/course/quiz/" + course._id}
            >
              Quiz
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Quiz List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() =>
                    Router.push(
                      "/adminpanel/course/quiz/" + course._id + "/add"
                    )
                  }
                >
                  Add Quiz
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {course.quiz.length !== 0 && (
            <ListGroup variant="flush">
              {SortArray(course.quiz, "order").map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.title}</b>
                    </div>
                    <small>
                      <Link
                        href="/adminpanel/course/quiz/[course]/edit/[quiz]"
                        as={
                          "/adminpanel/course/quiz/" +
                          course._id +
                          "/edit/" +
                          item._id
                        }
                      >
                        Click here to edit
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
