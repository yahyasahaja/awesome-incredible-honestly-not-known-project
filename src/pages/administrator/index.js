import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import { Book, FileText, Grid, Users } from "react-feather";
import Administrator from "../../components/administrator";
import { useAdministrator } from "../../stores/administrator";

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

function AdministratorMenu() {
  const styles = {
    breadcrumb: { marginTop: -1.25 },
  };
  const iconsize = 40;
  return (
    <Fragment>
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
    </Fragment>
  );
}

function AdministratorLogin() {
  const app = useAdministrator();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  function loginHandler() {
    setError(false);
    app.session.login(password).catch(() => {
      setError(true);
    });
  }
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        width: "25%",
        position: "absolute",
        transform: "translate(-55%, -55%)",
      }}
    >
      <Form>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error === true && (
            <Form.Text className="text-danger">Incorrect password</Form.Text>
          )}
        </Form.Group>
        <Button block disabled={password === ""} onClick={() => loginHandler()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default function Index() {
  const app = useAdministrator();
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
  };
  return (
    <Fragment>
      <Administrator />
      <Container style={styles.container}>
        {app.session.isLogin === true && <AdministratorMenu />}
        {app.session.isLogin === false && <AdministratorLogin />}
      </Container>
    </Fragment>
  );
}
