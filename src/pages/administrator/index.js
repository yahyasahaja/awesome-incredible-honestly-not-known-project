import Link from "next/link";
import Router from "next/router";
import React, { Fragment } from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Book, FileText, Grid, Users } from "react-feather";
import Administrator from "../../components/administrator";

function CardMenu({ title, href, link, icon }) {
  return (
    <Card style={{ marginBottom: 15 }}>
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

export default function Index() {
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
        </Breadcrumb>
        <Row>
          <Col xs={3}>
            <CardMenu
              title="Content"
              href="/administrator/content"
              link="Manage Content"
              icon={<FileText size={iconsize} />}
            />
          </Col>
          <Col xs={3}>
            <CardMenu
              title="Course"
              href="/administrator/course"
              link="Manage Course"
              icon={<Book size={iconsize} />}
            />
          </Col>
          <Col xs={3}>
            <CardMenu
              title="Class"
              href="/administrator/class"
              link="Manage Class"
              icon={<Grid size={iconsize} />}
            />
          </Col>
          <Col xs={3}>
            <CardMenu
              title="Instructor"
              href="/administrator/instructor"
              link="Manage Instructor"
              icon={<Users size={iconsize} />}
            />
          </Col>
          <Col xs={3}>
            <CardMenu
              title="User"
              href="/administrator/user"
              link="Manage User"
              icon={<Users size={iconsize} />}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
