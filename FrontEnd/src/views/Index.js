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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Select from "react-select";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample1 } from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartDataModel: [],
      co_metrics_data: [],
      fhmm_metrics_data: [],
      xgboost_metrics_data: [],
      CO_value: "",
      FHMM_value: "",
      GT_value: "",
      XGBoost_value: "",
      accuracy_co: "",
      accuracy_fhmm: "",
      accuracy_xgboost: "",
      precision_co: "",
      precision_fhmm: "",
      precision_xgboost: "",
      recall_co: "",
      recall_fhmm: "",
      recall_xgboost: "",
      f1_score_co: "",
      f1_score_fhmm: "",
      f1_score_xgboost: "",
      appliance_name: "Laptop",
      house_list: ["House 2", "House 3", "House 4"],
      // labels: [
      //   "2013-05-26",
      //   "2013-06-02",
      //   "2013-06-09",
      //   "2013-06-16",
      //   "2013-06-23",
      //   "2013-06-30",
      //   "2013-07-07",
      //   "2013-07-14",
      //   "2013-07-21",
      //   "2013-07-28",
      //   "2013-08-04",
      //   "2013-08-11",
      //   "2013-08-18",
      //   "2013-08-25",
      //   "2013-09-01",
      //   "2013-09-08",
      //   "2013-09-15",
      //   "2013-09-22",
      //   "2013-09-29",
      //   "2013-10-06",
      //   "2013-10-13",
      // ],
      house_key: "House 2",
      appliance_list: [],
      aggregate_power: [], //Values for first grpah
      aggregate_timeline: [], //Values for first graph timeline
      appliance_timeline: [], //Values for second graph timeline
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentWillMount() {
    let house_key = localStorage.getItem("house_key");
    if (house_key !== null) {
      this.state.house_key = house_key;
    }
    this.handleHouseKeyChange();
  }

  handleHouseKeyChange = () => {
    var csvFilePath = require("../data/" +
      this.state.house_key +
      "/Appliance_data.csv");
    var csv_fhmm = require("../data/" +
      this.state.house_key +
      "/FHMM_metrics.csv");
    var csv_co = require("../data/" + this.state.house_key + "/CO_metrics.csv");
    var csv_xgboost = require("../data/" + this.state.house_key + "/XGBoost_metrics.csv");
    var csv_index = require("../data/" + this.state.house_key + "/Index.csv");
    this.executeParser(csvFilePath, this.setCSV);
    this.executeParser(csv_fhmm, this.setFHMMCSV);
    this.executeParser(csv_co, this.setCOCSV);
    this.executeParser(csv_xgboost, this.setXGBoostCSV);
    this.executeParser(csv_index, this.setINDEXCSV);
  };
  executeParser = (csvFilePath, setData) => {
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: setData,
    });
  };

  setXGBoostCSV = (result) => {
    const data = result.data;
    this.setState({
      xgboost_metrics_data: data,
    });
    this.setValuesForAppliance();
  };

  setFHMMCSV = (result) => {
    const data = result.data;
    this.setState({
      fhmm_metrics_data: data,
    });
  };

  setINDEXCSV = (result) => {
    const data = result.data;
    let power_timeline = [];
    let power_values = [];
    let appliance_timeline = [];
    for (let row of data) {
      power_timeline = row.Power_timeline.split(",");
      power_values = row.Power_values.split(",");
      appliance_timeline = row.Appliance_timeline.split(",");
    }
    this.setState({
      aggregate_timeline: power_timeline,
      aggregate_power: power_values,
      appliance_timeline,
    });
  };

  setCOCSV = (result) => {
    const data = result.data;
    this.setState({
      co_metrics_data: data,
    });
    this.setValuesForAppliance();
  };

  setCSV = (result) => {
    const data = result.data;
    let appliances = [];
    for (let row of data) {
      appliances.push(row.Appliance);
    }
    this.setState({
      appliance_list: appliances,
      // appliance_name: appliances[0],
      chartDataModel: data,
    });
    // localStorage.setItem("appliance_list", appliances);
    this.state.appliance_name = appliances[0];
    console.log("setCSVappliance_name:", this.state.appliance_name);
  };

  handleHouseListChange = () => {
    var houseSelected = document.getElementById("houses").value;
    this.state.house_key = houseSelected;
    localStorage.setItem("house_key", houseSelected);
    console.log(
      "handleHouseListChange:",
      houseSelected,
      "house_key: ",
      this.state.house_key
    );
    this.handleHouseKeyChange();
  };

  setValuesForAppliance = () => {
    const applianceSelected = this.state.appliance_name;
    // set accurancy, precision, recall, f1 for both FHMM & CO
    // set CO_ARR, FHMM_ARR, GroundThruth_ARR
    const model = this.state.chartDataModel;
    const co_model = this.state.co_metrics_data;
    const fhmm_model = this.state.fhmm_metrics_data;
    const xgboost_model = this.state.xgboost_metrics_data;
    let index = this.state.appliance_list.indexOf(applianceSelected);
    console.log("index:");
    console.log(index);
    if(index > -1){
      if(model.length > 0) {
        this.setState({
          CO_value: model[index]["CO"].split(","),
          FHMM_value: model[index]["FHMM"].split(","),
          GT_value: model[index]["GT"].split(","),
          XGBoost_value: model[index]["XGBOOST"].split(","),
        });
      }
      if(co_model.length > 0) {
        this.setState({
          accuracy_co: co_model[index]["Accuracy"].slice(0, 6),
          precision_co: co_model[index]["Precision"].slice(0, 6),
          recall_co: co_model[index]["Recall"].slice(0, 6),
          f1_score_co: co_model[index]["F1"].slice(0, 6),
        });
      }
      if(fhmm_model.length > 0) {
        this.setState({
          accuracy_fhmm: fhmm_model[index]["Accuracy"].slice(0, 6),
          precision_fhmm: fhmm_model[index]["Precision"].slice(0, 6),
          recall_fhmm: fhmm_model[index]["Recall"].slice(0, 6),
          f1_score_fhmm: fhmm_model[index]["F1"].slice(0, 6),
      });
      if(xgboost_model.length > 0) {
        this.setState({
          accuracy_xgboost: xgboost_model[index]["Accuracy"].slice(0, 6),
          precision_xgboost: xgboost_model[index]["Precision"].slice(0, 6),
          recall_xgboost: xgboost_model[index]["Recall"].slice(0, 6),
          f1_score_xgboost: xgboost_model[index]["F1"].slice(0, 6),
        });
      }
    }
  }
    // for (let i = 0; i < model.length; i++) {
    //   if (model[i]["Appliance"] === applianceSelected) {
    //     this.setState({
    //       CO_value: model[i]["CO"].split(","),
    //       FHMM_value: model[i]["FHMM"].split(","),
    //       GT_value: model[i]["GT"].split(","),
    //     });
    //   }
    // }

    // console.log("object: ", this.state.house_key);
    // for (let i = 0; i < co_model.length; i++) {
    //   if (co_model[i]["Appliance"] === applianceSelected) {
    //     this.setState({
    //       accuracy_co: co_model[i]["Accuracy"].slice(0, 6),
    //       precision_co: co_model[i]["Precision"].slice(0, 6),
    //       recall_co: co_model[i]["Recall"].slice(0, 6),
    //       f1_score_co: co_model[i]["F1"].slice(0, 6),
    //     });
    //   }
    // }
    // for (let i = 0; i < fhmm_model.length; i++) {
    //   if (fhmm_model[i]["Appliance"] === applianceSelected) {
    //     this.setState({
    //       accuracy_fhmm: fhmm_model[i]["Accuracy"].slice(0, 6),
    //       precision_fhmm: fhmm_model[i]["Precision"].slice(0, 6),
    //       recall_fhmm: fhmm_model[i]["Recall"].slice(0, 6),
    //       f1_score_fhmm: fhmm_model[i]["F1"].slice(0, 6),
    //     });
    //     break;
    //   } else {
    //     this.setState({
    //       accuracy_fhmm: "-",
    //       precision_fhmm: "-",
    //       recall_fhmm: "-",
    //       f1_score_fhmm: "-",
    //     });
    //   }
    // }
  };

  handleApplianceNameChange = () => {
    var applianceSelected = document.getElementById("appliances").value;
    this.state.appliance_name = applianceSelected;
    this.setValuesForAppliance();
  };

  render() {
    localStorage.setItem("house_list", this.state.house_list);
    // const appliance_list = [
    //   "Kettle",
    //   "Rice Cooker",
    //   "Dish Washer",
    //   "Fridge",
    //   "Microwave",
    //   "Cooker",
    //   "Toaster",
    //   "Washing Machine",
    //   "Laptop",
    //   "Monitor",
    //   "Laptop2",
    //   "Speakers",
    //   "Server",
    //   "Router",
    //   "Server_hdd",
    //   "Playstation",
    //   "Modem",
    //   "Running Machine",
    // ];
    const chartData = {
      labels: this.state.appliance_timeline,
      datasets: [
        {
          label: "CO",
          data: this.state.CO_value,
          borderColor: "#FF6347",
          borderWidth: 3,
          lineTension: 0,
        },
        {
          label: "FHMM",
          data: this.state.FHMM_value,
          borderColor: "#FFCC11",
          borderWidth: 3,
          lineTension: 0,
        },
        {
          label: "XGBoost",
          data: this.state.XGBoost_value,
          borderColor: "#11cdef",
          borderWidth: 3,
          lineTension: 0,
        },
        {
          label: "Ground Truth",
          data: this.state.GT_value,
          borderColor: "#f4f5f7",
          borderWidth: 3,
          lineTension: 0,
        },
      ],
    };
    const chart2Data = {
      // labels: [
      // "Feb '13",
      // "Mar '13",
      // "Apr '13",
      // "May '13",
      // "Jun '13",
      // "Jul '13",
      // "Aug '13",
      // "Sep '13",
      // "Oct '13",
      // ],
      labels: this.state.aggregate_timeline,
      datasets: [
        {
          label: "Power",
          // data: [
          // 554.72,
          // 396.07,
          // 343.71,
          // 353.85,
          // 285.95,
          // 300.48,
          // 235.84,
          // 323.84,
          // 283.43,
          // ],
          data: this.state.aggregate_power,
          borderColor: "#5E72E4",
          borderWidth: 3,
          lineTension: 0,
        },
      ],
    };

    const getAveragePower = () => {
      if (this.state.aggregate_power.length > 0) {
        const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        return arrAvg(this.state.aggregate_power.map(Number)).toFixed(2);
      }
    };
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Energy used over time</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chart2Data}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <Col>
                      <div className="col">
                        <h2 className="mb-0">House Energy Usage</h2>
                      </div>
                    </Col>
                    <div className="col">
                      <select
                        id="houses"
                        name="houses"
                        onChange={this.handleHouseListChange}
                        value={this.state.house_key}
                        style={styles.select}
                      >
                        {this.state.house_list.map((fbb) => (
                          <option key={fbb} value={fbb}>
                            {fbb}
                          </option>
                        ))}
                        ;
                      </select>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <tbody>
                    <tr>
                      <th scope="row">Minimum usage value</th>
                      <td>{Math.min(...this.state.aggregate_power)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum usage value</th>
                      <td>{Math.max(...this.state.aggregate_power)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Average usage value</th>
                      <td>{getAveragePower()}</td>
                    </tr>
                    <tr>
                      <th scope="row">Power consumed by</th>
                      <td>{this.state.appliance_list.length} appliances</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">
                        Appliance Usage - Actual vs Predicted
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartData}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Appliance Name: </h3>
                    </Col>
                    <div className="col">
                      <select
                        id="appliances"
                        name="appliances"
                        onChange={this.handleApplianceNameChange}
                        value={this.state.appliance_name}
                        style={styles.select}
                      >
                        {this.state.appliance_list.map((fbb) => (
                          <option key={fbb} value={fbb}>
                            {fbb}
                          </option>
                        ))}
                        ;
                      </select>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead>
                    <td></td>
                    <td>FHMM</td>
                    <td>CO</td>
                    <td>XGBOOST</td>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Accuracy</th>
                      <td>{this.state.accuracy_fhmm}</td>
                      <td>{this.state.accuracy_co}</td>
                      <td>{this.state.accuracy_xgboost}</td>
                    </tr>
                    <tr>
                      <th scope="row">Precision</th>
                      <td>{this.state.precision_fhmm}</td>
                      <td>{this.state.precision_co}</td>
                      <td>{this.state.precision_xgboost}</td>
                    </tr>
                    <tr>
                      <th scope="row">Recall</th>
                      <td>{this.state.recall_fhmm}</td>
                      <td>{this.state.recall_co}</td>
                      <td>{this.state.recall_xgboost}</td>
                    </tr>
                    <tr>
                      <th scope="row">F1 Score</th>
                      <td>{this.state.f1_score_fhmm}</td>
                      <td>{this.state.f1_score_co}</td>
                      <td>{this.state.f1_score_xgboost}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const styles  = {
  select: {
    height: 40,
    width: "auto",
    backgroundColor: "white"
  },
}
export default Index;
