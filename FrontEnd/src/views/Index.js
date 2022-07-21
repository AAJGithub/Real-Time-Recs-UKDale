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
import Select from 'react-select';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chartDataModel: [],
      co_metrics_data: [],
      fhmm_metrics_data: [],
      CO_value: "",
      FHMM_value: "",
      GT_value: "",
      accuracy_co: '0.9842',
      accuracy_fhmm: '0.9861',
      precision_co: '0.5580',
      precision_fhmm: '0.6875',
      recall_co: '0.6100',
      recall_fhmm: '0.6369',
      f1_score_co: '0.5829',
      f1_score_fhmm: '0.6612',
      appliance_name: "Kettle",
      labels: ["2013-05-26", "2013-06-02", "2013-06-09", "2013-06-16", "2013-06-23", "2013-06-30", "2013-07-07", "2013-07-14", "2013-07-21", "2013-07-28",
      "2013-08-04"
      ,"2013-08-11"
      ,"2013-08-18"
      ,"2013-08-25"
      ,"2013-09-01"
      ,"2013-09-08"
      ,"2013-09-15"
      ,"2013-09-22"
      ,"2013-09-29"
      ,"2013-10-06"
      ,"2013-10-13"]
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentWillMount() {
    var csvFilePath = require("../data/Final_CO.csv");
    var csv_fhmm = require("../data/FHMM_metrics.csv");
    var csv_co = require("../data/CO_metrics.csv");
    
    this.executeParser(csvFilePath, this.setCSV);
    this.executeParser(csv_fhmm, this.setFHMMCSV);
    this.executeParser(csv_co, this.setCOCSV);
  }

  executeParser = (csvFilePath, setData) => {
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: setData,
    });
  }

  setFHMMCSV = (result) => {
    const data = result.data;
    this.setState({
      fhmm_metrics_data: data
    })
  };

  setCOCSV = (result) => {
    const data = result.data;
    this.setState({
      co_metrics_data: data
    })
  };

  setCSV = (result) => {
    const data = result.data;
    this.setState({
      chartDataModel: data,
      CO_value: data[6]["CO"].split(","),
      FHMM_value: data[6]["FHMM"].split(","),
      GT_value: data[6]["GT"].split(","),
    })
  };

  handleApplianceNameChange = () => {
    var applianceSelected = document.getElementById("appliances").value;
    const model = this.state.chartDataModel;
    const co_model = this.state.co_metrics_data;
    const fhmm_model = this.state.fhmm_metrics_data;

    for(let i=0; i<model.length; i++){
      if(model[i]["Appliance"] === applianceSelected){
        this.setState({
          CO_value: model[i]["CO"].split(","),
          FHMM_value: model[i]["FHMM"].split(","),
          GT_value: model[i]["GT"].split(","),
        })
      }
    }

    for(let i=0; i<co_model.length; i++){
      if(co_model[i]["Appliance"] === applianceSelected){
        this.setState({
          accuracy_co: co_model[i]["Accuracy"].slice(0,6),
          precision_co: co_model[i]["Precision"].slice(0,6),
          recall_co: co_model[i]["Recall"].slice(0,6),
          f1_score_co: co_model[i]["F1"].slice(0,6),
        });
      } 
    }
    for(let i=0; i<fhmm_model.length; i++){
      if(fhmm_model[i]["Appliance"] === applianceSelected){
        this.setState({
          accuracy_fhmm: fhmm_model[i]["Accuracy"].slice(0,6),
          precision_fhmm: fhmm_model[i]["Precision"].slice(0,6),
          recall_fhmm: fhmm_model[i]["Recall"].slice(0,6),
          f1_score_fhmm: fhmm_model[i]["F1"].slice(0,6),
        });
        break;
      }else{
        this.setState({
          accuracy_fhmm: '-',
          precision_fhmm: '-',
          recall_fhmm: '-',
          f1_score_fhmm: '-',
        })
      }
    }
    this.setState({
      appliance_name: applianceSelected
    });
  }

  handleHouseChange = () => {
    var houseSelected = document.getElementById("houses").value;
    console.log(houseSelected);
  }

  render() {
    const appliance_list = ['Kettle', 'Rice Cooker', 'Dish Washer', 'Fridge', 'Microwave', 'Cooker', 'Toaster', 'Washing Machine', 'Laptop', 'Monitor', 'Laptop2', 'Speakers', 'Server', 'Router', 'Server_hdd', 'Playstation', 'Modem', 'Running Machine']
    const house_list = ['House 1', 'House 2', 'House 5'];
    const chartData =  {
      labels: this.state.labels,
      datasets: [
      {
        label: "CO",
        data: this.state.CO_value,
        borderColor: "#5e72e4",
        borderWidth: 3,
        lineTension: 0,
      },
      {
        label: "FHMM",
        data: this.state.FHMM_value,
        borderColor: "#f4f5f7",
        borderWidth: 3,
        lineTension: 0,
      },
      {
        label: "Ground Truth",
        data: this.state.GT_value,
        borderColor: "#11cdef",
        borderWidth: 3,
        lineTension: 0,
      }
      ]
    }
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
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1.data2}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
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
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <tbody>
                    <tr>
                      <th scope="row">Minimum value</th>
                      <td>235.844</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum value</th>
                      <td>554.72</td>
                    </tr>
                    <tr>
                      <th scope="row">Average usage value</th>
                      <td>341.98</td>
                    </tr>
                    <tr>
                      <th scope="row">Total appliances</th>
                      <td>18</td>
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
                      <h2 className="text-white mb-0">Appliance Usage - Actual vs Predicted</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartData}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
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
                      <select id="appliances" name="appliances" onChange={this.handleApplianceNameChange}>
                        {appliance_list.map(fbb =>
                          <option key={fbb} value={fbb}>{fbb}</option>
                        )};
                      </select>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead>
                    <td></td>
                    <td>FHMM</td>
                    <td>CO</td>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Accuracy</th>
                      <td>{this.state.accuracy_fhmm}</td>
                      <td>{this.state.accuracy_co}</td>
                    </tr>
                    <tr>
                      <th scope="row">Precision</th>
                      <td>{this.state.precision_fhmm}</td>
                      <td>{this.state.precision_co}</td>
                    </tr>
                    <tr>
                      <th scope="row">Recall</th>
                      <td>{this.state.recall_fhmm}</td>
                      <td>{this.state.recall_co}</td>
                    </tr>
                    <tr>
                      <th scope="row">F1 Score</th>
                      <td>{this.state.f1_score_fhmm}</td>
                      <td>{this.state.f1_score_co}</td>
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

export default Index;
