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
import AdminPanel from "../../../../../../components/adminpanel";
import Fetch from "../../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
      course {
        _id
      }
      task {
        _id
        title
      }
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      classdata: result.data.classById,
    };
  });
  return {
    props: {
      classdata: results.classdata,
    },
  };
}

export default function Index({ classdata }) {
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
            <Link href="/adminpanel/class">Class</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]"
              as={"/adminpanel/class/manage/" + classdata._id}
            >
              {classdata.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]"
              as={"/adminpanel/class/manage/" + classdata._id}
            >
              Manage
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]/task"
              as={"/adminpanel/class/manage/" + classdata._id + "/task"}
            >
              Task
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Task List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() =>
                    Router.push(
                      "/adminpanel/class/manage/" + classdata._id + "/task/add"
                    )
                  }
                >
                  Add Task
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {classdata.task.length !== 0 && (
            <ListGroup variant="flush">
              {classdata.task.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.title}</b>
                    </div>
                    <small>
                      <Link
                        href="/adminpanel/class/manage/[class]/task/edit/[task]"
                        as={
                          "/adminpanel/class/manage/" +
                          classdata._id +
                          "/task/edit/" +
                          item._id
                        }
                      >
                        Edit this task
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
