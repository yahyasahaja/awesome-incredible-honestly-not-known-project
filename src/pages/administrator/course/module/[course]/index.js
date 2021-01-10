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
import Administrator from "../../../../../components/administrator";
import Fetch from "../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
      bab {
        _id
        name
        order
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const course = {
      _id: result.data.courseById._id,
      title: result.data.courseById.title,
      bab: result.data.courseById.bab,
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
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>BAB List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() =>
                    Router.push(
                      "/administrator/course/module/" + course._id + "/add"
                    )
                  }
                >
                  Add BAB
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {course.bab.length !== 0 && (
            <ListGroup variant="flush">
              {SortArray(course.bab, "order").map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.order + ". " + item.name}</b>
                    </div>
                    <small>
                      <Link
                        href="/administrator/course/module/[course]/edit/[bab]"
                        as={
                          "/administrator/course/module/" +
                          course._id +
                          "/edit/" +
                          item._id
                        }
                      >
                        Edit
                      </Link>
                      {" / "}
                      <Link
                        href="/administrator/course/module/[course]/materi/[bab]"
                        as={
                          "/administrator/course/module/" +
                          course._id +
                          "/materi/" +
                          item._id
                        }
                      >
                        Materi
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
