import Base64 from "base-64";
import Dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import AdminPanel from "../../../../components/adminpanel";
import { useApplication } from "../../../../stores";

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

export default function Index() {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useApplication();
  const [order, setOrder] = useState("1");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.content.add({
      order: order,
      title: title,
      content: Base64.encode(content),
    });
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
            <Link href="/adminpanel/content/add">Add</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Content</b>
          </Card.Header>
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
              <Form.Group>
                <Form.Label>Content</Form.Label>
                <QuillClientSide
                  theme="snow"
                  modules={quillmodules}
                  value={content}
                  onChange={setContent}
                  placeholder="Write your content here..."
                  readOnly={loading}
                />
              </Form.Group>
              <hr />
              <Button
                disabled={loading || title === "" || content === ""}
                onClick={() => addHandler()}
              >
                Add Content
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
