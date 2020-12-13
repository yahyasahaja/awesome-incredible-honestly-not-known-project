import Base64 from "base-64";
import Dynamic from "next/dynamic";
import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import Administrator from "../../../../../../../../components/administrator";
import Fetch from "../../../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
    }
    taskById(_id:"` + ctx.params.task + `") {
      _id
      title
      description
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      classdata: result.data.classById,
      task: {
        _id: result.data.taskById._id,
        title: result.data.taskById.title,
        description: Base64.decode(result.data.taskById.description),
      },
    };
  });
  return {
    props: {
      classdata: results.classdata,
      task: results.task,
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

export default function Index({ classdata, task }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);
  function saveHandler() {
    setLoading(true);
    app.task.update(
      {
        _id: task._id,
        title: title,
        description: Base64.encode(description),
      },
      classdata._id
    );
  }
  function deleteHandler() {
    setLoading(true);
    app.task.delete(task._id, classdata._id);
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
                "/administrator/class/manage/" +
                  classdata._id +
                  "/task/edit/" +
                  task._id
              )
            }
          >
            {task.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/class/manage/" +
                  classdata._id +
                  "/task/edit/" +
                  task._id
              )
            }
          >
            Edit
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Edit Task</b>
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
                Delete Task
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
