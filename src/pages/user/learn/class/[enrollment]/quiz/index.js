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
      }
      course {
        quiz {
          _id
          title
          question {
            _id
          }
        }
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const quiz = [];
    result.data.enrollmentById.course[0].quiz.forEach((item) => {
      quiz.unshift(item);
    });
    return {
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      quiz: quiz,
    };
  });
  return {
    props: {
      classdata: results.class,
      quiz: results.quiz,
    },
  };
}

export default function Index({ classdata, quiz }) {
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header style={{ borderBottom: "0px" }}>
            <b>{classdata.name} - Quiz</b>
          </Card.Header>
        </Card>
        <br />
        <Row>
          {quiz.map((item) => {
            return (
              <Col xs={3} key={item._id}>
                <Card>
                  <Card.Body>
                    <h5>{item.title}</h5>
                    <h6>{item.question.length} Questions</h6>
                    <h6>Score : -</h6>
                    <hr />
                    <Button block>Take Quiz</Button>
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
