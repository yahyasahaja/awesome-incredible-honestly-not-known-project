import React, { Fragment, createContext, useContext } from "react";
import { observable } from "mobx";
import { useObserver } from "mobx-react-lite";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SortArray from "sort-objects-array";

class PostGraduateClass {
  @observable _id = "";
}

const PostGraduateStore = new PostGraduateClass();
const PostGraduateContext = createContext(PostGraduateStore);

export const usePostGraduate = () => {
  const context = useContext(PostGraduateContext);
  return context;
};

function Intro(props) {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 27.5,
    },
  };
  return useObserver(() => (
    <Container style={styles.container}>
      <h3>{props.data.title}</h3>
      <hr />
      <p>{props.data.description}</p>
      <Button variant="dark">Apply Now</Button>
    </Container>
  ));
}

function Detail(props) {
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
  return useObserver(() => (
    <Container style={styles.container}>
      <Row>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <h5 style={styles.text}>
                Post Graduate Program
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <h5 style={styles.text}>
                Course start on {props.data.start}
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <h5 style={styles.text}>
                Program duration {props.data.duration}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ));
}

function LearningPath(props) {
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
  return useObserver(() => (
    <Container style={styles.container}>
      <Card>
        <Card.Header>
          <h6 style={styles.cardheader}>Learning Path</h6>
        </Card.Header>
        <ul className="timeline" style={styles.cardbody}>
          {SortArray(props.data.learningpath, "order").map((item, index) => {
            return (
              <li key={index}>
                <h6>{item.title}</h6>
                <div style={styles.description}>{item.description}</div>
                <small>
                  <a href="#!">Preview Video</a>
                </small>
              </li>
            )}
          )}
        </ul>
      </Card>
    </Container>
  ));
}

export default function Index(props) {
  const styles = {
    gray: {
      backgroundColor: "whitesmoke",
    },
  };
  return useObserver(() => (
    <Fragment>
      <div style={styles.gray}>
        <Intro data={props.data} />
      </div>
      <Detail data={props.data} />
      <LearningPath data={props.data} />
    </Fragment>
  ));
}
