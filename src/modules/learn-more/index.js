import React, { Fragment } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SortArray from "sort-objects-array";

function Intro({ data }) {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 27.5,
    },
  };
  return (
    <Container style={styles.container}>
      <h3>{data.title}</h3>
      <hr />
      <p>{data.description}</p>
      <Button variant="dark">Apply Now</Button>
    </Container>
  );
}

function Detail({ data }) {
  const styles = {
    container: {
      marginTop: 22.5,
      marginBottom: 22.5,
    },
    text: {
      marginBottom: 0,
      textAlign: "center",
    },
  };
  return (
    <Container style={styles.container}>
      <Row>
        <Col xs={4}>
          <Card>
            <Card.Body>
              {data.type === "postgraduate" && (
                <h5 style={styles.text}>
                  Post Graduate Program
                </h5>
              )}
              {data.type === "master" && (
                <h5 style={styles.text}>
                  Master Program
                </h5>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <h5 style={styles.text}>
                Course start on {data.start}
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <h5 style={styles.text}>
                Program duration {data.duration}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function LearningPath({ learningpath }) {
  const styles = {
    container: {
      marginTop: 22.5,
      marginBottom: 22.5,
    },
    cardheader: {
      marginBottom: 0,
    },
    cardbody: {
      marginRight: 27.5,
      marginBottom: -1,
    },
    description: {
      marginBottom: 2.5,
    },
  };
  return (
    <Container style={styles.container}>
      <Card>
        <Card.Header>
          <h6 style={styles.cardheader}>Learning Path</h6>
        </Card.Header>
        <ul className="timeline" style={styles.cardbody}>
          {SortArray(learningpath, "order").map(
            (item, index) => {
              return (
                <li key={index}>
                  <h6>{item.title}</h6>
                  <div style={styles.description}>{item.description}</div>
                </li>
              );
            }
          )}
        </ul>
      </Card>
    </Container>
  );
}

export default function Index({ data }) {
  const styles = {
    gray: {
      backgroundColor: "whitesmoke",
    },
  };
  return (
    <Fragment>
      <div style={styles.gray}>
        <Intro data={data} />
      </div>
      <Detail data={data} />
      <LearningPath learningpath={data.learningpath} />
    </Fragment>
  );
}
