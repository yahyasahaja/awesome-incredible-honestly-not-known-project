import Router from "next/router";
import React, { Fragment, useState } from "react";
import { Breadcrumb, Card, Container, ListGroup } from "react-bootstrap";
import Administrator from "../../../../../../../components/administrator";
import Fetch from "../../../../../../../libraries/fetch";
import { useAdministrator } from "../../../../../../../stores/administrator";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      _id
      name
      course {
        _id
      }
    }
    allEnrollment {
      _id
      status
      course {
        _id
      }
      user {
        name
        email
      }
    }
  }`).then(result => {
    /* eslint-enable */
    const accepted = [];
    result.data.allEnrollment.forEach((item) => {
      if (
        item.status === "1" &&
        item.course[0]._id === result.data.classById.course[0]._id
      ) {
        const temp = item;
        temp.added = false;
        accepted.unshift(temp);
      }
    });
    return {
      classdata: result.data.classById,
      accepted: accepted,
    };
  });
  return {
    props: {
      classdata: results.classdata,
      accepted: results.accepted,
    },
  };
}

export default function Index({ classdata, accepted }) {
  const styles = {
    container: { paddingTop: 12.5, paddingBottom: 12.5 },
    breadcrumb: { marginTop: -1.25 },
  };
  const app = useAdministrator();
  const [list, setList] = useState(accepted);
  const [loading, setLoading] = useState(false);
  function addHandler(param) {
    setLoading(true);
    app.user
      .update({
        _id: param,
        status: "2",
        class: classdata._id,
      })
      .then(() => {
        setList(
          list.filter((item) => {
            if (item._id === param) item.added = true;
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
            onClick={() => Router.push("/administrator/class")}
          >
            Class
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/class/manage/" + classdata._id)
            }
          >
            {classdata.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push("/administrator/class/manage/" + classdata._id)
            }
          >
            Manage
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/class/manage/" + classdata._id + "/student"
              )
            }
          >
            Student
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={styles.breadcrumb}
            onClick={() =>
              Router.push(
                "/administrator/class/manage/" + classdata._id + "/student/add"
              )
            }
          >
            Add
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <b>Accepted List</b>
          </Card.Header>
          {list.length !== 0 && (
            <ListGroup variant="flush">
              {list.map((item) => {
                return (
                  <ListGroup.Item action key={item._id}>
                    <div>
                      <b>{item.user[0].name}</b>
                    </div>
                    <div>{item.user[0].email}</div>
                    {item.added ? (
                      <a href="#!" className="text-muted">
                        Added
                      </a>
                    ) : (
                      <a
                        href="#!"
                        className={loading ? "text-muted" : ""}
                        onClick={() => addHandler(item._id)}
                      >
                        Add to class
                      </a>
                    )}
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
