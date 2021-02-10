import Router from "next/router";
import React, { Fragment } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import SortArray from "sort-objects-array";
import Navbar from "../../../../../../components/navbar";
import Fetch from "../../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      class {
        _id
        name
        task {
          _id
          order
          title
        }
      }
      task {
        _id
      }
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
        task: result.data.enrollmentById.class[0].task,
      },
      task: result.data.enrollmentById.task,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      task: results.task,
    },
  };
}

export default function Index({ enrollment, classdata, task }) {
  function checkStatus(param) {
    const check = task.filter((item) => {
      return item._id === param;
    });
    if (check.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header style={{ borderBottom: "0px" }}>
            <b>{classdata.name} - Task</b>
          </Card.Header>
        </Card>
        <br />
        <Row>
          {SortArray(classdata.task, "order").map((item) => {
            return (
              <Col xs={3} key={item._id}>
                <Card>
                  <Card.Body>
                    <h5>{item.order + ". " + item.title}</h5>
                    <h6>Status : {checkStatus(item._id) ? "Done" : "-"}</h6>
                    <hr />
                    <Button
                      block
                      variant={checkStatus(item._id) ? "success" : "primary"}
                      onClick={() =>
                        Router.push(
                          "/user/learn/class/" +
                            enrollment +
                            "/task/" +
                            item._id
                        )
                      }
                    >
                      Read Task
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
}
