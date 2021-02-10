import Router from "next/router";
import React, { Fragment } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
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
      }
      course {
        quiz {
          _id
          order
          title
          question {
            _id
          }
        }
      }
      quiz {
        _id
        score
      }
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
        quiz: result.data.enrollmentById.course[0].quiz,
      },
      quiz: result.data.enrollmentById.quiz,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      quiz: results.quiz,
    },
  };
}

export default function Index({ enrollment, classdata, quiz }) {
  function checkStatus(param) {
    const check = quiz.filter((item) => {
      return item._id === param;
    });
    if (check.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  function getScore(param) {
    return quiz.filter((item) => {
      return item._id === param;
    })[0].score;
  }
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
          {SortArray(classdata.quiz, "order").map((item) => {
            return (
              <Col xs={3} key={item._id}>
                <Card>
                  <Card.Body>
                    <h5>{item.order + ". " + item.title}</h5>
                    <h6>{item.question.length} Questions</h6>
                    <h6>
                      Score : {checkStatus(item._id) ? getScore(item._id) : "-"}
                    </h6>
                    <hr />
                    <Button
                      block
                      variant={checkStatus(item._id) ? "success" : "primary"}
                      disabled={checkStatus(item._id)}
                      onClick={() =>
                        Router.push(
                          "/user/learn/class/" +
                            enrollment +
                            "/quiz/" +
                            item._id
                        )
                      }
                    >
                      Take Quiz
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
