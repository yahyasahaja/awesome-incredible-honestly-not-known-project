import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import Stringify from "stringify-object";
import { decode } from "universal-base64";
import Navbar from "../../../../../../../components/navbar";
import Fetch from "../../../../../../../libraries/fetch";
import { useUser } from "../../../../../../../stores/user";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      class {
        _id
        name
      }
      task {
        _id
      }
    }
    taskById(_id: "` + ctx.params.task + `") {
      _id
      title
      description
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      task: {
        ...result.data.taskById,
        description: decode(result.data.taskById.description),
      },
      progress: result.data.enrollmentById.task,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      task: results.task,
      progress: results.progress,
    },
  };
}

export default function Index({ enrollment, classdata, task, progress }) {
  const app = useUser();
  const [loading, setLoading] = useState(false);
  function checkProgress() {
    const check = progress.filter((item) => {
      return item._id === task._id;
    });
    if (check.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  function markAsDone() {
    setLoading(true);
    const temp = Stringify([...progress, { _id: task._id }], {
      singleQuotes: false,
    }).replaceAll("\n", "");
    app.enrollment
      .progressTask({
        _id: enrollment,
        task: temp,
      })
      .then(() => {
        Router.push("/user/learn/class/" + enrollment + "/task");
      });
  }
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header style={{ borderBottom: "0px" }}>
            <b>
              {classdata.name} - Task - {task.title}
            </b>
          </Card.Header>
        </Card>
        <br />
        <Row>
          <Col xs={3}>
            <Card>
              <Card.Header>
                <b>Action</b>
              </Card.Header>
              <Card.Body>
                <Button
                  block
                  disabled={checkProgress() || loading}
                  variant={checkProgress() ? "success" : "primary"}
                  onClick={() => markAsDone()}
                >
                  {checkProgress() ? "Done" : "Mark As Done"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={9}>
            <Card>
              <Card.Header>
                <b>Description</b>
              </Card.Header>
              <Card.Body>{ReactHtmlParser(task.description)}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
