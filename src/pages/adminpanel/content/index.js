import Link from "next/link";
import Router from "next/router";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Container,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import SortArray from "sort-objects-array";
import AdminPanel from "../../../components/adminpanel";
import Fetch from "../../../library/fetch";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allContent {
      _id
      order
      title
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      content: result.data.allContent,
    };
  });
  return {
    props: {
      content: results.content,
    },
  };
}

export default function Index({ content }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  return (
    <Fragment>
      <AdminPanel />
      <Container style={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel">Admin Panel</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link href="/adminpanel/content">Content</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Content List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button onClick={() => Router.push("/adminpanel/content/add")}>
                  Add Content
                </Button>
              </div>
              <div>
                <FormControl placeholder="Search..." />
              </div>
            </div>
          </Card.Body>
          {content.length !== 0 && (
            <ListGroup variant="flush">
              {SortArray(content, "order").map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>
                        {item.order}. {item.title}
                      </b>
                    </div>
                    <small>
                      <Link
                        href="/adminpanel/content/edit/[content]"
                        as={"/adminpanel/content/edit/" + item._id}
                      >
                        Click here to edit
                      </Link>
                    </small>
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
