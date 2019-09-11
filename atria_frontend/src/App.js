import React, { Component } from 'react';
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showtableComponent: false,
      showchartComponent: false,
      options : {},
      sensorData: []
    };
    this._ontableButtonClick = this._ontableButtonClick.bind(this);
    this._onchartButtonClick = this._onchartButtonClick.bind(this);
  }
  
  componentDidMount(){
    // For initial data
    this.fetchData();
  }
  
  fetchData = () => {
    fetch("http://localhost:8000/sensor/add/?startDate=2019-01-11&endDate=2019-09-11", {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
    .then((resp) => {
      return resp.json()
    }) 
    .then((data) => {
      console.log(data)
      this.setState({ sensorData: data})  
      console.log(this.state.sensorData)                  
    })
    .catch((error) => {
      console.log(error, "catch the hoop")
    })
  }  
  _ontableButtonClick() {
    this.setState({
      showtableComponent: true,
      showchartComponent:false
    });
  }
  _onchartButtonClick() {
    this.fethChartData();
    this.setState({
      showtableComponent: false,
      showchartComponent:true
    });
  }
  fethChartData= ()=>{
    fetch("http://localhost:8000/sensor/chart/?startDate=2019-01-11&endDate=2019-09-11", {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
    .then((resp) => {
      return resp.json()
    }) 
    .then((data) => {
      console.log(data)
      let _data = {
        chart: {
          type: 'spline'
        },
        xAxis: {
        categories: data.categories
       },
        series: data.series
      }
      this.setState({ options: _data})  
      console.log(this.state.options)                  
    })
    .catch((error) => {
      console.log(error, "catch the hoop")
    })
  }  
  renderTableData() {
    return this.state.sensorData.map((sensorData, index) => {
       const { id, sensor_type, reading, created_at} = sensorData //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{sensor_type}</td>
             <td>{reading}</td>
             <td>{created_at}</td>
          </tr>
       )
    })
 }
 renderTableHeader() {
  let header = Object.keys(this.state.sensorData[0])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}
  render() {
    if (!this.state.showtableComponent && !this.state.showchartComponent){
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://atria.edu/assets/images/logo-atria.png" alt="logo" />
          <h2>Welcome to Atria</h2>
        </div>
        <p className="App-intro">
          Click Below options
        </p>
        <div>
         <button onClick={this._ontableButtonClick}>Show Table</button>
         <button onClick={this._onchartButtonClick}>Show Chart</button>
         </div>
      </div>
        
    );
    }
      if (this.state.showtableComponent){
      return (
        <div className="App">
          <div className="App-header">
            <img src="http://atria.edu/assets/images/logo-atria.png" alt="logo" />
            <h2>Welcome to Atria</h2>
          </div>
          <p className="App-intro">
            Click Below options
          </p>
          <button onClick={this._onchartButtonClick}>Show Chart</button>
          <div>
            <h1>Sensor Data</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
        </div>
          
      );
    }
    if(this.state.showchartComponent){
      return(
        <div className="App">
          <div className="App-header">
            <img src="http://atria.edu/assets/images/logo-atria.png" alt="logo" />
            <h2>Welcome to Atria</h2>
          </div>
          <p className="App-intro">
            Click Below options
          </p>
          <button onClick={this._ontableButtonClick}>Show table</button>
            <h1>Sensor Data Chart</h1>
        <div>
          <HighchartsReact highcharts={Highcharts} options={this.state.options} />
      </div></div>
      );
    }
  }
}

export default App;
