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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="4">
            <div className="copyright text-center text-xl-left text-muted">
              Real-Time Recommendations
            </div>
          </Col>
          {/* <Row className="align-items-center text-xl-right">
            <Col>
              <div className="copyright text-muted">
                Icons by
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.creative-tim.com?ref=adr-auth-footer"
                  target="_blank"
                >
                  Roundicons
                </a>
                &nbsp;from
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.flaticon.com/"
                  target="_blank"
                >
                  www.flaticon.com
                </a>
              </div>
            </Col>
            <div className="copyright text-center text-muted">
              Template by
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com?ref=adr-auth-footer"
                target="_blank"
                >
                Creative Tim
              </a>
            </div>
          </Row> */}
        </Row>
      </footer>
    );
  }
}

export default Footer;
