import Base64 from "base-64";
import Dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import AdminPanel from "../../../../../../../components/adminpanel";
import Fetch from "../../../../../../../libraries/fetch";
import { useApplication } from "../../../../../../../stores";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
      course {
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

export default function Index({ classdata }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useApplication();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.task.add({
      title: title,
      description: Base64.encode(description),
      class: classdata._id,
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
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]/task"
              as={"/adminpanel/class/manage/" + classdata._id + "/task"}
            >
              Task
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={styles.breadcrumb}>
            <Link
              href="/adminpanel/class/manage/[class]/task/add"
              as={"/adminpanel/class/manage/" + classdata._id + "/task/add"}
            >
              Add
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Task</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  disabled={loading}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Homework 1"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <QuillClientSide
                  theme="snow"
                  modules={quillmodules}
                  value={description}
                  onChange={setDescription}
                  placeholder="Write your description here..."
                  readOnly={loading}
                />
              </Form.Group>
              <hr />
              <Button
                disabled={loading || title === "" || description === ""}
                onClick={() => addHandler()}
              >
                Add Task
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
