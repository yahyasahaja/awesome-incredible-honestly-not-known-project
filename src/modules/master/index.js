import React, { Fragment } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SortArray from "sort-objects-array";

class MasterClass {
  _id = "";
}

export const MasterStore = new MasterClass();

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
              <h5 style={styles.text}>
                Master&apos;s Program
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <h5 style={styles.text}>
                {data.course} Courses
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

function LearningPath({ data }) {
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
          {SortArray(data.learningpath, "order").map(
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
      <LearningPath data={data} />
    </Fragment>
  );
}
