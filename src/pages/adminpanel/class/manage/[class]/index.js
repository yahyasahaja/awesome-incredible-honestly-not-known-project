import Link from "next/link";
import React, { Fragment } from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Edit } from "react-feather";
import AdminPanel from "../../../../../components/adminpanel";
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
      <AdminPanel />
      <Container style={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel">Admin Panel</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel/class">Class</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]"
              as={"/adminpanel/class/manage/" + classdata._id}
            >
              {classdata.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]"
              as={"/adminpanel/class/manage/" + classdata._id}
            >
              Manage
            </Link>
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
              href="/adminpanel/class/manage/[class]/task"
              as={"/adminpanel/class/manage/" + classdata._id + "/task"}
              link="Manage Task"
              icon={<Edit size={iconsize} />}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
