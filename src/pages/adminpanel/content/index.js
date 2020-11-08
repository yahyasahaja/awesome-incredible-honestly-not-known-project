import React, { Fragment } from "react";
import { Breadcrumb, Button, Card, Container, FormControl } from "react-bootstrap";
import AdminPanel from "../../../components/adminpanel";
import Fetch from "../../../library/fetch";
import SortArray from "sort-objects-array";
import Router from "next/router";
import Link from "next/link";

export async function getServerSideProps() {
  const results = await Fetch(`{
    allContent {
      _id
      order
      title
    }
  }`).then(result => {
    return {
      content: result.data.allContent
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
            <hr />
            {SortArray(content, "order").map((item, index) => {
              return (
                <Fragment key={item._id}>
                  <h6 style={{ marginBottom: 2 }}>
                    {item.order}. {item.title}
                  </h6>
                  <small>
                    <Link
                      href="/adminpanel/content/edit/[content]"
                      as={"/adminpanel/content/edit/" + item._id}
                    >
                      Click here to edit
                    </Link>
                  </small>
                  {index !== content.length - 1 && <hr />}
                </Fragment>
              );
            })}
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
