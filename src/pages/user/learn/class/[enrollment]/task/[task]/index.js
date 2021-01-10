import React, { Fragment } from "react";
import { Card, Container } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { decode } from "universal-base64";
import Navbar from "../../../../../../../components/navbar";
import Fetch from "../../../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      class {
        _id
        name
      }
    }
    taskById(_id:"` + ctx.params.task + `") {
      _id
      title
      description
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      task: {
        _id: result.data.taskById._id,
        title: result.data.taskById.title,
        description: decode(result.data.taskById.description),
      },
    };
  });
  return {
    props: {
      classdata: results.class,
      task: results.task,
    },
  };
}

export default function Index({ classdata, task }) {
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header>
            <b>
              {classdata.name} - Task - {task.title}
            </b>
          </Card.Header>
          <Card.Body>{ReactHtmlParser(task.description)}</Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
