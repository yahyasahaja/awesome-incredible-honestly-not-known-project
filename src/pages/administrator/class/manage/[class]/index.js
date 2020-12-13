import Link from "next/link";
import Router from "next/router";
import React, { Fragment } from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Edit, Users } from "react-feather";
import Administrator from "../../../../../components/administrator";
import Fetch from "../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
      course {
        _id
      }
      task {
        _id
      }
      enrollment {
        _id
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

function CardMenu({ title, href, as, link, icon }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>{icon}</Col>
          <Col xs={10} style={{ paddingLeft: 25 }}>
            <div>
              <b>{title}</b>
            </div>
            <Link href={href} as={as}>
              {link}
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function Index({ classdata }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const iconsize = 40;
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
        </Breadcrumb>
        <Row>
          <Col xs={9}>
            <Card>
              <Card.Header>
                <b>Class Activity</b>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <CardMenu
              title={classdata.task.length + " Task"}
              href="/administrator/class/manage/[class]/task"
              as={"/administrator/class/manage/" + classdata._id + "/task"}
              link="Manage Task"
              icon={<Edit size={iconsize} />}
            />
            <br />
            <CardMenu
              title={classdata.enrollment.length + " Student"}
              href="/administrator/class/manage/[class]/student"
              as={"/administrator/class/manage/" + classdata._id + "/student"}
              link="Manage Student"
              icon={<Users size={iconsize} />}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
