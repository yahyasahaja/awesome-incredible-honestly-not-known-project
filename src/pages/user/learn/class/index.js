import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import Navbar from "../../../../components/navbar";
import Fetch from "../../../../libraries/fetch";
import { useUser } from "../../../../stores/user";
import LearnMenu from "../";

export default function Index() {
  const app = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      return new Promise((resolve, reject) => {
        if (app.session.data._id === undefined) {
          resolve();
          Router.push("/user/login");
        } else {
          /* eslint-disable */
          Fetch(`{
            userByParam(_id:"` + app.session.data._id + `") {
              enrollment {
                _id
                status
                class {
                  _id
                  name
                }
                course {
                  type
                  title
                }
              }
            }
          }`).then((result) => {
            /* eslint-enable */
            const temp = [];
            result.data.userByParam.enrollment.forEach((item) => {
              if (item.status === "2") temp.unshift(item);
            });
            resolve(temp);
          });
        }
      });
    }
    getData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [app.session.data._id]);
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <LearnMenu activeKey="class" />
        <Card
          style={{
            borderTop: "0px",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <Card.Header>
            <b>{loading ? "Loading..." : "Class List"}</b>
          </Card.Header>
          <ListGroup variant="flush">
            {data.map((item) => {
              return (
                <ListGroup.Item
                  action
                  key={item._id}
                  onClick={() => Router.push("/user/learn/class/" + item._id)}
                >
                  <div>
                    <b>{item.class[0].name}</b>
                    {" " + item.course[0].title}
                  </div>
                  <div>
                    {item.course[0].type === "postgraduate"
                      ? "Post Graduate"
                      : "Master"}{" "}
                    Course
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Container>
    </Fragment>
  );
}
