import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Card, Container, ListGroup } from "react-bootstrap";
import { AlertCircle, CheckCircle, Clock } from "react-feather";
import Administrator from "../../../components/administrator";
import Fetch from "../../../libraries/fetch";
import { useAdministrator } from "../../../stores/administrator";

export async function getServerSideProps() {
  /* eslint-disable */
  const results = await Fetch(`{
    allEnrollment {
      _id
      status
      course {
        title
      }
      user {
        name
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const enrollment = [];
    result.data.allEnrollment.forEach((item) => enrollment.unshift(item));
    return {
      enrollment: enrollment,
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
    },
  };
}

export default function Index({ enrollment }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
    statusspan: {
      marginLeft: 10,
      marginRight: 10,
      fontWeight: 750,
    },
  };
  const app = useAdministrator();
  const [list, setList] = useState(enrollment);
  const [loading, setLoading] = useState(false);
  function acceptHandler(param) {
    setLoading(true);
    app.user
      .update({
        _id: param,
        status: "1",
        class: "",
      })
      .then(() => {
        setList(
          list.filter((item) => {
            if (item._id === param) item.status = "1";
            return item;
          })
        );
        setLoading(false);
      });
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
            onClick={() => Router.push("/administrator/user")}
          >
            User
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Manage User</b>
          </Card.Header>
          <ListGroup variant="flush">
            {list.map((item) => {
              return (
                <ListGroup.Item
                  action
                  className="d-flex justify-content-between"
                  key={item._id}
                >
                  <div>
                    <div>
                      <b>{item.user[0].name}</b>
                    </div>
                    <div>
                      {item.course[0].title}{" "}
                      {item.status === "0" && (
                        <Fragment>
                          {" / "}
                          <a
                            href="#!"
                            className={loading ? "text-muted" : ""}
                            onClick={() => acceptHandler(item._id)}
                          >
                            Accept Request
                          </a>
                        </Fragment>
                      )}
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
