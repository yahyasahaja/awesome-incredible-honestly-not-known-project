import React, { Fragment, useEffect, useState } from "react";
import { Container, Button, Row, Col, Carousel, Card, Badge } from "react-bootstrap";
import { Check, Star, Briefcase, Box, Codesandbox, Award } from "react-feather";
import { useApplication } from "../../store";
import { PostGraduateStore } from "../post-graduate";
import { MasterStore } from "../master";
import YouTube from "react-youtube";
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
    left: {
      position: "relative",
      paddingTop: 120,
      paddingBottom: 120,
    },
    right: {
      position: "relative",
      paddingTop: 57.5,
    },
    spacer: {
      marginTop: 12.5,
      marginBottom: 12.5,
    },
    text: {
      color: "white",
    },
  };
  return (
    <Fragment>
      <img src="./welcome.jpg" style={styles.image} />
      <Container>
        <div className="d-flex justify-content-between">
          <div style={styles.left}>
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
          <div style={styles.right}>
            <YouTube
              videoId="rqJl427Sr-4"
              opts={{
                width: "500",
                height: "281",
              }}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

function Partnership() {
  const styles = {
    container: {
      marginTop: 25,
      marginBottom: 25,
    },
    center: {
      textAlign: "center",
      marginBottom: 25,
    },
    image: {
      width: "100%",
    },
  };
  return (
    <Container style={styles.container}>
      <h5 style={styles.center}>
        Partnering with world&apos;s leading universities and companies
      </h5>
      <img src="./partnership.png" style={styles.image} />
    </Container>
  );
}

function PostGraduate() {
  const styles = {
    carousel: {
      marginTop: 17.5,
      marginBottom: 22.5
    }
  }
  const app = useApplication();
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    app.course.postgraduate.forEach(item => {
      temp.unshift(item);
    });
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, [app.course.postgraduate]);
  return (
    <Container>
      <h4>Post Graduate Programs</h4>
      <h6>
        Learn from global experts and get certified by the world&apos;s leading
        universities
      </h6>
      <Carousel style={styles.carousel} indicators={false}>
        {data.map((parent, pid) => {
          return (
            <Carousel.Item key={pid}>
              <Row>
                {parent.map((child, cid) => {
                  return (
                    <Col xs={4} key={cid}>
                      <Card>
                        <Card.Body>
                          <h5>{child.title}</h5>
                          <hr />
                          <h6>Course Start : {child.start}</h6>
                          <h6>Program Duration : {child.duration}</h6>
                          <small>
                            <a
                              href="#!"
                              onClick={() => {
                                PostGraduateStore._id = child._id;
                                Router.push("/post-graduate");
                              }}
                            >
                              Click here to learn more
                            </a>
                          </small>
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
      <hr />
    </Container>
  );
}

function Master() {
  const iconsize = 15;
  const styles = {
    carousel: {
      marginTop: 17.5,
      marginBottom: 22.5
    },
    cardbody: {
      height: 187.5,
    },
  };
  const app = useApplication();
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    app.course.master.forEach(item => {
      temp.unshift(item);
    });
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, [app.course.master]);
  return (
    <Container>
      <h4>Master&apos;s Programs</h4>
      <h6>Achieve your career goals with industry-recognized learning paths</h6>
      <Carousel style={styles.carousel} indicators={false}>
        {data.map((parent, pid) => {
          return (
            <Carousel.Item key={pid}>
              <Row>
                {parent.map((child, cid) => {
                  return (
                    <Col xs={4} key={cid}>
                      <Card>
                        <Card.Body style={styles.cardbody}>
                          <h5>{child.title}</h5>
                          <hr />
                          <h6>
                            {child.duration} | {child.course} | <a href="#!" onClick={() => { MasterStore._id = child._id; Router.push("/master"); }}>Learn More</a>
                          </h6>
                          {child.detail.map((ditem, dindex) => {
                            return (
                              <Fragment key={dindex}>
                                <small>
                                  <Check
                                    size={iconsize}
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
      <hr />
    </Container>
  );
}

function Certification() {
  const iconsize = 15;
  const styles = {
    carousel: {
      marginTop: 17.5,
      marginBottom: 17.5
    },
    icon: {
      marginTop: -4,
      marginRight: 4,
    }
  };
  const app = useApplication();
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    app.asset.certification.forEach(item => {
      temp.unshift(item);
    });
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, [app.asset.certification]);
  return (
    <Container>
      <h4>Certification Courses</h4>
      <h6>
        Get certified by global certification bodies and deepen your expertise
      </h6>
      <Carousel style={styles.carousel} indicators={false}>
        {data.map((parent, pid) => {
          return (
            <Carousel.Item key={pid}>
              <Row>
                {parent.map((child, cid) => {
                  return (
                    <Col xs={4} key={cid}>
                      <Card>
                        <Card.Body>
                          <h5>{child.title}</h5>
                          <hr />
                          <h6>
                            <Star size={iconsize} style={styles.icon} />
                            {child.rating} | {child.learner} Learners
                          </h6>
                          <Badge variant="success" className="d-inline">
                            {child.badge}
                          </Badge>
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
    </Container>
  );
}

function Programs() {
  const styles = {
    container: {
      paddingTop: 22.5,
    },
    footer: {
      paddingBottom: 22.5,
    },
  };
  return (
    <Fragment>
      <Container style={styles.container}>
        <h2>Get Certified, Get Ahead with Our Programs</h2>
        <hr />
      </Container>
      <PostGraduate />
      <Master />
      <Certification />
      <div style={styles.footer} />
    </Fragment>
  );
}

function Description() {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 22.5,
    },
    title: {
      marginBottom: 22.5,
    },
    icon: {
      marginBottom: 30,
    },
  };
  const iconsize = 40;
  const icondata = [
    <Briefcase size={iconsize} style={styles.icon} key={0} />,
    <Box size={iconsize} style={styles.icon} key={1} />,
    <Codesandbox size={iconsize} style={styles.icon} key={2} />,
    <Award size={iconsize} style={styles.icon} key={3} />,
  ];
  const app = useApplication();
  return (
    <Container style={styles.container}>
      <h2 style={styles.title}>
        Our online bootcamp is an immersive learning experience
      </h2>
      <Row>
        {app.asset.description.map(
          (item, index) => {
            return (
              <Col xs={3} key={index}>
                {icondata[index]}
                <h6>{item.title}</h6>
                <div className="text-muted">{item.description}</div>
              </Col>
            );
          }
        )}
      </Row>
    </Container>
  );
}

function Offering() {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 15
    },
    textmargin: {
      marginBottom: 25
    },
    card: {
      marginBottom: 20
    },
    cardbody: {
      height: 75,
    },
    cardimg: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const app = useApplication();
  return (
    <Container style={styles.container}>
      <Row>
        <Col xs={5}>
          <h2 style={styles.textmargin}>Employee and Team Training Solutions</h2>
          <h5 style={styles.textmargin}>
            Curriculum tailored to your organization, delivered with white-glove
            service and support
          </h5>
          <a href="#!">Click here to get free demo</a>
        </Col>
        <Col xs={7}>
          <h2 style={styles.textmargin}>Supporting Enterprises Around the Globe</h2>
          <Row>
            {app.asset.offering.map((item, index) => {
              return (
                <Col xs={4} key={index}>
                  <Card style={styles.card}>
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
  );
}

function Achievement() {
  const styles = {
    container: {
      paddingTop: 22.5,
      paddingBottom: 27.5,
    },
    title: {
      marginBottom: -75,
    },
    image: {
      position: "absolute",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
    },
    description: {
      marginTop: 225,
    },
    center: {
      textAlign: "center",
    },
  };
  const app = useApplication();
  return (
    <Container style={styles.container}>
      <h2 style={styles.title}>Awards and Accolades</h2>
      <Row>
        {app.asset.achievement.map(
          (item, index) => {
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
          }
        )}
      </Row>
    </Container>
  );
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
  return (
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
  );
}

export default function Index() {
  const styles = {
    gray: {
      backgroundColor: "whitesmoke",
    },
  };
  return (
    <Fragment>
      <Welcome />
      <Partnership />
      <div style={styles.gray}>
        <Programs />
      </div>
      <Description />
      <div style={styles.gray}>
        <Offering />
      </div>
      <Achievement />
      <div style={styles.gray}>
        <Footer />
      </div>
    </Fragment>
  );
}
