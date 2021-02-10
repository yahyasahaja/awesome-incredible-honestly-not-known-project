import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import SortArray from "sort-objects-array";
import Stringify from "stringify-object";
import Navbar from "../../../../../../../components/navbar";
import Fetch from "../../../../../../../libraries/fetch";
import { useUser } from "../../../../../../../stores/user";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      class {
        _id
        name
      }
      quiz {
        _id
        score
      }
    }
    quizById(_id: "` + ctx.params.quiz + `") {
      _id
      title
      question {
        order
        question
        answer
        a
        b
        c
        d
      }
    }
  }`).then(result => {
    /* eslint-enable */
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      quiz: result.data.quizById,
      progress: result.data.enrollmentById.quiz,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      quiz: results.quiz,
      progress: results.progress,
    },
  };
}

export default function Index({ enrollment, classdata, quiz, progress }) {
  const styles = {
    question: {
      textAlign: "justify",
      marginLeft: 25,
    },
  };
  const app = useUser();
  const [key, setKey] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyAnswer, setKeyAnswer] = useState(false);
  useEffect(() => {
    if (keyAnswer === false) {
      const tempKey = [];
      const tempAnswer = [];
      SortArray(quiz.question, "order").forEach((item) => {
        tempKey.push(item.answer);
        tempAnswer.push("");
      });
      setKey(tempKey);
      setAnswer(tempAnswer);
      setKeyAnswer(true);
    }
  }, [keyAnswer, quiz.question, key, answer]);
  function setAnswerHandler(idx, ans) {
    const temp = answer;
    temp[idx] = ans;
    setAnswer(temp);
    if (
      temp.filter((item) => {
        return item === "";
      }).length === 0
    ) {
      setReady(true);
    }
  }
  function submitHandler() {
    setLoading(true);
    let correct = 0;
    answer.forEach((item, index) => {
      if (item === key[index]) correct++;
    });
    const score = String(parseInt((correct / key.length) * 100));
    const temp = Stringify([...progress, { _id: quiz._id, score: score }], {
      singleQuotes: false,
    }).replaceAll("\n", "");
    app.enrollment
      .progressQuiz({
        _id: enrollment,
        quiz: temp,
      })
      .then(() => {
        Router.push("/user/learn/class/" + enrollment + "/quiz");
      });
  }
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header>
            <b>
              {classdata.name} - Quiz - {quiz.title}
            </b>
          </Card.Header>
          <Card.Body>
            {keyAnswer === true && (
              <Fragment>
                {SortArray(quiz.question, "order").map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <p style={{ position: "absolute" }}>{item.order}.</p>
                      <p style={styles.question}>{item.question}</p>
                      <p style={styles.question}>
                        <b>A.</b>
                        {" " + item.a}
                      </p>
                      <p style={styles.question}>
                        <b>B.</b>
                        {" " + item.b}
                      </p>
                      <p style={styles.question}>
                        <b>C.</b>
                        {" " + item.c}
                      </p>
                      <p style={styles.question}>
                        <b>D.</b>
                        {" " + item.d}
                      </p>
                      <Form.Group style={styles.question}>
                        <Form.Control
                          as="select"
                          disabled={loading}
                          onChange={(e) =>
                            setAnswerHandler(index, e.target.value)
                          }
                        >
                          <option value="" hidden>
                            Select Answer
                          </option>
                          <option value="a">A</option>
                          <option value="b">B</option>
                          <option value="c">C</option>
                          <option value="d">D</option>
                        </Form.Control>
                      </Form.Group>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
            <hr style={styles.question} />
            <Button
              disabled={loading || ready === false}
              style={styles.question}
              onClick={() => submitHandler()}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
        <br />
      </Container>
    </Fragment>
  );
}
