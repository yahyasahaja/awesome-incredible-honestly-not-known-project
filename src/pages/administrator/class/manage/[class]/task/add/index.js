import Dynamic from "next/dynamic";
import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import { encode } from "universal-base64";
import Administrator from "../../../../../../../components/administrator";
import Fetch from "../../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
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
  const app = useAdministrator();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.task.add({
      title: title,
      description: encode(description),
      class: classdata._id,
    });
  }
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
            onClick={() => Router.push("/administrator/class")}
          >
            Class
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/class/manage/" + classdata._id)
            }
          >
            {classdata.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/class/manage/" + classdata._id)
            }
          >
            Manage
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/class/manage/" + classdata._id + "/task"
              )
            }
          >
            Task
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/class/manage/" + classdata._id + "/task/add"
              )
            }
          >
            Add
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
