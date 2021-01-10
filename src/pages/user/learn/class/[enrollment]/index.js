import Link from "next/link";
import React, { Fragment } from "react";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import { Edit, Layers, Users } from "react-feather";
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
        }
      }
      course {
        _id
        title
        description
      }
      materi
    }
  }`).then(result => {
    /* eslint-enable */
    let total = 0;
    result.data.enrollmentById.class[0].course[0].bab.forEach((bab) => {
      total = total + bab.materi.length;
    });
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      course: {
        _id: result.data.enrollmentById.course[0]._id,
        title: result.data.enrollmentById.course[0].title,
        description: result.data.enrollmentById.course[0].description,
      },
      progress: parseInt(result.data.enrollmentById.materi),
      total: total,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      course: results.course,
      progress: results.progress,
      total: results.total,
    },
  };
}

function CardMenu({ title, href, link, icon }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>{icon}</Col>
          <Col xs={10} style={{ paddingLeft: 25 }}>
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
  progress,
  total,
}) {
  const iconsize = 40;
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Row>
          <Col xs={9}>
            <Card>
              <Card.Header>
                <b>
                  {classdata.name} - {course.title}
                </b>
              </Card.Header>
              <Card.Body>
                {course.description}
                <hr />
                <ProgressBar
                  now={(progress / total) * 100}
                  label={`${(progress / total) * 100}%`}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
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
              link="Submit Task"
              icon={<Edit size={iconsize} />}
            />
            <br />
            <CardMenu
              title="Quiz"
              href={"/user/learn/class/" + enrollment + "/quiz"}
              link="Take Quiz"
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
