/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  Col,
  CardHeader,
  Container,
  Row,
  UncontrolledTooltip,
  CardBody,
  CardTitle,
} from "reactstrap";
// core components
import AboutUsHeader from "components/Headers/AboutUsHeader.js";

class AboutUs extends React.Component {
  render() {
    return (
      <>
        <AboutUsHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="text-uppercase mb-0">Project Advisor</h3>
                </CardHeader>
                <Card
                  className="card-stats mb-4 ml-4"
                  style={{ width: "33rem" }}
                >
                  <CardBody>
                    <Row>
                      <a
                        className="avatar rounded-circle mr-3 ml-3"
                        style={{
                          ...styles.avatar_style,
                        }}
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          alt="..."
                          src={require("assets/img/theme/meirinaki1.jpg")}
                        />
                      </a>
                      <Col className="col-auto">
                        <div className="col">
                          <CardTitle className="h2 text-uppercase font-weight-bold mb-0">
                            Dr. Magdalini Eirinaki
                          </CardTitle>
                          <span className="mb-0">
                            Professor, Associate Chair
                          </span>
                        </div>
                        <p></p>
                        <p className="ml-3 text-muted mb-0">
                          <span className="text-default mr-2">
                            <i className="ni ni-building" />
                          </span>
                          Computer Engineering
                        </p>
                        <p className="ml-3 text-muted mb-0">
                          <span className="text-primary mr-2">
                            <i className="ni ni-email-83" />
                          </span>
                          <a href="mailto:magdalini.eirinaki@sjsu.edu">
                            <span className="text-muted">
                              magdalini.eirinaki@sjsu.edu
                            </span>
                          </a>
                        </p>
                        <p className="ml-3 text-muted mb-0">
                          <span className="text-success mr-2">
                            <i className="ni ni-mobile-button" />
                          </span>
                          (408) 924-3828
                        </p>
                        <p className="mb-0">
                          <div className="ml-4 mt-2">
                            <a
                              className="avatar avatar-sm mr-2"
                              href={
                                "https://www.sjsu.edu/people/magdalini.eirinaki/"
                              }
                              id="sjsu"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require("assets/img/theme/sjsu.png")}
                              />
                            </a>
                            <UncontrolledTooltip delay={0} target="sjsu">
                              SJSU Profile
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm mr-2"
                              href={"https://www.linkedin.com/in/meirinaki/"}
                              id="linkedin"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require("assets/img/theme/linkedin1.png")}
                              />
                            </a>
                            <UncontrolledTooltip delay={0} target="linkedin">
                              LinkedIn Profile
                            </UncontrolledTooltip>
                          </div>
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Card>
            </div>
          </Row>
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="text-uppercase mb-0">Project Team</h3>
                </CardHeader>
                <Row>
                  <Col>
                    <Card
                      className="card-stats mb-4 ml-4"
                      style={{ width: "33rem" }}
                    >
                      <CardBody>
                        <Row>
                          <a
                            className="avatar rounded-circle mr-3 ml-3"
                            style={{
                              ...styles.avatar_style,
                            }}
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/ajinkya.jpg")}
                            />
                          </a>
                          <Col className="col-auto">
                            <div className="col">
                              <CardTitle className="h2 text-uppercase font-weight-bold mb-0">
                                Ajinkya Thakare
                              </CardTitle>
                              <span className="mb-0">Graduate Student</span>
                            </div>
                            <p></p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-default mr-2">
                                <i className="ni ni-building" />
                              </span>
                              Software Engineering
                            </p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-success mr-2">
                                <i className="ni ni-email-83" />
                              </span>
                              <a href="mailto:thakare725@gmail.com">
                                <span className="text-muted">
                                  thakare725@gmail.com
                                </span>
                              </a>
                            </p>
                            <p className="mb-0">
                              <div className="ml-4 mt-2">
                                <a
                                  className="avatar avatar-sm mr-2"
                                  href={
                                    "https://www.linkedin.com/in/aj1thakare/"
                                  }
                                  id="linkedin"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/linkedin1.png")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="linkedin"
                                >
                                  LinkedIn Profile
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm"
                                  href={"https://github.com/ajthakare"}
                                  id="github"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/github-logo.png")}
                                  />
                                </a>
                                <UncontrolledTooltip delay={0} target="github">
                                  GitHub Profile
                                </UncontrolledTooltip>
                              </div>
                            </p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      className="card-stats mb-4 ml-4"
                      style={{ width: "33rem" }}
                    >
                      <CardBody>
                        <Row>
                          <a
                            className="avatar rounded-circle mr-3 ml-3"
                            style={{
                              ...styles.avatar_style,
                            }}
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/akshayj.jpg")}
                            />
                          </a>
                          <Col className="col-auto">
                            <div className="col">
                              <CardTitle className="h2 text-uppercase font-weight-bold mb-0">
                                Akshay Jaiswal
                              </CardTitle>
                              <span className="mb-0">Graduate Student</span>
                            </div>
                            <p></p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-default mr-2">
                                <i className="ni ni-building" />
                              </span>
                              Software Engineering
                            </p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-success mr-2">
                                <i className="ni ni-email-83" />
                              </span>
                              <a href="mailto:akshay1822jaiswal@gmail.com">
                                <span className="text-muted">
                                  akshay1822jaiswal@gmail.com
                                </span>
                              </a>
                            </p>
                            <p className="mb-0">
                              <div className="ml-4 mt-2">
                                <a
                                  className="avatar avatar-sm mr-2"
                                  href={
                                    "https://www.linkedin.com/in/akshay-jaiswal/"
                                  }
                                  id="linkedin"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/linkedin1.png")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="linkedin"
                                >
                                  LinkedIn Profile
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm"
                                  href={"https://github.com/Akshay-Jaiswal"}
                                  id="github"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/github-logo.png")}
                                  />
                                </a>
                                <UncontrolledTooltip delay={0} target="github">
                                  GitHub Profile
                                </UncontrolledTooltip>
                              </div>
                            </p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card
                      className="card-stats mb-4 ml-4"
                      style={{ width: "33rem" }}
                    >
                      <CardBody>
                        <Row>
                          <a
                            className="avatar rounded-circle mr-3 ml-3"
                            style={{
                              ...styles.avatar_style,
                            }}
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/akshayp.jpg")}
                            />
                          </a>
                          <Col className="col-auto">
                            <div className="col">
                              <CardTitle className="h2 text-uppercase font-weight-bold mb-0">
                                Akshay Pagar
                              </CardTitle>
                              <span className="mb-0">Graduate Student</span>
                            </div>
                            <p></p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-default mr-2">
                                <i className="ni ni-building" />
                              </span>
                              Software Engineering
                            </p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-success mr-2">
                                <i className="ni ni-email-83" />
                              </span>
                              <a href="mailto:akshay.pagar1994@gmail.com">
                                <span className="text-muted">
                                  akshay.pagar1994@gmail.com
                                </span>
                              </a>
                            </p>
                            <p className="mb-0">
                              <div className="ml-4 mt-2">
                                <a
                                  className="avatar avatar-sm mr-2"
                                  href={
                                    "https://www.linkedin.com/in/akshay-pagar/"
                                  }
                                  id="linkedin"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/linkedin1.png")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="linkedin"
                                >
                                  LinkedIn Profile
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm"
                                  href={"https://github.com/AkshayPagar"}
                                  id="github"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/github-logo.png")}
                                  />
                                </a>
                                <UncontrolledTooltip delay={0} target="github">
                                  GitHub Profile
                                </UncontrolledTooltip>
                              </div>
                            </p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      className="card-stats mb-4 ml-4"
                      style={{ width: "33rem" }}
                    >
                      <CardBody>
                        <Row>
                          <a
                            className="avatar rounded-circle mr-3 ml-3"
                            style={{
                              ...styles.avatar_style,
                            }}
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/janhavi.jpg")}
                            />
                          </a>
                          <Col className="col-auto">
                            <div className="col">
                              <CardTitle className="h2 text-uppercase font-weight-bold mb-0">
                                Janhavi Dahihande
                              </CardTitle>
                              <span className="mb-0">Graduate Student</span>
                            </div>
                            <p></p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-default mr-2">
                                <i className="ni ni-building" />
                              </span>
                              Software Engineering
                            </p>
                            <p className="ml-3 text-muted mb-0">
                              <span className="text-success mr-2">
                                <i className="ni ni-email-83" />
                              </span>
                              <a href="mailto:janhavidahihande@gmail.com">
                                <span className="text-muted">
                                  janhavidahihande@gmail.com
                                </span>
                              </a>
                            </p>
                            <p className="mb-0">
                              <div className="ml-4 mt-2">
                                <a
                                  className="avatar avatar-sm mr-2"
                                  href={
                                    "https://www.linkedin.com/in/janhavi-dahihande/"
                                  }
                                  id="linkedin"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/linkedin1.png")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="linkedin"
                                >
                                  LinkedIn Profile
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm"
                                  href={"https://github.com/JanhaviDahihande"}
                                  id="github"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("assets/img/theme/github-logo.png")}
                                  />
                                </a>
                                <UncontrolledTooltip delay={0} target="github">
                                  GitHub Profile
                                </UncontrolledTooltip>
                              </div>
                            </p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const styles = {
  recommendation_card_style: {
    color: "black",
    height: "auto",
    justifyContent: "center",
  },
  avatar_style: {
    height: "10rem",
    width: "10rem",
  },
  table_style: {
    width: 0,
  },
  table_row_style: {
    padding: 0.2,
  },
  colStyle: {
    marginBottom: 10,
    textAlign: "center",
  },
  selectedButtonStyle: {
    backgroundColor: "#CD5C5C",
    width: "10rem",
  },
  normalButtonStyle: {
    backgroundColor: "white",
    width: "10rem",
  },
};

export default AboutUs;
