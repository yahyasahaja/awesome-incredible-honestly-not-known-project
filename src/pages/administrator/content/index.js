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
import Administrator from "../../../components/administrator";
import Fetch from "../../../libraries/fetch";

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
            onClick={() => Router.push("/administrator/content")}
          >
            Content
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Content List</b>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() => Router.push("/administrator/content/add")}
                >
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
                        href="/administrator/content/edit/[content]"
                        as={"/administrator/content/edit/" + item._id}
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
