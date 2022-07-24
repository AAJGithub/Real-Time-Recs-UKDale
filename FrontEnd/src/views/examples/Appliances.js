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
  Form,
  Container,
  Row,
  Col,
  Table,
  Media,
  Modal,
  UncontrolledTooltip,
  CardText,
} from "reactstrap";
// core components
import ApplianceHeader from "components/Headers/ApplianceHeader.js";
import Timekeeper from "react-timekeeper";
// import Switch from "@material-ui/core/Switch";
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import "./Switch.css";
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
};

class Appliances extends React.Component {
  state = {
    systemTime: true,
    customeTime: false,
    customeTimeData: "12:45",
    systemTimeClick: "12:45",
    checked: false,
    exampleModal: false,
    visibilityModal: false,
    notificationModal: false,
    backgroundColor: "white",
    isVoiceMode: false,
    time: "124500",
    on_appliances: [],
    hidden_appliances: [],
    rooms_data: {},
    model: null,
    rec_model: {},
    rec_model_loaded: false,
    rec_on_off_arr: [],
    rec_off_on_arr: [],
    house_key: "House 2",
    supported: true,
    lang: "en-US",
    text:
      "How many Emo kids does it take to screw in a lightbulb?\nNone, they all sit in the dark and cry",
    voice: "a",
    autoPlay: false,
    isSpeeking: false,
    isListening: false,
    Microwave: false,
    house_list: [],
    appl_energy: {},
    regular_energy: 0,
    saved_energy: 0,
    current_energy: 0,
    modalColor: "info",
  };

  componentWillMount() {
    this.setDefaultTime();

    let hidden_apps = JSON.parse(localStorage.getItem("hidden_appliances"));
    let isVoiceMode = JSON.parse(localStorage.getItem("isVoiceMode"));
    let house_key = localStorage.getItem("house_key");
    let house_list = localStorage.getItem("house_list").split(",");

    if (hidden_apps === null) {
      this.setState({ hidden_appliances: [] });
    } else {
      this.setState({ hidden_appliances: hidden_apps });
    }

    this.state.house_list = house_list;
    if (house_key !== null) {
      this.state.house_key = house_key;
    }
    // console.log("house_key:", house_key);
    this.state.isVoiceMode = isVoiceMode;
    this.handleHouseKeyChange();

    if ("speechSynthesis" in window) {
      this._speech = new SpeechSynthesisUtterance();
      this._speech.onend = () => this.setState({ isSpeeking: false });
    } else {
      this.setState({ supported: false });
    }
  }

  handleHouseKeyChange = () => {
    this.load_rooms_from_csv();
    this.load_recs_from_csv();
  };

  load_rooms_from_csv = () => {
    var csvFilePath = require("../../data/" +
      this.state.house_key +
      "/Devices.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.save_rooms_from_csv,
    });
  };

  save_rooms_from_csv = (result) => {
    const data = result.data;

    const local_rooms = {};

    for (let row of data) {
      let room = row.Room;
      let devices = row.Devices.split(",");
      local_rooms[room] = devices;
    }
    this.setState({ rooms_data: local_rooms });
    // console.log("Saving room data in state:");
    // console.log(this.state.rooms_data);
  };

  load_recs_from_csv = () => {
    var csvFilePath = require("../../data/" +
      this.state.house_key +
      "/Recommendations.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.save_recs_from_csv,
    });
  };

  save_recs_from_csv = (result) => {
    const data = result.data;
    // console.log(data);

    const local_recs = {};

    for (let row of data) {
      let time = parseInt(row.Time.replace(/:/g, ""));
      let recsArr = row.Recommendations.split(",");
      local_recs[time] = recsArr;
    }

    this.setState({ rec_model: local_recs });

    // console.log("Saving rec model in state:");
    // console.log(this.state.rec_model);
  };

  parseData = (url, callBack, timeKey) => {
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(url, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function (results) {
        callBack(timeKey, results);
      },
    });
  };

  load_appl_energy_from_csv = (timeKey) => {
    // console.log("TimeKey: " + timeKey);
    var csvFilePath = require("../../data/" +
      this.state.house_key +
      "/Time_CSV/Time_" +
      +timeKey +
      ".csv");
    this.parseData(csvFilePath, this.save_appl_energy_from_csv, timeKey);
  };

  save_appl_energy_from_csv = (timeKey, result) => {
    const data = result.data;
    // console.log(data);

    const local_energy = {};

    for (let row of data) {
      let value = parseFloat(row.Average);
      local_energy[row.Appliance] = value;
    }

    this.setState({ appl_energy: local_energy });

    // console.log("Saving local appliance energies in state:");
    // console.log(this.state.appl_energy);

    this.fetch_recommendations(timeKey);
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
    localStorage.setItem("time", strTime);
  };

  customTimeClick = (time) => {
    this.setState({
      customTimeClick: time,
    });
    localStorage.setItem("time", time);
  };

  handleChange = (event) => {
    if (event.target.checked === true) {
      event.target.labels[0].style = "background: #06D6A0";
      let on = this.state.on_appliances;
      on.push(event.target.name);
      this.setState({
        on_appliances: on,
      });
    } else {
      event.target.labels[0].style = "background: #A9A9A9";
      let on = this.state.on_appliances;
      let index = on.indexOf(event.target.name);
      on.splice(index, 1);
      this.setState({
        on_appliances: on,
      });
    }
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
    if (!this.state.notificationModal) {
      setTimeout(function () {
        var canvasConfetti = require("canvas-confetti");
        var myCanvas = document.createElement("canvas");
        myCanvas.style.zIndex = 1;
        myCanvas.style.position = "absolute";
        myCanvas.width = 500;
        myCanvas.height = 500;
        var modal = document.getElementById("notificationmodal");
        if (modal) {
          modal.prepend(myCanvas);
          var myConfetti = canvasConfetti.create(myCanvas, {
            resize: true,
            useWorker: true,
          });
          myConfetti({
            particleCount: 100,
            spread: 100,
            // shapes: ["circle", "square"],
            // colors: ['#ffff00']
            // origin: { x: 0.75,y:0.75 }
          });
        }
      }, 100);
    }
  };

  handleVisibilityChange = (event, value) => {
    let hide = this.state.hidden_appliances;
    let index = hide.indexOf(event.target.id);
    if (index > -1) {
      // console.log(event.target.id + " visible");
      hide.splice(index, 1);
    } else {
      // console.log(event.target.id + " hidden");
      hide.push(event.target.id);
    }
    this.setState({
      hidden_appliances: hide,
    });
  };

  fetch_recommendations = async (timeKey) => {
    // console.log("From fetch_recommendations");

    //get appropriate time key to look into saved recommendation model

    let appls = this.state.rec_model[timeKey];

    // console.log("Recommendations: " + appls);
    // console.log("On appls: ", this.state.on_appliances);
    // console.log("Hidden appls: ", this.state.hidden_appliances);

    //logic to check which devices should be on and off
    let to_off = [];
    let to_on = [];

    //logic to check devices to be switched off
    for (let app of this.state.on_appliances) {
      if (!appls.includes(app)) {
        to_off.push(app);
      }
    }
    // console.log("to_off: ", to_off);
    let visibleDevices_toOff = to_off.filter(
      (x) => !this.state.hidden_appliances.includes(x)
    );
    this.setState({
      rec_on_off_arr: visibleDevices_toOff,
    });

    //logic to check devices to be switched on
    for (let room of Object.keys(this.state.rooms_data)) {
      for (let app of this.state.rooms_data[room]) {
        if (appls.includes(app) && !this.state.on_appliances.includes(app)) {
          to_on.push(app);
        }
      }
    }
    // console.log("to_on: ", to_on);
    let visibleDevices_toOn = to_on.filter(
      (x) => !this.state.hidden_appliances.includes(x)
    );
    this.setState({
      rec_off_on_arr: visibleDevices_toOn,
    });

    // console.log("Should be ON, but OFF: " + this.state.rec_on_off_arr);
    console.log("Should be ON, but OFF: " + visibleDevices_toOn);
    // console.log("Should be OFF, but ON: " + this.state.rec_off_on_arr);
    console.log("Should be OFF, but ON: " + visibleDevices_toOff);
    // console.log(to_on.toString());

    // code for energy save card
    let reg_energy = 0;
    let to_on_energy = 0;
    let to_off_energy = 0;
    let curr_energy = 0;

    for (let app of Object.keys(this.state.appl_energy)) {
      if (appls.includes(app)) {
        reg_energy += this.state.appl_energy[app];
      }
      if (to_on.includes(app)) {
        to_on_energy += this.state.appl_energy[app];
      }
      if (to_off.includes(app)) {
        to_off_energy += this.state.appl_energy[app];
      }
      if (this.state.on_appliances.includes(app)) {
        curr_energy += this.state.appl_energy[app];
      }
    }

    let to_save_energy = to_off_energy - to_on_energy;

    this.setState({
      regular_energy: reg_energy.toFixed(2),
      saved_energy: to_save_energy.toFixed(2),
      current_energy: curr_energy.toFixed(2),
    });

    // console.log("Regular energy usage: " + reg_energy.toFixed(2));
    // console.log("To On energy usage: " + to_on_energy.toFixed(2));
    // console.log("To Off energy usage: " + to_off_energy.toFixed(2));
    // console.log("To Save energy usage: " + to_save_energy.toFixed(2));
    // console.log("State regular energy usage: " + this.state.regular_energy);
    // console.log("State Saved energy usage: " + this.state.saved_energy);

    //code for voice mode
    if (this.state.isVoiceMode) {
      const speech_turnOn =
        visibleDevices_toOn.length > 0
          ? "Your daily usage suggests turning ON these appliances: " +
            visibleDevices_toOn.toString().replace("_", "")
          : "";
      const speech_turnOff =
        visibleDevices_toOff.length > 0
          ? "Please consider turning OFF these appliances: " +
            visibleDevices_toOff.toString().replace("_", "")
          : "";
      const final_string = speech_turnOn + ". " + speech_turnOff;

      this._speech.text = final_string;
      this._speech.lang = this.state.lang;
      this.setState({ isSpeeking: true });
      window.speechSynthesis.speak(this._speech);
    }
  };

  handleVoiceToggle = (event) => {
    this.setState({ isVoiceMode: event.target.checked });
    localStorage.setItem("isVoiceMode", event.target.checked);
  };

  handleHouseListChange = () => {
    var houseSelected = document.getElementById("houses").value;
    this.state.house_key = houseSelected;
    this.state.hidden_appliances = [];
    localStorage.setItem("house_key", houseSelected);
    localStorage.setItem("hidden_appliances", null);
    this.handleHouseKeyChange();
  };

  getTranscipt = () => {
    let appliance_list = [];
    for (let room of Object.keys(this.state.rooms_data)) {
      for (let app of this.state.rooms_data[room]) {
        appliance_list.push(app);
      }
    }
    this.props.resetTranscript();
    SpeechRecognition.stopListening();
    const toTitleCase = (phrase) => {
      return phrase
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    var outputText = toTitleCase(document.getElementById("output").textContent);
    var appliance_name = "";
    if (outputText.indexOf("Stop") !== -1)
      appliance_name = outputText.substr(outputText.indexOf(" ") + 1);

    if (
      appliance_list.includes(appliance_name) &&
      outputText.indexOf("Stop") !== -1
    ) {
      var applianceSwitch = document.getElementsByName(appliance_name)[0];
      applianceSwitch.removeAttribute("checked");
      applianceSwitch.labels[0].style = "background: #A9A9A9";
      let on = this.state.on_appliances;
      let index = on.indexOf(appliance_name);
      on.splice(index, 1);
      this.setState({
        on_appliances: on,
      });
    } else if (
      appliance_list.includes(outputText) &&
      outputText.indexOf("Stop") === -1
    ) {
      var applianceSwitch = document.getElementsByName(outputText)[0];
      applianceSwitch.setAttribute("checked", true);
      applianceSwitch.labels[0].style = "background: #06D6A0";

      let on = this.state.on_appliances;
      on.push(outputText);
      this.setState({
        on_appliances: on,
      });
    }
    if (outputText === "Get Recommendations") {
      document.getElementById("output").style.visibility = "hidden";
      this.generateRecommendations();
    }
  };
  playSource() {
    var audio = document.getElementById("audio");
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          // Automatic playback started!
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleListen = () => {
    if (this.state.isListening) {
      this.playSource();
      this.props.startListening();
      document.getElementById("output").style.visibility = "visible";
    } else {
      this.getTranscipt();
    }
  };

  generateRecommendations = () => {
    var time = this.state.systemTime
      ? this.state.systemTimeClick
      : this.state.customTimeClick;
    time = time.replace(/:/g, "");
    time = time.replace(" AM", "");
    time = time.replace(" PM", "");
    time = time + "00";
    this.state.time = time;
    localStorage.setItem(
      "hidden_appliances",
      JSON.stringify(this.state.hidden_appliances)
    );
    // console.log("Get recommendations");
    var timeKey = parseInt(this.state.time);
    if (timeKey > 233000) timeKey = parseInt("000000");
    else {
      let mins = timeKey % 10000;
      timeKey -= mins;

      let to_add = 3000;
      // if (mins > 3000) to_add = 3000;
      if (mins < 3000) to_add = 0;

      timeKey += to_add;
    }
    this.load_appl_energy_from_csv(timeKey);
  };

  toggleListening = () => {
    this.setState(
      {
        isListening: !this.state.isListening,
      },
      this.handleListen
    );
  };

  render() {
    if (!this.props.browserSupportsSpeechRecognition) {
      return null;
    }
    return (
      <>
        {/* <Header /> */}
        <ApplianceHeader
          time={
            this.state.systemTime
              ? this.state.systemTimeClick
              : this.state.customTimeClick
          }
        />

        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          size={"lg"}
          isOpen={this.state.visibilityModal}
          toggle={() => this.toggleModal("visibilityModal")}
        >
          <div className="modal-header">
            <h1 className="modal-title" id="visibilityModalLabel">
              <span className="btn-inner--icon">
                <i className="ni ni-settings" />
              </span>
              &nbsp;Appliance Preferences
            </h1>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("visibilityModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <h4>
              Select appliances for which you do not want to recieve any
              recommendations.
            </h4>
            <br></br>
            <div>
              {Object.keys(this.state.rooms_data).map((key, index) => (
                <>
                  <h3>{key}</h3>
                  <Row>
                    {this.state.rooms_data[key].map((value, index) => {
                      return (
                        <Col xs="4">
                          <Button
                            className="btn-icon btn-2 mb-3"
                            outline
                            color="secondary"
                            type="button"
                            name={value}
                            id={value}
                            onClick={this.handleVisibilityChange}
                            style={
                              this.state.hidden_appliances &&
                              this.state.hidden_appliances.includes(value)
                                ? styles.selectedButtonStyle
                                : styles.normalButtonStyle
                            }
                          >
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                style={{ width: "2rem", height: "2rem" }}
                              >
                                <img
                                  alt="..."
                                  id={value}
                                  src={require("assets/img/theme/" +
                                    value +
                                    ".png")}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm" id={value}>
                                  {value}
                                </span>
                              </Media>
                            </Media>
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
                  <br />
                  {/* <hr/> */}
                </>
              ))}
            </div>
            <Row className="justify-content-md-center">
              <Col xs="2">
                <h3>Voice Mode</h3>
              </Col>
              <Col>
                <label
                  className="custom-toggle"
                  onChange={this.handleVoiceToggle}
                >
                  <input type="checkbox" checked={this.state.isVoiceMode} />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
              </Col>
            </Row>
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("visibilityModal")}
            >
              Done
            </Button>
          </div>
        </Modal>

        {/* Page content */}
        <Container className="mt--7 output" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="10">
                      <Row>
                        <Col xs="2">
                          <h2 className="mb-0">Select a House: </h2>
                        </Col>
                        <Col xs="2">
                          <select
                            id="houses"
                            name="houses"
                            onChange={this.handleHouseListChange}
                            value={this.state.house_key}
                            style={styles.select}
                          >
                            {this.state.house_list &&
                              this.state.house_list.map((fbb) => (
                                <option key={fbb} value={fbb}>
                                  {fbb}
                                </option>
                              ))}
                            ;
                          </select>
                        </Col>
                        <Button
                          className="btn-icon btn-2"
                          color="secondary"
                          type="button"
                          onClick={() => this.toggleModal("visibilityModal")}
                          id="tooltip74"
                        >
                          <span className="btn-inner--icon">
                            <i className="ni ni-settings" />
                          </span>
                        </Button>
                      </Row>
                    </Col>
                    {this.state.isVoiceMode && (
                      <Col>
                        <Row className="align-items-center">
                          <Col lg="8">
                            <div>
                              <h2 id="output">{this.props.transcript}</h2>
                            </div>
                          </Col>
                          <Col lg="2">
                            <div
                              className="icon icon-shape bg-danger text-white rounded-circle shadow"
                              onClick={this.toggleListening}
                              style={{ cursor: "pointer" }}
                              id="tooltip14"
                            >
                              {this.state.isListening ? (
                                <i className="fas fa-microphone-alt" />
                              ) : (
                                <i className="fas fa-microphone-alt-slash" />
                              )}
                            </div>
                          </Col>
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target="tooltip14"
                          >
                            Click and speak on beep. Click again when done!
                          </UncontrolledTooltip>
                          <audio
                            id="audio"
                            src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
                          ></audio>
                        </Row>
                        {/* <div>
                        <button onClick={this.props.startListening}>Start</button>
                        <p id="output">{this.props.transcript}</p>
                        <button onClick={() => {getTranscipt(); }}>Stop</button>
                      </div> */}
                      </Col>
                    )}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        {Object.keys(this.state.rooms_data).map(
                          (key, index) => (
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
                                          {this.state.rooms_data[key].length}{" "}
                                          appliances
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
                                        {this.state.rooms_data[key].map(
                                          (value, index) => {
                                            return (
                                              <tr>
                                                <th scope="row">
                                                  <Media className="align-items-center">
                                                    <a className="avatar rounded-circle mr-3">
                                                      <img
                                                        alt="..."
                                                        src={require("assets/img/theme/" +
                                                          value +
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
                                                  <>
                                                    <input
                                                      id={value}
                                                      name={value}
                                                      onChange={
                                                        this.handleChange
                                                      }
                                                      className="react-switch-checkbox"
                                                      type="checkbox"
                                                    />
                                                    <label
                                                      className="react-switch-label"
                                                      htmlFor={value}
                                                    >
                                                      <span
                                                        className={`react-switch-button`}
                                                      />
                                                    </label>
                                                  </>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </Table>
                                  </CardBody>
                                </Card>
                              </Col>
                            </>
                          )
                        )}
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
                              onClick={this.generateRecommendations}
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
                        <Col>
                          <div style={{ width: "18rem" }}>
                            <Card
                              className="card-stats mb-4 mb-lg-0"
                              onClick={() =>
                                this.toggleModal("notificationModal")
                              }
                            >
                              <CardBody>
                                <Row>
                                  <div
                                    className="col"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <CardTitle className="text-uppercase text-muted mt-2">
                                      <h2>Energy Usage</h2>
                                    </CardTitle>
                                  </div>
                                  <Col
                                    className="col-auto"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                      {/* <i className="fas fa-chevron-circle-right" /> */}
                                      <i className="far fa-lightbulb" />
                                    </div>
                                  </Col>
                                  {/* <UncontrolledTooltip
                                    delay={0}
                                    placement="right"
                                    target="tooltip159654437"
                                  >
                                    Set Time
                                  </UncontrolledTooltip> */}
                                </Row>
                              </CardBody>
                            </Card>
                          </div>
                        </Col>
                        {/* <Col md="4"> */}
                        {/* <Button
                            block
                            className="mb-3"
                            color="success"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal")}
                          > */}
                        {/* <Col className="col-auto" style={{ cursor: "pointer" }}>
                          <div
                            className="text-yellow"
                            onClick={() =>
                              this.toggleModal("notificationModal")
                            }
                          >
                            <i className="far fa-lightbulb fa-5x" />
                          </div>
                        </Col> */}
                        {/* Notification
                          </Button> */}
                        <Modal
                          className={
                            "modal-dialog-centered modal-" +
                            this.state.modalColor
                          }
                          contentClassName={
                            "bg-gradient-" + this.state.modalColor
                          }
                          isOpen={this.state.notificationModal}
                          toggle={() => this.toggleModal("notificationModal")}
                        >
                          <div className="modal-header">
                            {this.state.hidden_appliances.length > 0 ? (
                              <h6
                                className="modal-title"
                                id="modal-title-notification"
                              >
                                *Hidden appliances considered
                              </h6>
                            ) : (
                              <></>
                            )}
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() =>
                                this.toggleModal("notificationModal")
                              }
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body" id="notificationmodal">
                            <div className="py-3 text-center">
                              <i className="far fa-lightbulb fa-5x text-yellow" />
                              <h4 className="heading mt-4 text-yellow">
                                <b>Energy Usage</b>
                              </h4>
                              <h2 className="text-white">
                                Regular energy usage:{" "}
                                {this.state.regular_energy} energy units
                              </h2>
                              <h2 className="text-white">
                                Current energy usage:{" "}
                                {this.state.current_energy} energy units
                              </h2>
                              <p>
                                {this.state.saved_energy == 0 ? (
                                  <h1 className="text-yellow">
                                    You are at your ideal energy consumption!
                                  </h1>
                                ) : this.state.saved_energy > 0 ? (
                                  <h1 className="text-yellow">
                                    Great! You can save{" "}
                                    {this.state.saved_energy} energy units!
                                  </h1>
                                ) : (
                                  <h1 className="text-yellow">
                                    Great! You are already saving{" "}
                                    {this.state.saved_energy * -1} energy units!
                                  </h1>
                                )}
                              </p>
                            </div>
                          </div>
                        </Modal>
                        {/* </Col> */}
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
                                                  app +
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
                                          <CardTitle className="text-uppercase text-muted mb-0">
                                            <div className="avatar rounded-circle mr-1">
                                              <img
                                                alt="..."
                                                src={require("assets/img/theme/" +
                                                  app +
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
    textAlign: "center",
  },
  selectedButtonStyle: {
    backgroundColor: "#CEFFFF",
    // width: "13.5rem",
  },
  normalButtonStyle: {
    backgroundColor: "white",
    justifyContent: "center",
    // width: "13.5rem",
  },
  select: {
    height: 40,
    width: 100,
    backgroundColor: "white",
  },
};
Appliances.propTypes = propTypes;

export default SpeechRecognition(Appliances);
