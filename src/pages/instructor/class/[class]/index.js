import Router from "next/router";
import React, { Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import Instructor from "../../../../components/instructor";
import Fetch from "../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      name
      course {
        type
        title
        bab {
          materi {
            _id
          }
        }
        quiz {
          _id
        }
      }
      task {
        _id
      }
      enrollment {
        user {
          name
        }
        materi
        task {
          _id
        }
        quiz {
          _id
        }
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const classroom = result.data.classById;
    let totalmateri = 0;
    const totaltask = classroom.task.length;
    const totalquiz = classroom.course[0].quiz.length;
    classroom.course[0].bab.forEach((bab) => {
      totalmateri += bab.materi.length;
    });
    const student = [];
    classroom.enrollment.forEach((item) => {
      student.push({
        name: item.user[0].name,
        materi: parseInt(item.materi),
        task: item.task.length,
        quiz: item.quiz.length,
      });
    });
    return {
      classroom: {
        _id: ctx.params.class,
        class: classroom.name,
        course: classroom.course[0].title,
        type: classroom.course[0].type,
      },
      materi: totalmateri,
      task: totaltask,
      quiz: totalquiz,
      student: student,
    };
  });
  return {
    props: {
      classroom: results.classroom,
      materi: results.materi,
      task: results.task,
      quiz: results.quiz,
      student: results.student,
    },
  };
}

export default function Index({ classroom, materi, task, quiz, student }) {
  return (
    <Fragment>
      <Instructor />
      <br />
      <Container>
        <Card>
          <Card.Header>
            <b>{classroom.class} - Student List</b>
          </Card.Header>
          <Card.Body>
            <h5>
              {classroom.course} /{" "}
              {classroom.type === "postgraduate" ? "Post Graduate" : "Master"}{" "}
              Course
            </h5>
            <h5>Total Students : {student.length}</h5>
            <Button
              onClick={() =>
                Router.push("/instructor/class/" + classroom._id + "/module")
              }
            >
              Read Module
            </Button>
          </Card.Body>
          {student.length !== 0 && (
            <ListGroup variant="flush">
              {student.map((item) => {
                return (
                  <ListGroup.Item action key={item.name}>
                    <div style={{ marginBottom: 6 }}>
                      <b>{item.name}</b>
                    </div>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <ProgressBar
                          now={(item.materi / materi) * 100}
                          label={`Module ${(item.materi / materi) * 100}%`}
                        />
                      </Col>
                      <Col>
                        <ProgressBar
                          now={(item.task / task) * 100}
                          label={`Task ${(item.task / task) * 100}%`}
                        />
                      </Col>
                      <Col>
                        <ProgressBar
                          now={(item.quiz / quiz) * 100}
                          label={`Quiz ${(item.quiz / quiz) * 100}%`}
                        />
                      </Col>
                    </Row>
                    <ProgressBar
                      variant="success"
                      now={
                        ((item.materi + item.task + item.quiz) /
                          (materi + task + quiz)) *
                        100
                      }
                      label={`Overall ${
                        ((item.materi + item.task + item.quiz) /
                          (materi + task + quiz)) *
                        100
                      }%`}
                      style={{ marginBottom: 6 }}
                    />
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
