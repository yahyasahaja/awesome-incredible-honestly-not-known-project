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
import AdminPanel from "../../../components/adminpanel";
import Fetch from "../../../libraries/fetch";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allClass {
      _id
      name
      course {
        _id
        type
        title
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const allClass = [];
    result.data.allClass.forEach((item) => allClass.unshift(item));
    return {
      allClass: allClass,
    };
  });
  return {
    props: {
      allClass: results.allClass,
    },
  };
}

export default function Index({ allClass }) {
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
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Class List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button onClick={() => Router.push("/adminpanel/class/add")}>
                  Add Class
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {allClass.length !== 0 && (
            <ListGroup variant="flush">
              {allClass.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>
                        {item.name} / {item.course[0].title}
                      </b>
                    </div>
                    <small className="text-muted">
                      Type :{" "}
                      {item.course[0].type === "postgraduate"
                        ? "Post Graduate"
                        : "Master"}
                    </small>
                    <br />
                    <small>
                      <Link
                        href="/adminpanel/class/edit/[class]"
                        as={"/adminpanel/class/edit/" + item._id}
                      >
                        Edit
                      </Link>
                      {" / "}
                      <Link
                        href="/adminpanel/class/manage/[class]"
                        as={"/adminpanel/class/manage/" + item._id}
                      >
                        Manage
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
