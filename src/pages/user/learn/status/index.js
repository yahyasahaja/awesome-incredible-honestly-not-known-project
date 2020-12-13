import Router from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { AlertCircle, CheckCircle, Clock } from "react-feather";
import Navbar from "../../../../components/navbar";
import Fetch from "../../../../libraries/fetch";
import { useUser } from "../../../../stores/user";
import LearnMenu from "../";

export default function Index() {
  const styles = {
    statusspan: {
      marginLeft: 10,
      marginRight: 10,
      fontWeight: 750,
    },
  };
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
              temp.unshift(item);
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
        <LearnMenu activeKey="status" />
        <Card
          style={{
            borderTop: "0px",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <Card.Header>
            <b>{loading ? "Loading..." : "Enrollment Status"}</b>
          </Card.Header>
          <ListGroup variant="flush">
            {data.map((item) => {
              return (
                <ListGroup.Item
                  action
                  className="d-flex justify-content-between"
                  key={item._id}
                >
                  <div>
                    <div>
                      <b>{item.course[0].title}</b>
                    </div>
                    <div>
                      {item.course[0].type === "postgraduate"
                        ? "Post Graduate"
                        : "Master"}{" "}
                      Course
                    </div>
                  </div>
                  <div>
                    <div>
                      <AlertCircle size={18} style={{ color: "green" }} />
                      <span style={styles.statusspan}>-</span>
                      <Clock
                        size={18}
                        style={{
                          color: parseInt(item.status) > 0 ? "green" : "black",
                        }}
                      />
                      <span style={styles.statusspan}>-</span>
                      <CheckCircle
                        size={18}
                        style={{
                          color: parseInt(item.status) > 1 ? "green" : "black",
                        }}
                      />
                    </div>
                    <small>
                      Status :{" "}
                      {item.status === "0"
                        ? "Pending"
                        : item.status === "1"
                        ? "Accepted"
                        : "Joined"}
                    </small>
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
