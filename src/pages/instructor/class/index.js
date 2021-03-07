import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import Instructor from "../../../components/instructor";
import Fetch from "../../../libraries/fetch";
import { useInstructor } from "../../../stores/instructor";

export default function Index() {
  const app = useInstructor();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      return new Promise((resolve, reject) => {
        /* eslint-disable */
        Fetch(`{
          instructorByParam(_id:"` + app.session.data._id + `") {
            class {
              _id
              name
              course {
                type
                title
              }
              enrollment {
                status
              }
            }
          }
        }`).then((result) => {
          /* eslint-enable */
          const temp = [];
          result.data.instructorByParam.class.forEach((item) => {
            const student = item.enrollment.filter((filter) => {
              return filter.status === "2";
            });
            temp.push({
              _id: item._id,
              name: item.name,
              course: item.course[0].title,
              type: item.course[0].type,
              student: student,
            });
          });
          resolve(temp);
        });
      });
    }
    if (app.session.data._id === undefined) {
      Router.push("/instructor/login");
    } else {
      getData().then((result) => {
        setData(result);
        setLoading(false);
      });
    }
  }, [app.session.data._id]);
  return (
    <Fragment>
      <Instructor />
      <br />
      <Container>
        <Card>
          <Card.Header>
            <b>{loading ? "Loading..." : "Class List"}</b>
          </Card.Header>
          <ListGroup variant="flush">
            {data.map((item) => {
              return (
                <ListGroup.Item
                  action
                  key={item._id}
                  onClick={() => Router.push("/instructor/class/" + item._id)}
                >
                  <div style={{ marginBottom: -2 }}>
                    <b>
                      {item.name} / {item.course}
                    </b>
                  </div>
                  <div style={{ marginBottom: -4 }}>
                    {item.student.length} Students
                  </div>
                  <small>
                    {item.type === "postgraduate" ? "Post Graduate" : "Master"}{" "}
                    Course
                  </small>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Container>
    </Fragment>
  );
}
