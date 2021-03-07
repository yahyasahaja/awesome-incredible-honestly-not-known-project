import React, { Fragment, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import SortArray from "sort-objects-array";
import { decode } from "universal-base64";
import Instructor from "../../../../../components/instructor";
import Fetch from "../../../../../libraries/fetch";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    classById(_id:"` + ctx.params.class + `") {
      name
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
  }`).then(result => {
    /* eslint-enable */
    return {
      classroom: {
        name: result.data.classById.name,
        module: result.data.classById.course[0].bab,
      },
    };
  });
  return {
    props: {
      classroom: results.classroom,
    },
  };
}

export default function Index({ classroom }) {
  const [active, setActive] = useState({
    _id: "",
    name: "No item selected",
    content: "",
  });
  function getContent(_id) {
    setActive({
      ...active,
      content: "<b>Loading...</b>",
    });
    /* eslint-disable */
    Fetch(`{ materiById(_id:"` + _id + `") { _id name content } }`).then(result => {
        /* eslint-enable */
        setActive({
          _id: result.data.materiById._id,
          name: result.data.materiById.name,
          content: decode(result.data.materiById.content),
        });
      }
    );
  }
  return (
    <Fragment>
      <Instructor />
      <br />
      <Container>
        <Card>
          <Card.Header style={{ borderBottom: "0px" }}>
            <b>{classroom.name} - Student List - Module</b>
          </Card.Header>
        </Card>
        <br />
        <Row>
          <Col xs={3}>
            <Card>
              <Card.Header>
                <b>Table Of Contents</b>
              </Card.Header>
              <ListGroup variant="flush">
                {SortArray(classroom.module, "order").map((bab) => {
                  return (
                    <Fragment key={bab._id}>
                      <ListGroup.Item>
                        <b>{bab.name}</b>
                      </ListGroup.Item>
                      {SortArray(bab.materi, "order").map((materi) => {
                        return (
                          <ListGroup.Item
                            action
                            key={materi._id}
                            style={{ paddingLeft: 30 }}
                            onClick={() => getContent(materi._id)}
                          >
                            {materi.name}
                          </ListGroup.Item>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </ListGroup>
            </Card>
          </Col>
          <Col xs={9}>
            <h1 style={{ marginBottom: 15 }}>{active.name}</h1>
            {ReactHtmlParser(active.content)}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
