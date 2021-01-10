import Link from "next/link";
import React, { Fragment } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
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
          title
        }
      }
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      task: result.data.enrollmentById.class[0].task,
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
          {task.map((item) => {
            return (
              <Col xs={3} key={item._id}>
                <Card>
                  <Card.Body>
                    <h5>{item.title}</h5>
                    <h6>
                      <Link
                        href="/user/learn/class/[enrollment]/task/[task]"
                        as={
                          "/user/learn/class/" +
                          enrollment +
                          "/task/" +
                          item._id
                        }
                      >
                        Read Description
                      </Link>
                    </h6>
                    <hr />
                    <Button block>Submit Task</Button>
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
