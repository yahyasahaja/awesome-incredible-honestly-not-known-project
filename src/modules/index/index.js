import React, { Fragment, useEffect, useState, CSSProperties } from "react";
import { Container, Button, Row, Col, Carousel, Card, Badge } from "react-bootstrap";
import { Star, Briefcase, Box, Codesandbox, Award } from "react-feather";
import { useApplication } from "../../store";
import { AchievementInterface } from "../../store/asset";
import YouTube from "react-youtube";
import Link from "next/link";

function Course({ course }) {
  const styles = {
    carousel: {
      marginTop: 17.5
    },
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const temp = [];
    course.forEach(item => {
      temp.unshift(item);
    });
    const chunks = [];
    for (let i = Math.ceil(temp.length / 3); i > 0; i--) {
      chunks.push(temp.splice(0, Math.ceil(temp.length / i)));
    }
    setData(chunks);
  }, []);
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
                            <Link href="/learn-more/[_id]" as={`/learn-more/` + child._id}>
                              <a>Click here to learn more</a>
                            </Link>
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

function Certificate() {
  const iconsize = 15;
  const styles = {
    carousel: {
      marginTop: 17.5
    },
    icon: {
      marginTop: -4,
      marginRight: 4,
    },
  };
  const data = [
    [
      {
        title: "PMP® Certification",
        badge: "ADVANCED",
        rating: "4.20 (19665 Ratings)",
        learner: 63396,
      },
      {
        title: "Certified ScrumMaster® (CSM)",
        badge: "ADVANCED",
        rating: "4.20 (4947 Ratings)",
        learner: 13778,
      },
      {
        title: "Certified Lean Six Sigma Green Belt",
        badge: "FOUNDATIONAL",
        rating: "4.10 (4866 Ratings)",
        learner: 23082,
      },
    ],
    [
      {
        title: "PRINCE2® Foundation",
        badge: "FOUNDATIONAL",
        rating: "4.20 (929 Ratings)",
        learner: 12296,
      },
      {
        title: "ITIL® 4 Foundation",
        badge: "FOUNDATIONAL",
        rating: "4.50 (5340 Ratings)",
        learner: 3375,
      },
      {
        title: "AWS Solutions Architect",
        badge: "ADVANCED",
        rating: "4.20 (2623 Ratings)",
        learner: 4925,
      },
    ],
    [
      {
        title: "CEH (v10) - Certified Ethical Hacker",
        badge: "ADVANCED",
        rating: "4.50 (1309 Ratings)",
        learner: 1936,
      },
      {
        title: "Machine Learning",
        badge: "ADVANCED",
        rating: "4.40 (3648 Ratings)",
        learner: 9421,
      },
    ],
  ];
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

function Enterprises() {
  const styles = {
    container: {
      paddingTop: 27.5
    },
    textmargin: {
      marginBottom: 25,
    },
    card: {
      marginBottom: 20,
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
          <h2 style={styles.textmargin}>
            Employee and Team Training Solutions
          </h2>
          <h5 style={styles.textmargin}>
            Curriculum tailored to your organization, delivered with white-glove
            service and support
          </h5>
          <a href="#!">Click here to get free demo</a>
        </Col>
        <Col xs={7}>
          <h2 style={styles.textmargin}>
            Supporting Enterprises Around the Globe
          </h2>
          <Row>
            {app.asset.offering.map((item, index) => {
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
      <br />
    </Container>
  );
}

function Achievement() {
  const styles = {
    image: {
      height: 125,
      marginTop: 20,
      marginBottom: 20,
      textAlign: "center",
    },
    center: {
      textAlign: "center",
    },
  };
  const app = useApplication();
  return (
    <Container>
      <h2>Awards and Accolades</h2>
      <Row>
        {app.asset.achievement.map(
          (item, index) => {
            return (
              <Col key={index}>
                <div style={styles.image}>
                  <img src={item.src} />
                </div>
                <h5 style={styles.center}>{item.title}</h5>
                <div
                  className="text-muted"
                  style={styles.center}
                >
                  {item.description}
                </div>
              </Col>
            );
          }
        )}
      </Row>
    </Container>
  );
}

export default function Index({ postgraduate, master }) {
  const styles = {
    gray: {
      backgroundColor: "whitesmoke",
    },
    welcome: {
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
        paddingTop: 60,
      },
      spacer: {
        marginTop: 12.5,
        marginBottom: 12.5,
      },
      text: {
        color: "white",
      },
    },
    partnership: {
      center: {
        textAlign: "center",
        marginBottom: 25,
      },
      image: {
        width: "100%",
      }
    },
    marketing: {
      title: {
        marginBottom: 22.5,
      },
      icon: {
        marginBottom: 30,
      },
    }
  };
  const marketingicon = 40;
  return (
    <Fragment>
      <img src="./welcome.jpg" style={styles.welcome.image} />
      <Container>
        <div className="d-flex justify-content-between">
          <div style={styles.welcome.left}>
            <h1 style={styles.welcome.text}>World’s #1 Online Bootcamp</h1>
            <h6 style={styles.welcome.text}>1,000,000 careers advanced</h6>
            <h6 style={styles.welcome.text}>1,000 live classes every month</h6>
            <h6 style={styles.welcome.text}>
              85% report career benefits including promotion or a new job
            </h6>
            <div style={styles.welcome.spacer} />
            <Row>
              <Col xs={5}>
                <Button>All Courses</Button>
              </Col>
            </Row>
          </div>
          <div style={styles.welcome.right}>
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
      <Container>
        <br />
        <h5 style={styles.partnership.center}>
          Partnering with world&apos;s leading universities and companies
        </h5>
        <img src="./partnership.png" style={styles.partnership.image} />
        <br /><br />
      </Container>
      <div style={styles.gray}>
        <br />
        <Container>
          <h2>Get Certified, Get Ahead with Our Programs</h2>
          <hr />
        </Container>
        <Course course={postgraduate} />
        <Course course={master} />
        <Certificate />
        <br />
        <br />
      </div>
      <Container>
        <br />
        <h2 style={styles.marketing.title}>
          Our online bootcamp is an immersive learning experience
        </h2>
        <Row>
          <Col xs={3}>
            <Briefcase size={marketingicon} style={styles.marketing.icon} />
            <h6>Develop skills for real career growth</h6>
            <div className="text-muted">Cutting-edge curriculum designed in guidance with industry and academia to develop job-ready skills</div>
          </Col>
          <Col xs={3}>
            <Box size={marketingicon} style={styles.marketing.icon} />
            <h6>Learn from experts active in their field, not out-of-touch trainers</h6>
            <div className="text-muted">Leading practitioners who bring current best practices and case studies to sessions that fit into your work schedule</div>
          </Col>
          <Col xs={3}>
            <Codesandbox size={marketingicon} style={styles.marketing.icon} />
            <h6>Learn by working on real-world problems</h6>
            <div className="text-muted">Capstone projects involving real world data sets with virtual labs for hands-on learning</div>
          </Col>
          <Col xs={3}>
            <Award size={marketingicon} style={styles.marketing.icon} />
            <h6>Structured guidance ensuring learning never stops</h6>
            <div className="text-muted">24x7 Learning support from mentors and a community of like-minded peers to resolve any conceptual doubts</div>
          </Col>
        </Row>
        <br />
      </Container>
      <div style={styles.gray}>
        <Enterprises />
      </div>
      <br />
      <Achievement />
      <br />
      <div style={styles.gray}>
        <br />
        <Container>
          <div style={{ textAlign: "center" }}>
            <a href="#!">Terms of Use</a>
            {" / "}
            <a href="#!">Privacy Policy</a>
            {" / "}
            <a href="#!">Refund Policy</a>
            {" / "}
            <a href="#!">Reschedule Policy</a>
          </div>
          <small className="text-muted">
            <div style={{ textAlign: "center" }}>
              © 2009-2020 - Simplilearn Solutions. All Rights Reserved. The
              certification names are the trademarks of their respective owners.
            </div>
          </small>
        </Container>
        <br />
      </div>
    </Fragment>
  );
}
