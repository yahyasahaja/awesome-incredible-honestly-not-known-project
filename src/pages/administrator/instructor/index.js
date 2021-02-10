import Router from "next/router";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Container,
  Card,
  Button,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import Administrator from "../../../components/administrator";
import Fetch from "../../../libraries/fetch";
import { useAdministrator } from "../../../stores/administrator";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allInstructor {
      _id
      name
      email
      class {
        _id
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const allInstructor = [];
    result.data.allInstructor.forEach((item) => allInstructor.unshift(item));
    return {
      allInstructor: allInstructor,
    };
  });
  return {
    props: {
      allInstructor: results.allInstructor,
    },
  };
}

export default function Index({ allInstructor }) {
  const app = useAdministrator();
  const [list, setList] = useState(allInstructor);
  const [loading, setLoading] = useState(false);
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  function updateHandler(param) {
    setLoading(true);
    app.instructor
      .update({
        ...param,
        password: "1234",
      })
      .then(() => {
        setLoading(false);
      });
  }
  function deleteHandler(param) {
    if (param.class.length === 0) {
      setLoading(true);
      app.instructor.delete(param).then(() => {
        setList(
          list.filter((item) => {
            return item._id !== param._id;
          })
        );
        setLoading(false);
      });
    }
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
            onClick={() => Router.push("/administrator/instructor")}
          >
            Instructor
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Manage Instructor</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() => Router.push("/administrator/instructor/add")}
                >
                  Add Instructor
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {allInstructor.length !== 0 && (
            <ListGroup variant="flush">
              {list.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.name}</b>
                    </div>
                    <div>{item.email}</div>
                    <small className="text-muted">
                      {item.class.length} Class Registered /{" "}
                      <a
                        href="#!"
                        style={loading ? { color: "gainsboro" } : {}}
                        onClick={() => updateHandler(item)}
                      >
                        Reset Password
                      </a>{" "}
                      /{" "}
                      <a
                        href="#!"
                        style={
                          loading
                            ? { color: "dimgray" }
                            : item.class.length !== 0
                            ? { color: "dimgray" }
                            : {}
                        }
                        onClick={() => deleteHandler(item)}
                      >
                        Delete Instructor
                      </a>
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
