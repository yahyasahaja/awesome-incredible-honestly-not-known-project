import React, { Fragment } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { CheckCircle } from "react-feather";
import Navbar from "../../components/navbar";
import Fetch from "../../library/fetch";
import SortArray from "sort-objects-array";

export async function getServerSideProps(context) {
  const data = await Fetch(`{
    courseById(_id:"` + context.params._id + `") {
      _id
      type
      title
      description
      learningpath {
        _id
        order
        title
        description
      }
      keyfeature {
        _id
        order
        title
      }
    }
  }`).then(result => {
    return result.data.courseById;
  })
  return {
    props: {
      data: data,
    },
  };
}

function Intro({ data }) {
  const styles = {
    container: {
      paddingTop: 15,
      paddingBottom: 20,
    },
    icon: {
      marginTop: -2.5,
      marginRight: 7.5,
    },
    button: {
      marginTop: 10,
    },
  };
  return (
    <Container style={styles.container}>
      <h3>{data.title}</h3>
      <h6>
        {data.type === "postgraduate"
          ? "Post Graduate Program"
          : "Master Program"}
      </h6>
      <hr />
      <p>{data.description}</p>
      {SortArray(data.keyfeature, "order").map(item => {
        return (
          <Fragment key={item._id}>
            <h6>
              <CheckCircle size={17.5} style={styles.icon} />
              {item.title}
            </h6>
          </Fragment>
        );
      })}
      <Button variant="dark" style={styles.button}>
        Apply Now
      </Button>
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
          {SortArray(learningpath, "order").map((item, index) => {
            return (
              <li key={index}>
                <h6>{item.title}</h6>
                <div style={styles.description}>{item.description}</div>
              </li>
            );
          })}
        </ul>
      </Card>
    </Container>
  );
}

export default function Index({ data }) {
  const backgroundColor = "#F9F9F9";
  return (
    <Fragment>
      <Navbar />
      <div style={{ backgroundColor: backgroundColor }}>
        <Intro data={data} />
      </div>
      <LearningPath learningpath={data.learningpath} />
    </Fragment>
  );
}
