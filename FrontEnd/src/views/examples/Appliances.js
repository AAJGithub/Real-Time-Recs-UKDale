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
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Media,
  Modal,
  UncontrolledTooltip,
  CardImg,
  CardText,
} from "reactstrap";
// core components
import ApplianceHeader from "components/Headers/ApplianceHeader.js";
import Timekeeper from "react-timekeeper";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
const fs = require("fs");

class Appliances extends React.Component {
  state = {
    systemTime: true,
    customeTime: false,
    customeTimeData: "12:45",
    systemTimeClick: "12:45",
    checked: false,
    exampleModal: false,
    data: {
      //Kitchen appliances
      checkedKitchen0: false,
      checkedKitchen1: false,
      checkedKitchen2: false,
      checkedKitchen3: false,
      checkedKitchen4: false,
      checkedKitchen5: false,
      checkedKitchen6: false,
      //Living room appliances
      checkedLiving0: false,
      checkedLiving1: false,
      checkedLiving2: false,
      checkedLiving3: false,
      checkedLiving4: false,
      checkedLiving5: false,
      checkedLiving6: false,
      //Bedroom appliances
      checkedBedroom0: false,
      checkedBedroom1: false,
      checkedBedroom2: false,
      //Laundry appliances
      checkedLaundry0: false,
    },
    model: null,
    rec_model: {},
    rec_model_loaded: false,
    rec_on_on_arr: [],
    rec_on_off_arr: [],
    rec_off_off_arr: [],
    rec_off_on_arr: [],
  };

  componentWillMount() {
    this.setDefaultTime();

    var csvFilePath = require("./time.csv");
    var final_CO_path = require("../../data/Final_CO.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.save_from_csv,
    });
    Papa.parse(final_CO_path, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.final_save_from_csv,
    });
  }

  save_from_csv = (result) => {
    const data = result.data;
    // console.log(data);

    for (let row of data) {
      let time = parseInt(row.Time.replace(/:/g, ""));
      let recsArr = row.Recommendations.split(",");
      this.state.rec_model[time] = recsArr;
    }

    // console.log("Saving rec model in state:");
    // console.log(this.state.rec_model);
  };

  setDefaultTime = () => {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var strTime = hours + ":" + minutes;

    this.setState({
      systemTime: true,
      customeTime: false,
      systemTimeClick: strTime,
    });
  };

  handleCustomTime = (e) => {
    e.preventDefault();
    this.setState({
      customeTime: true,
      systemTime: false,
    });
  };

  handleSystemTime = (e) => {
    e.preventDefault();
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var strTime = hours + ":" + minutes;

    this.setState({
      systemTime: true,
      customeTime: false,
      systemTimeClick: strTime,
    });
  };

  customTimeClick = (time) => {
    this.setState({
      customTimeClick: time,
    });
  };

  handleChange = (event) => {
    const newData = {
      ...this.state.data,
      [event.target.name]: event.target.checked,
    };
    this.setState({ data: newData });
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  fetch_recommendations = () => {
    // console.log("From fetch_recommendations");
    // console.log(this.state.model);

    //get appropriate time key to look into saved recommendation model
    var timeKey = parseInt(this.state.model.time);

    if (timeKey > 233000) timeKey = parseInt("000000");
    else {
      let mins = timeKey % 10000;
      timeKey -= mins;

      let to_add = 3000;
      if (mins > 3000) to_add = 10000;
      if (mins < 3000) to_add = 0;

      timeKey += to_add;
    }

    var appls = this.state.rec_model[timeKey];

    // console.log("Recommendations: " + appls);

    //logic to check which devices should be on and off
    const to_off = [];
    const to_on = [];
    for (let app of this.state.model.on) {
      if (appls.includes(app)) {
        this.state.rec_on_on_arr.push(app);
      } else {
        // this.state.rec_on_off_arr.push(app);
        to_off.push(app);
      }
    }
    this.setState({
      rec_on_off_arr: to_off,
    });

    for (let app of this.state.model.off) {
      if (appls.includes(app)) {
        to_on.push(app);
        // this.state.rec_off_on_arr.push(app);
      } else {
        this.state.rec_off_off_arr.push(app);
      }
    }
    this.setState({
      rec_off_on_arr: to_on,
    });

    // console.log("Should be & are ON: " + this.state.rec_on_on_arr);
    // console.log("Should be ON, but OFF: " + this.state.rec_on_off_arr);
    // console.log("Should be & are OFF: " + this.state.rec_off_off_arr);
    // console.log("Should be OFF, but ON: " + this.state.rec_off_on_arr);
  };

  render() {
    const kitchen_appliances = [
      "Kettle",
      "Rice Cooker",
      "Dish Washer",
      "Fridge",
      "Microwave",
      "Cooker",
      "Toaster",
    ];
    const laundry_room_appliances = ["Washing Machine"];
    const bedroom_appliances = ["Laptop", "Monitor", "Laptop2"];
    const living_room_appliances = [
      "Speakers",
      "Server",
      "Router",
      "Server_hdd",
      "Playstation",
      "Modem",
      "Running Machine",
    ];
    const rooms = {
      Kitchen: kitchen_appliances,
      Living: living_room_appliances,
      Bedroom: bedroom_appliances,
      Laundry: laundry_room_appliances,
    };

    const rec_images = {
      Laptop: "Bedroom_0",
      Monitor: "Bedroom_1",
      Laptop2: "Bedroom_2",
      Kettle: "Kitchen_0",
      "Rice Cooker": "Kitchen_1",
      "Dish Washer": "Kitchen_2",
      Fridge: "Kitchen_3",
      Microwave: "Kitchen_4",
      Cooker: "Kitchen_5",
      Toaster: "Kitchen_6",
      Speakers: "Living_0",
      Server: "Living_1",
      Router: "Living_2",
      Server_hdd: "Living_3",
      Playstation: "Living_4",
      Modem: "Living_5",
      "Running Machine": "Living_6",
      "Washing Machine": "Laundry_0",
    };

    const generateRecommendations = () => {
      var time = this.state.systemTime
        ? this.state.systemTimeClick
        : this.state.customTimeClick;
      time = time.replace(/:/g, "");
      time = time.replace(" AM", "");
      time = time.replace(" PM", "");
      time = time + "00";
      const model = { time: time, on: [], off: [] };
      for (var index in this.state.data) {
        var appliance_room = index.substring(7).slice(0, -1);
        var appliance_name_index = index.substring(7).slice(-1);
        if (this.state.data[index])
          model.on.push(rooms[appliance_room][appliance_name_index]);
        else model.off.push(rooms[appliance_room][appliance_name_index]);
      }
      //console.log(model);
      this.state.model = model;
      this.fetch_recommendations();
    };

    return (
      <>
        {/* <Header /> */}
        <ApplianceHeader />

        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">APPLIANCES LIST</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        {Object.keys(rooms).map((key, index) => (
                          <>
                            <Col lg="6">
                              <Card
                                className="card-stats mb-4 mb-lg-0"
                                style={styles.cardStyle}
                              >
                                <CardBody>
                                  <Row>
                                    <div className="col">
                                      <CardTitle className="text-uppercase font-weight-bold text-muted mb-0">
                                        {key}
                                      </CardTitle>
                                      <span className="h2  mb-0">
                                        {rooms[key].length} appliances
                                      </span>
                                    </div>
                                    <Col className="col-auto">
                                      <div className="avatar rounded-circle mr-3">
                                        {/* <i className="fas fa-chart-bar" /> */}
                                        <img
                                          alt="..."
                                          src={require("assets/img/theme/" +
                                            key +
                                            ".png")}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Table
                                    className="align-items-center"
                                    responsive
                                  >
                                    <tbody>
                                      {rooms[key].map((value, index) => {
                                        const checkValue =
                                          "checked" + key + index;
                                        // console.log(checkValue);
                                        const imgKey = key + "_" + index;
                                        return (
                                          <tr>
                                            <th scope="row">
                                              <Media className="align-items-center">
                                                <a
                                                  className="avatar rounded-circle mr-3"
                                                  href="#pablo"
                                                  onClick={(e) =>
                                                    e.preventDefault()
                                                  }
                                                >
                                                  <img
                                                    alt="..."
                                                    src={require("assets/img/theme/" +
                                                      imgKey +
                                                      ".png")}
                                                  />
                                                </a>
                                                <Media>
                                                  <span className="mb-0 text-sm">
                                                    {value}
                                                  </span>
                                                </Media>
                                              </Media>
                                            </th>
                                            <td>
                                              <Switch
                                                onChange={this.handleChange}
                                                checked={
                                                  this.state.data[checkValue]
                                                }
                                                name={checkValue}
                                              />
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </CardBody>
                              </Card>
                            </Col>
                          </>
                        ))}
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Time of the Day
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col>
                          <div
                            style={{ width: "18rem", cursor: "pointer" }}
                            onClick={() => this.toggleModal("exampleModal")}
                            id="tooltip159654437"
                          >
                            <Card className="card-stats mb-4 mb-lg-0">
                              <CardBody>
                                <Row>
                                  <div className="col">
                                    <CardTitle className="text-uppercase text-muted mb-0">
                                      {this.state.systemTime && (
                                        <h1>{this.state.systemTimeClick}</h1>
                                      )}
                                      {this.state.customeTime && (
                                        <h1>{this.state.customTimeClick}</h1>
                                      )}
                                    </CardTitle>
                                  </div>
                                  <Col className="col-auto">
                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                      <i className="far fa-clock" />
                                    </div>
                                  </Col>
                                  <UncontrolledTooltip
                                    delay={0}
                                    placement="right"
                                    target="tooltip159654437"
                                  >
                                    Set Time
                                  </UncontrolledTooltip>
                                </Row>
                              </CardBody>
                            </Card>
                          </div>
                        </Col>
                        <Col>
                          <div style={{ width: "18rem" }}>
                            <Card
                              className="card-stats mb-4 mb-lg-0"
                              onClick={generateRecommendations}
                            >
                              <CardBody>
                                <Row>
                                  <div className="col">
                                    <CardTitle className="text-uppercase text-muted mb-0">
                                      <h4>Generate Recommendations</h4>
                                    </CardTitle>
                                  </div>
                                  <Col
                                    className="col-auto"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                      <i className="fas fa-chevron-circle-right" />
                                    </div>
                                  </Col>
                                  <UncontrolledTooltip
                                    delay={0}
                                    placement="right"
                                    target="tooltip159654437"
                                  >
                                    Set Time
                                  </UncontrolledTooltip>
                                </Row>
                              </CardBody>
                            </Card>
                          </div>
                        </Col>
                        {/* <Col>
                      <Button color="default" type="button" onClick={() => this.toggleModal("exampleModal")}>
                        Set Time of the Day
                      </Button>
                      </Col> */}
                        {/* Modal */}
                        <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.exampleModal}
                          toggle={() => this.toggleModal("exampleModal")}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Time of the Day
                            </h5>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("exampleModal")}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="d-flex justify-content-between">
                              <Button
                                className="mr-4"
                                color="info"
                                href="#pablo"
                                onClick={(e) => this.handleSystemTime(e)}
                                size="lr"
                              >
                                System Time
                              </Button>
                              <Button
                                className="float-right"
                                color="default"
                                href="#pablo"
                                onClick={(e) => this.handleCustomTime(e)}
                                size="lr"
                              >
                                Custom Time
                              </Button>
                            </div>
                            <hr />
                            {this.state.systemTime && (
                              <>
                                <div className="text-center">
                                  <h1>{this.state.systemTimeClick}</h1>
                                </div>
                              </>
                            )}
                            {this.state.customeTime && (
                              <>
                                <div className="text-center">
                                  <h1>{this.state.customTimeClick}</h1>
                                  <hr />
                                  <Timekeeper
                                    onChange={(newTime) =>
                                      this.customTimeClick(newTime.formatted24)
                                    }
                                    hour24Mode={true}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          <div className="modal-footer">
                            <Button
                              color="primary"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("exampleModal")}
                            >
                              Done
                            </Button>
                          </div>
                        </Modal>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">
                      Recommendation
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col>
                          <Card
                            style={{
                              ...styles.recommendation_card_style,
                              backgroundColor: "#2dce89",
                            }}
                          >
                            <CardBody>
                              {/* {console.log(
                                "To Switch On: " + this.state.rec_off_on_arr
                              )} */}
                              <CardTitle
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                Your daily usage suggests turning ON these
                                appliances-
                              </CardTitle>
                              <CardText>
                                <Row>
                                  {this.state.rec_off_on_arr.map((app) => (
                                    <Col xs="4" style={styles.colStyle}>
                                      <Card className="card-stats mb-4 mb-lg-0">
                                        <CardBody>
                                          <CardTitle className="text-uppercase text-muted mb-0">
                                            <div className="avatar rounded-circle mr-1">
                                              <img
                                                alt="..."
                                                src={require("assets/img/theme/" +
                                                  rec_images[app] +
                                                  ".png")}
                                              />
                                            </div>
                                            <br />
                                            <b>{app}</b>
                                          </CardTitle>
                                        </CardBody>
                                      </Card>
                                    </Col>
                                  ))}
                                </Row>
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              ...styles.recommendation_card_style,
                              backgroundColor: "#F65F5F",
                            }}
                          >
                            <CardBody>
                              {/* {console.log(
                                "To Switch Off: " + this.state.rec_on_off_arr
                              )} */}
                              <CardTitle
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                Please consider turning OFF these appliances-
                              </CardTitle>
                              <CardText>
                                <Row>
                                  {this.state.rec_on_off_arr.map((app) => (
                                    <Col xs="4" style={styles.colStyle}>
                                      <Card className="card-stats mb-4 mb-lg-0 justify-content-center">
                                        <CardBody>
                                          {/* <Col xs="12"> */}
                                          <CardTitle className="text-uppercase text-muted mb-0" >
                                            <div className="avatar rounded-circle mr-1">
                                              <img
                                                alt="..."
                                                src={require("assets/img/theme/" +
                                                  rec_images[app] +
                                                  ".png")}
                                              />
                                            </div>
                                            <br />
                                            <b>{app}</b>
                                          </CardTitle>
                                        </CardBody>
                                      </Card>
                                    </Col>
                                  ))}
                                </Row>
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const styles = {
  cardStyle: {
    margin: 5,
  },
  recommendation_card_style: {
    color: "black",
    height: "auto",
    justifyContent: "center",
  },
  colStyle: {
    marginBottom: 10,
    textAlign: "center"
  },
};

export default Appliances;
