import Router from "next/router";
import React, { Fragment, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import SortArray from "sort-objects-array";
import Administrator from "../../../../../../components/administrator";
import Fetch from "../../../../../../libraries/fetch";
import NewLine from "../../../../../../libraries/newline";
import { useAdministrator } from "../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    courseById(_id: "` + ctx.params.course + `") {
      _id
      title
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      course: result.data.courseById,
    };
  });
  return {
    props: {
      course: results.course,
    },
  };
}

export default function Index({ course }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [quizOrder, setQuizOrder] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [order, setOrder] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  function addHandler() {
    setLoading(true);
    app.quiz
      .add({
        order: quizOrder,
        title: quizTitle,
        course: course._id,
      })
      .then((result) => {
        if (list.length === 0) {
          Router.push("/administrator/course/quiz/" + course._id);
        } else {
          list.forEach((item, index) => {
            app.question
              .add({
                order: item.order,
                question: NewLine(item.question),
                answer: item.answer,
                a: item.a,
                b: item.b,
                c: item.c,
                d: item.d,
                quiz: result,
              })
              .then(() => {
                if (index === list.length - 1) {
                  Router.push("/administrator/course/quiz/" + course._id);
                }
              });
          });
        }
      });
  }
  function addQuestionHandler() {
    setList([
      ...list,
      {
        order: order,
        question: question,
        answer: answer,
        a: a,
        b: b,
        c: c,
        d: d,
      },
    ]);
    setOrder("");
    setQuestion("");
    setAnswer("");
    setA("");
    setB("");
    setC("");
    setD("");
  }
  function editQuestionHandler(param) {
    setOrder(param.order);
    setQuestion(param.question);
    setAnswer(param.answer);
    setA(param.a);
    setB(param.b);
    setC(param.c);
    setD(param.d);
    setList(
      list.filter((item) => {
        return item.question !== param.question;
      })
    );
  }
  function deleteQuestionHandler(param) {
    setList(
      list.filter((item) => {
        return item.question !== param;
      })
    );
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
              Router.push("/administrator/course/quiz/" + course._id)
            }
          >
            {course.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/quiz/" + course._id)
            }
          >
            Quiz
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/course/quiz/" + course._id + "/add")
            }
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Add Quiz</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h5>Quiz Data :</h5>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Order"
                  value={quizOrder}
                  onChange={(e) => setQuizOrder(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <hr />
              <h5>Question Data :</h5>
              {SortArray(list, "order").map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div style={{ position: "absolute" }}>{item.order}.</div>
                    <div style={{ textAlign: "justify", marginLeft: 20 }}>
                      {item.question}
                    </div>
                    <div style={{ marginLeft: 15 }}>
                      Answer: <b>{item.answer.toUpperCase()}</b> /{" "}
                      <a href="#!" onClick={() => editQuestionHandler(item)}>
                        Edit
                      </a>{" "}
                      /{" "}
                      <a
                        href="#!"
                        onClick={() => deleteQuestionHandler(item.question)}
                      >
                        Delete
                      </a>
                      <Row style={{ marginBottom: 10 }}>
                        <Col>
                          <div>
                            <div style={{ position: "absolute" }}>
                              <b>A.</b>
                            </div>
                            <div
                              style={{ textAlign: "justify", marginLeft: 20 }}
                            >
                              {item.a}
                            </div>
                          </div>
                          <div>
                            <div style={{ position: "absolute" }}>
                              <b>C.</b>
                            </div>
                            <div
                              style={{ textAlign: "justify", marginLeft: 20 }}
                            >
                              {item.c}
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <div style={{ position: "absolute" }}>
                              <b>B.</b>
                            </div>
                            <div
                              style={{ textAlign: "justify", marginLeft: 20 }}
                            >
                              {item.b}
                            </div>
                          </div>
                          <div>
                            <div style={{ position: "absolute" }}>
                              <b>D.</b>
                            </div>
                            <div
                              style={{ textAlign: "justify", marginLeft: 20 }}
                            >
                              {item.d}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Fragment>
                );
              })}
              <Form.Group style={{ marginTop: 15 }}>
                <Form.Control
                  type="number"
                  min={1}
                  disabled={loading}
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="Order"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={5}
                  disabled={loading}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Question"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                >
                  <option value="" hidden>
                    Answer
                  </option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </Form.Control>
              </Form.Group>
              <Row style={{ marginBottom: -10 }}>
                <Col>
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>A</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        value={a}
                        disabled={loading}
                        onChange={(e) => setA(e.target.value)}
                        placeholder="Multiple choice answer..."
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>C</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        value={c}
                        disabled={loading}
                        onChange={(e) => setC(e.target.value)}
                        placeholder="Multiple choice answer..."
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>B</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        value={b}
                        disabled={loading}
                        onChange={(e) => setB(e.target.value)}
                        placeholder="Multiple choice answer..."
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>D</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        value={d}
                        disabled={loading}
                        onChange={(e) => setD(e.target.value)}
                        placeholder="Multiple choice answer..."
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Button
                variant="info"
                disabled={
                  loading ||
                  order === "" ||
                  question === "" ||
                  answer === "" ||
                  a === "" ||
                  b === "" ||
                  c === "" ||
                  d === ""
                }
                onClick={() => addQuestionHandler()}
                style={{ marginRight: 10 }}
              >
                Add Question
              </Button>
              <Button
                disabled={loading || quizOrder === "" || quizTitle === ""}
                onClick={() => addHandler()}
              >
                Add Quiz
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}
