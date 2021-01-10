import React, { Fragment } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import Navbar from "../../../../../../components/navbar";
import Fetch from "../../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      class {
        _id
        name
        enrollment {
          materi
          user {
            _id
            name
          }
        }
        course {
          bab {
            _id
            name
            order
            materi {
              _id
              name
              order
            }
          }
        }
      }
    }
  }`).then(result => {
    /* eslint-enable */
    let total = 0;
    result.data.enrollmentById.class[0].course[0].bab.forEach((bab) => {
      total = total + bab.materi.length;
    });
    const student = [];
    result.data.enrollmentById.class[0].enrollment.forEach((item) => {
      student.unshift({
        _id: item.user[0]._id,
        name: item.user[0].name,
        progress: (parseInt(item.materi) / total) * 100,
      });
    });

    return {
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      student: student,
    };
  });
  return {
    props: {
      classdata: results.class,
      student: results.student,
    },
  };
}

export default function Index({ classdata, student }) {
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header>
            <b>{classdata.name} - Student</b>
          </Card.Header>
          {student.length !== 0 && (
            <ListGroup variant="flush">
              {student.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.name}</b>
                    </div>
                    <div>Progress {item.progress}%</div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Card>
      </Container>
    </Fragment>
  );
}
