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
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

class ApplianceHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "200px",
            backgroundImage:
              "url(" + require("assets/img/theme/background.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-4" />
          {/* Header container */}
          <Container fluid>
            <Row>
              <Col>
                <h1 className="display-2 text-white">
                  Appliance Recommendations
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-white mt-0 mb-5">
                  Change the status of appliances to get the recommendations.
                </p>
              </Col>
              <Col lg="2">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <Col className="col-auto">
                      <div className="icon">
                        <i className="far fa-clock" />
                      </div>
                    </Col>
                    {/* <div className="col"> */}
                      <CardTitle className="text-uppercase text-muted mb-0">
                        <h1>{this.props.time}</h1>
                      </CardTitle>
                    {/* </div> */}
                  </Row>
                </CardBody>
              </Card>
              </Col>
              </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ApplianceHeader;
