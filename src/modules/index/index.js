import React, { Fragment, useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import { usePostGraduate } from "../post-graduate";
import { useMaster } from "../master";
import { Container, Button, Row, Col, Carousel, Card, Badge } from "react-bootstrap";
import { Check, Star, Briefcase, Box, Codesandbox, Award } from "react-feather";
import Router from "next/router";

function Welcome() {
  const styles = {
    image: {
      height: 400,
      width: "100%",
      objectFit: "cover",
      position: "absolute",
      filter: "brightness(0.5)",
    },
    message: {
      position: "relative",
      paddingTop: 120,
      paddingBottom: 120,
    },
    spacer: {
      marginTop: 12.5,
      marginBottom: 12.5,
    },
    text: {
      color: "white",
    },
  };
  return useObserver(() => (
    <Fragment>
      <img src="./welcome.jpg" style={styles.image} />
      <Container>
        <div style={styles.message}>
          <h1 style={styles.text}>World’s #1 Online Bootcamp</h1>
          <h6 style={styles.text}>1,000,000 careers advanced</h6>
          <h6 style={styles.text}>1,000 live classes every month</h6>
          <h6 style={styles.text}>
            85% report career benefits including promotion or a new job
          </h6>
          <div style={styles.spacer} />
          <Row>
            <Col xs={5}>
              <Button>All Courses</Button>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  ));
}

function Partnership() {
  const styles = {
    container: {
      marginTop: 25,
      marginBottom: 30,
    },
    center: {
      textAlign: "center",
      marginBottom: 30,
    },
    image: {
      width: "100%",
    },
  };
  return useObserver(() => (
    <Container style={styles.container}>
      <h5 style={styles.center}>
        Partnering with world&apos;s leading universities and companies
      </h5>
      <img src="./partnership.png" style={styles.image} />
    </Container>
  ));
}

function PostGraduate(props) {
  const iconsize = 15;
  const styles = {
    icon: {
      marginBottom: 2.5,
    },
    container: {
      marginBottom: 17.5,
    },
    checkbox: {
      marginTop: 12.5,
    },
    carousel: {
      marginBottom: 17.5,
    },
    carouselitem: {
      paddingLeft: "11.45%",
      paddingRight: "11.45%",
    },
    cardtext: {
      marginBottom: 0,
    },
    cardtextlink: {
      marginBottom: 2.5,
    },
    cardbody: {
      paddingTop: 15,
      paddingBottom: 17.5,
      paddingLeft: 15,
      paddingRight: 15,
    },
  };
  const postGraduate = usePostGraduate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    props.data.forEach(item => temp.unshift(item));
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, [props.data]);
  return useObserver(() => (
    <Fragment>
      <Container style={styles.container}>
        <h4>Post Graduate Programs</h4>
        <h6>
          Learn from global experts and get certified by the world&apos;s
          leading universities
        </h6>
        <Row style={styles.checkbox}>
          <Col>
            <small>
              <Check size={iconsize} style={styles.icon} /> University
              Certificates
            </small>
          </Col>
          <Col>
            <small>
              <Check size={iconsize} style={styles.icon} /> University Alumni
              Status
            </small>
          </Col>
          <Col>
            <small>
              <Check size={iconsize} style={styles.icon} /> Masterclasses from
              University
            </small>
          </Col>
          <Col>
            <small>
              <Check size={iconsize} style={styles.icon} /> Career Support
            </small>
          </Col>
        </Row>
      </Container>
      <Carousel style={styles.carousel} indicators={false}>
        {data.map((parent, pid) => {
          return (
            <Carousel.Item style={styles.carouselitem} key={pid}>
              <Row>
                {parent.map((child, cid) => {
                  return (
                    <Col xs={4} key={cid}>
                      <Card>
                        <div style={styles.cardbody}>
                          <h5 style={styles.cardtext}>{child.title}</h5>
                          <small>
                            <a
                              href="#!"
                              onClick={() => {
                                postGraduate._id = child._id;
                                Router.push("/post-graduate");
                              }}
                            >
                              Click here to learn more
                            </a>
                          </small>
                          <hr />
                          <h6>Course Start : {child.start}</h6>
                          <h6 style={styles.cardtextlink}>
                            Program Duration : {child.duration}
                          </h6>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Container>
        <hr />
      </Container>
    </Fragment>
  ));
}

function Master(props) {
  const iconsize = 15;
  const styles = {
    container: {
      marginBottom: 15,
    },
    carousel: {
      marginBottom: 20,
    },
    carouselitem: {
      paddingLeft: "11.45%",
      paddingRight: "11.45%",
    },
    cardbody: {
      height: 187.5,
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
    },
    cardtext: {
      marginBottom: 0,
    },
    cardicon: {
      marginBottom: 2.5,
    },
  };
  const master = useMaster();
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    props.data.forEach(item =>  temp.unshift(item));
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, [props.data]);
  return useObserver(() => (
    <Fragment>
      <Container style={styles.container}>
        <h4>Master&apos;s Programs</h4>
        <h6>
          Achieve your career goals with industry-recognized learning paths
        </h6>
      </Container>
      <Carousel style={styles.carousel} indicators={false}>
        {data.map((parent, pid) => {
          return (
            <Carousel.Item style={styles.carouselitem} key={pid}>
              <Row>
                {parent.map((child, cid) => {
                  return (
                    <Col xs={4} key={cid}>
                      <Card>
                        <Card.Body style={styles.cardbody}>
                          <h5 style={styles.cardtext}>{child.title}</h5>
                          <small>
                            <a
                              href="#!"
                              onClick={() => {
                                master._id = child._id;
                                Router.push("/master");
                              }}
                            >
                              Click here to learn more
                            </a>
                          </small>
                          <hr />
                          <h6>
                            {child.duration} | {child.course}
                          </h6>
                          {child.detail.map((ditem, dindex) => {
                            return (
                              <Fragment key={dindex}>
                                <small>
                                  <Check
                                    size={iconsize}
                                    style={styles.cardicon}
                                  />{" "}
                                  {ditem}
                                </small>
                                <br />
                              </Fragment>
                            );
                          })}
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Container>
        <hr />
      </Container>
    </Fragment>
  ));
}

function Certification(props) {
  const iconsize = 15;
  const styles = {
    container: {
      marginBottom: 17.5,
    },
    carouselitem: {
      paddingLeft: "11.45%",
      paddingRight: "11.45%",
    },
    card: {
      marginBottom: 17.5,
    },
    cardbody: {
      paddingTop: 15,
      paddingBottom: 7.5,
      paddingLeft: 15,
      paddingRight: 15,
    },
    cardtext: {
      marginBottom: 0,
    },
    cardspacer: {
      marginTop: 10,
      marginBottom: 7.5,
    },
    cardbadge: {
      marginBottom: 10,
    },
    cardicon: {
      marginRight: 5,
      marginBottom: 2.5,
    },
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    props.data.forEach(item => temp.unshift(item));
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, [props.data]);
  return useObserver(() => (
    <Fragment>
      <Container style={styles.container}>
        <h4>Certification Courses</h4>
        <h6>
          Get certified by global certification bodies and deepen your expertise
        </h6>
      </Container>
      <Carousel indicators={false}>
        {data.map((parent, pid) => {
          return (
            <Carousel.Item style={styles.carouselitem} key={pid}>
              <Row>
                {parent.map((child, cid) => {
                  return (
                    <Col xs={4} key={cid}>
                      <Card style={styles.card}>
                        <Card.Body style={styles.cardbody}>
                          <h5 style={styles.cardtext}>{child.title}</h5>
                          <hr style={styles.cardspacer} />
                          <Badge variant="success" style={styles.cardbadge}>
                            {child.badge}
                          </Badge>
                          <h6>
                            <Star size={iconsize} style={styles.cardicon} />
                            {child.rating} | {child.learner} Learners
                          </h6>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Fragment>
  ));
}

function Programs(props) {
  const styles = {
    container: {
      paddingTop: 22.5,
    },
    footer: {
      paddingBottom: 22.5,
    },
  };
  return useObserver(() => (
    <Fragment>
      <Container style={styles.container}>
        <h2>Get Certified, Get Ahead with Our Programs</h2>
        <hr />
      </Container>
      <PostGraduate data={props.postgraduate} />
      <Master data={props.master} />
      <Certification data={props.certification} />
      <div style={styles.footer} />
    </Fragment>
  ));
}

function Description(props) {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 22.5,
    },
    title: {
      marginBottom: 20,
    },
    icon: {
      marginBottom: 25,
    },
  };
  const iconsize = 40;
  const icondata = [
    <Briefcase size={iconsize} style={styles.icon} key={0} />,
    <Box size={iconsize} style={styles.icon} key={1} />,
    <Codesandbox size={iconsize} style={styles.icon} key={2} />,
    <Award size={iconsize} style={styles.icon} key={3} />,
  ];
  return useObserver(() => (
    <Fragment>
      <Container style={styles.container}>
        <h2 style={styles.title}>
          Our online bootcamp is an immersive learning experience
        </h2>
        <Row>
          {props.data.map((item, index) => {
            return (
              <Col xs={3} key={index}>
                {icondata[index]}
                <h6>{item.title}</h6>
                <div className="text-muted">{item.description}</div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  ));
}

function Offering(props) {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 22.5,
    },
    titleleft: {
      marginBottom: -10,
    },
    spacer: {
      marginTop: 98,
      marginBottom: 98,
    },
    card: {
      marginBottom: 25,
    },
    cardbody: {
      height: 80,
    },
    cardimg: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return useObserver(() => (
    <Container style={styles.container}>
      <Row>
        <Col xs={4}>
          <h2 style={styles.titleleft}>Employee and Team Training Solutions</h2>
          <div style={styles.spacer} />
          <h5>
            Curriculum tailored to your organization, delivered with white-glove
            service and support
          </h5>
          <div style={styles.spacer} />
          <Button>Request A Free Demo</Button>
        </Col>
        <Col xs={8}>
          <h3 style={styles.card}>Supporting Enterprises Around the Globe</h3>
          <Row>
            {props.data.map((item, index) => {
              return (
                <Col xs={4} key={index}>
                  <Card style={index < 7 ? styles.card : {}}>
                    <Card.Body style={styles.cardbody}>
                      <div style={styles.cardimg}>
                        <img src={item} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  ));
}

function Achievement(props) {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 22.5,
    },
    title: {
      marginBottom: -75,
    },
    image: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    description: {
      marginTop: 225,
    },
    center: {
      textAlign: "center",
    },
  };
  return useObserver(() => (
    <Container style={styles.container}>
      <h2 style={styles.title}>Awards and Accolades</h2>
      <Row>
        {props.data.map((item, index) => {
          return (
            <Col key={index}>
              <div style={styles.image}>
                <img src={item.src} />
              </div>
              <div style={styles.description}>
                <h5 style={styles.center}>{item.title}</h5>
                <div
                  className="text-muted"
                  style={styles.center}
                >
                  {item.description}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  ));
}

function Footer() {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 22.5,
    },
    center: {
      textAlign: "center",
    },
  };
  return useObserver(() => (
    <Container style={styles.container}>
      <div style={styles.center}>
        <a href="#!">Terms of Use</a>
        {" / "}
        <a href="#!">Privacy Policy</a>
        {" / "}
        <a href="#!">Refund Policy</a>
        {" / "}
        <a href="#!">Reschedule Policy</a>
      </div>
      <small className="text-muted">
        <div style={styles.center}>
          © 2009-2020 - Simplilearn Solutions. All Rights Reserved. The
          certification names are the trademarks of their respective owners.
        </div>
      </small>
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
      <Welcome />
      <Partnership />
      <div style={styles.gray}>
        <Programs
          postgraduate={props.postgraduate}
          master={props.master}
          certification={props.certification}
        />
      </div>
      <Description data={props.description} />
      <div style={styles.gray}>
        <Offering data={props.offering} />
      </div>
      <Achievement data={props.achievement} />
      <div style={styles.gray}>
        <Footer />
      </div>
    </Fragment>
  ));
}
