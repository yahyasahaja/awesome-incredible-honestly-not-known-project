import React, { Fragment, useState } from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Button,
  ProgressBar,
} from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import SortArray from "sort-objects-array";
import { decode } from "universal-base64";
import Navbar from "../../../../../../components/navbar";
import Fetch from "../../../../../../libraries/fetch";
import { useUser } from "../../../../../../stores/user";

export async function getServerSideProps(ctx) {
  /* eslint-disable */
  const results = await Fetch(`{
    enrollmentById(_id:"` + ctx.params.enrollment + `") {
      materi
      class {
        _id
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
    }
  }`).then(result => {
    /* eslint-enable */
    let progress = 1;
    const module = result.data.enrollmentById.class[0].course[0].bab;
    module.forEach((bab) => {
      SortArray(bab.materi, "order").forEach((materi) => {
        materi.progress = progress;
        progress++;
      });
    });
    return {
      enrollment: ctx.params.enrollment,
      class: {
        _id: result.data.enrollmentById.class[0]._id,
        name: result.data.enrollmentById.class[0].name,
      },
      module: module,
      progress: parseInt(result.data.enrollmentById.materi),
    };
  });
  return {
    props: {
      enrollment: results.enrollment,
      classdata: results.class,
      moduledata: results.module,
      progress: results.progress,
    },
  };
}

export default function Index({ enrollment, classdata, moduledata, progress }) {
  let total = 0;
  moduledata.forEach((bab) => {
    total += bab.materi.length;
  });
  const app = useUser();
  const [now, setNow] = useState(progress);
  const [active, setActive] = useState({
    _id: "",
    name: "No item selected",
    content: "",
    progress: 0,
  });
  const [loading, setLoading] = useState(false);
  function getContent(_id, progress) {
    setLoading(true);
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
          progress: progress,
        });
        setLoading(false);
      }
    );
  }
  function progressHandler() {
    setLoading(true);
    const nextProgress = now + 1;
    app.enrollment
      .progressModule({
        _id: enrollment,
        materi: nextProgress,
      })
      .then(() => {
        setNow(nextProgress);
        setLoading(false);
      });
  }
  return (
    <Fragment>
      <Navbar />
      <br />
      <Container>
        <Card>
          <Card.Header style={{ borderBottom: "0px" }}>
            <b>{classdata.name} - Module</b>
          </Card.Header>
        </Card>
        <br />
        <Row>
          <Col xs={3}>
            <Card>
              <Card.Header>
                <b>Table Of Contents</b>
              </Card.Header>
              <Card.Body>
                <ProgressBar
                  now={(now / total) * 100}
                  label={`${(now / total) * 100}%`}
                />
              </Card.Body>
              <ListGroup variant="flush">
                {SortArray(moduledata, "order").map((bab) => {
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
                            onClick={() =>
                              getContent(materi._id, materi.progress)
                            }
                            disabled={materi.progress > now + 1}
                          >
                            {materi.name}
                          </ListGroup.Item>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </ListGroup>
              {active._id !== "" && (
                <Card.Body>
                  <Button
                    block
                    disabled={loading || active.progress <= now}
                    variant={active.progress <= now ? "success" : "primary"}
                    onClick={() => progressHandler()}
                  >
                    {active.progress <= now ? "Done" : "Mask As Done"}
                  </Button>
                </Card.Body>
              )}
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
