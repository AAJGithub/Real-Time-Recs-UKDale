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
  Badge,
  Card,
  Col,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
// import {Slides} from "react-slides";
// core components
import PresentationHeader from "components/Headers/PresentationHeader.js";

class Presentation extends React.Component {
  render() {
    return (
      <>
        <PresentationHeader />
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="text-uppercase mb-0">
                    Real Time Recommendation System
                  </h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <iframe
                        src="https://onedrive.live.com/embed?cid=6063CDBD917EDE2E&amp;resid=6063CDBD917EDE2E%21713&amp;authkey=AMVVqZC3g1xZrjM&amp;em=2&amp;wdAr=1.7777777777777777"
                        width="1000px"
                        height="600px"
                        frameborder="0"
                        style={styles.iframe}
                      >
                        This is an embedded{" "}
                        <a target="_blank" href="https://office.com">
                          Microsoft Office
                        </a>{" "}
                        presentation, powered by{" "}
                        <a target="_blank" href="https://office.com/webapps">
                          Office
                        </a>
                        .
                      </iframe>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const styles = {
  iframe: {
    margin: 10,
  },
};
export default Presentation;
