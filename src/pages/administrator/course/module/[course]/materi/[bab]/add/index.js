import Dynamic from "next/dynamic";
import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Button, Card, Container, Form } from "react-bootstrap";
import { encode } from "universal-base64";
import Administrator from "../../../../../../../../components/administrator";
import Fetch from "../../../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../../../stores/administrator";

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

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
    }
    babById(_id:"` + ctx.params.bab + `") {
      _id
      name
    }
  }`).then(result => {
    /* eslint-enable */
    const course = {
      _id: result.data.courseById._id,
      title: result.data.courseById.title,
    };
    const bab = {
      _id: result.data.babById._id,
      name: result.data.babById.name,
    };
    return {
      course: course,
      bab: bab,
    };
  });
  return {
    props: {
      course: results.course,
      bab: results.bab,
    },
  };
}

export default function Index({ course, bab }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [order, setOrder] = useState("1");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.materi
      .add({
        name: name,
        order: order,
        content: encode(content),
        bab: bab._id,
      })
      .then(() => {
        Router.push(
          "/administrator/course/module/" + course._id + "/materi/" + bab._id
        );
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
            onClick={() => Router.push("/administrator/course")}
          >
            Course
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/module/" + course._id)
            }
          >
            {course.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/module/" + course._id)
            }
          >
            Module
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/course/module/" +
                  course._id +
                  "/materi/" +
                  bab._id
              )
            }
          >
            {bab.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/course/module/" +
                  course._id +
                  "/materi/" +
                  bab._id
              )
            }
          >
            Materi
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/course/module/" +
                  course._id +
                  "/materi/" +
                  bab._id +
                  "/add"
              )
            }
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Materi</b>
          </Card.Header>
          <Card.Body>
            <Form>
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
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. What Is Lambda Solusi Informatika?"
                />
              </Form.Group>
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
                disabled={loading || name === "" || content === ""}
                onClick={() => addHandler()}
              >
                Add Materi
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
