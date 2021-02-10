import Link from "next/link";
import React, { Fragment } from "react";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import { Edit, Layers, User, Users } from "react-feather";
import Navbar from "../../../../../components/navbar";
import Fetch from "../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      class {
        _id
        name
        course {
          bab {
            materi {
              _id
            }
          }
          quiz {
            _id
          }
        }
        instructor {
          name
          email
        }
        task {
          _id
        }
      }
      course {
        _id
        title
        description
      }
      materi
      task {
        _id
      }
      quiz {
        _id
      }
    }
  }`).then(result => {
    /* eslint-enable */
    let materitotal = 0;
    result.data.enrollmentById.class[0].course[0].bab.forEach((bab) => {
      materitotal = materitotal + bab.materi.length;
    });
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
        instructor: {
          name: result.data.enrollmentById.class[0].instructor[0].name,
          email: result.data.enrollmentById.class[0].instructor[0].email,
        },
      },
      course: {
        _id: result.data.enrollmentById.course[0]._id,
        title: result.data.enrollmentById.course[0].title,
        description: result.data.enrollmentById.course[0].description,
      },
      materiprogress: parseInt(result.data.enrollmentById.materi),
      taskprogress: result.data.enrollmentById.task.length,
      quizprogress: result.data.enrollmentById.quiz.length,
      materitotal: materitotal,
      tasktotal: result.data.enrollmentById.class[0].task.length,
      quiztotal: result.data.enrollmentById.class[0].course[0].quiz.length,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      course: results.course,
      materiprogress: results.materiprogress,
      taskprogress: results.taskprogress,
      quizprogress: results.quizprogress,
      materitotal: results.materitotal,
      tasktotal: results.tasktotal,
      quiztotal: results.quiztotal,
    },
  };
}

function CardMenu({ title, href, link, icon }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>{icon}</Col>
          <Col xs={10} style={{ paddingLeft: 14 }}>
            <div>
              <b>{title}</b>
            </div>
            <Link href={href}>{link}</Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function Index({
  enrollment,
  classdata,
  course,
  materiprogress,
  taskprogress,
  quizprogress,
  materitotal,
  tasktotal,
  quiztotal,
}) {
  const iconsize = 40;
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Row>
          <Col xs={8}>
            <Card>
              <Card.Header>
                <b>
                  {classdata.name} - {course.title}
                </b>
              </Card.Header>
              <Card.Body>
                <div style={{ marginBottom: 15 }}>{course.description}</div>
                <ProgressBar
                  now={(materiprogress / materitotal) * 100}
                  label={`Module ${(materiprogress / materitotal) * 100}%`}
                  style={{ marginBottom: 15 }}
                />
                <ProgressBar
                  now={(taskprogress / tasktotal) * 100}
                  label={`Task ${(taskprogress / tasktotal) * 100}%`}
                  style={{ marginBottom: 15 }}
                />
                <ProgressBar
                  now={(quizprogress / quiztotal) * 100}
                  label={`Quiz ${(quizprogress / quiztotal) * 100}%`}
                  style={{ marginBottom: 15 }}
                />
                <ProgressBar
                  variant="success"
                  now={
                    ((materiprogress + taskprogress + quizprogress) /
                      (materitotal + tasktotal + quiztotal)) *
                    100
                  }
                  label={`Overall ${
                    ((materiprogress + taskprogress + quizprogress) /
                      (materitotal + tasktotal + quiztotal)) *
                    100
                  }%`}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={2}>
                    <User size={iconsize} />
                  </Col>
                  <Col xs={10} style={{ paddingLeft: 12 }}>
                    <div>
                      <b>{classdata.instructor.name}</b>
                    </div>
                    <div>{classdata.instructor.email}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />
            <CardMenu
              title="Module"
              href={"/user/learn/class/" + enrollment + "/module"}
              link="Learn Modules"
              icon={<Layers size={iconsize} />}
            />
            <br />
            <CardMenu
              title="Task"
              href={"/user/learn/class/" + enrollment + "/task"}
              link="See All Tasks"
              icon={<Edit size={iconsize} />}
            />
            <br />
            <CardMenu
              title="Quiz"
              href={"/user/learn/class/" + enrollment + "/quiz"}
              link="See All Quizzes"
              icon={<Edit size={iconsize} />}
            />
            <br />
            <CardMenu
              title="Student"
              href={"/user/learn/class/" + enrollment + "/student"}
              link="See All Students"
              icon={<Users size={iconsize} />}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
