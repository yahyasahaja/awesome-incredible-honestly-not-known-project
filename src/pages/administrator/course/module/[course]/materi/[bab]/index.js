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
import Administrator from "../../../../../../../components/administrator";
import Fetch from "../../../../../../../libraries/fetch";

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
      materi {
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
    };
    const bab = {
      _id: result.data.babById._id,
      name: result.data.babById.name,
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
                  "/materi/" +
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
                  "/materi/" +
                  bab._id
              )
            }
          >
            Materi
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Materi List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() =>
                    Router.push(
                      "/administrator/course/module/" +
                        course._id +
                        "/materi/" +
                        bab._id +
                        "/add"
                    )
                  }
                >
                  Add Materi
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {bab.materi.length !== 0 && (
            <ListGroup variant="flush">
              {SortArray(bab.materi, "order").map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.order + ". " + item.name}</b>
                    </div>
                    <small>
                      <Link
                        href="/administrator/course/module/[course]/materi/[bab]/edit/[materi]"
                        as={
                          "/administrator/course/module/" +
                          course._id +
                          "/materi/" +
                          bab._id +
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
