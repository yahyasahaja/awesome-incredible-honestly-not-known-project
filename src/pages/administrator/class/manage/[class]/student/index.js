import Router from "next/router";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Container,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import Administrator from "../../../../../../components/administrator";
import Fetch from "../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
      enrollment {
    	  _id
    	  user {
    	    name
    	    email
    	  }
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
  const app = useAdministrator();
  const [list, setList] = useState(classdata.enrollment);
  const [loading, setLoading] = useState(false);
  function removeHandler(param) {
    setLoading(true);
    app.user
      .update({
        _id: param,
        status: "1",
        class: "",
      })
      .then(() => {
        setList(
          list.filter((item) => {
            return item._id !== param;
          })
        );
        setLoading(false);
      });
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
            onClick={() => Router.push("/administrator/class")}
          >
            Class
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/class/manage/" + classdata._id)
            }
          >
            {classdata.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/class/manage/" + classdata._id)
            }
          >
            Manage
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/class/manage/" + classdata._id + "/student"
              )
            }
          >
            Student
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Student List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() =>
                    Router.push(
                      "/administrator/class/manage/" +
                        classdata._id +
                        "/student/add"
                    )
                  }
                >
                  Add Student
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {list.length !== 0 && (
            <ListGroup variant="flush">
              {list.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.user[0].name}</b>
                    </div>
                    <div>{item.user[0].email}</div>
                    <a
                      href="#!"
                      className={loading ? "text-muted" : ""}
                      onClick={() => removeHandler(item._id)}
                    >
                      Remove from class
                    </a>
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
