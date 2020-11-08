import React, { Fragment } from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { Book, FileText } from "react-feather";
import AdminPanel from "../../components/adminpanel";
import Link from "next/link";

function CardMenu({ title, href, link, icon }) {
  return (
    <Card>
      <Card.Body>
        <Row style={{ marginBottom: -2.5 }}>
          <Col xs={3}>{icon}</Col>
          <Col xs={9}>
            <h6>{title}</h6>
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
  const iconsize = 42;
  return (
    <Fragment>
      <AdminPanel />
      <Container style={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel">Admin Panel</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col xs={3}>
            <CardMenu
              title="Course"
              href="/adminpanel/course"
              link="Manage Course"
              icon={<Book size={iconsize} />}
            />
          </Col>
          <Col xs={3}>
            <CardMenu
              title="Content"
              href="/adminpanel/content"
              link="Manage Content"
              icon={<FileText size={iconsize} />}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
