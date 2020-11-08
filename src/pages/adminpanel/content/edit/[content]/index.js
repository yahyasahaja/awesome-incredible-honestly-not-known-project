import React, { Fragment, useState } from "react";
import { useApplication } from "../../../../../store";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AdminPanel from "../../../../../components/adminpanel";
import Fetch from "../../../../../library/fetch";
import Dynamic from "next/dynamic";
import Base64 from "base-64";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  const results = await Fetch(`{
    contentById(_id:"` + ctx.params.content + `") {
      _id
      order
      title
      content
    }
  }`).then(result => {
    return {
      content: {
        _id: result.data.contentById._id,
        order: result.data.contentById.order,
        title: result.data.contentById.title,
        content: Base64.decode(result.data.contentById.content),
      },
    };
  });
  return {
    props: {
      data: results.content,
    },
  };
}

const QuillClientSide = Dynamic(import("react-quill"), {
  ssr: false,
});
const quillmodules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "super" }, { script: "sub" }],
    [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["direction", { align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export default function Index({ data }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useApplication();
  const [order, setOrder] = useState(data.order);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [loading, setLoading] = useState(false);
  function saveHandler() {
    setLoading(true);
    app.content.update({
      _id: data._id,
      order: order,
      title: title,
      content: Base64.encode(content),
    });
  }
  function deleteHandler() {
    setLoading(true);
    app.content.delete(data._id);
  }
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
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/content/edit/[content]"
              as={"/adminpanel/content/edit/" + data._id}
            >
              Edit
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Body>
            <Form>
              <Row>
                <Col xs={2}>
                  <Form.Group>
                    <Form.Label>Order</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      disabled={loading}
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={10}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={title}
                      disabled={loading}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. What Is Simplilearn?"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <QuillClientSide
            theme="snow"
            modules={quillmodules}
            value={content}
            onChange={setContent}
            placeholder="Write your content here..."
            readOnly={loading}
          />
          <Card.Body>
            <Button
              disabled={loading || title === "" || content === ""}
              onClick={() => saveHandler()}
              style={{ marginRight: 10 }}
            >
              Save Changes
            </Button>
            <Button
              variant="danger"
              disabled={loading}
              onClick={() => deleteHandler()}
            >
              Delete Content
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
