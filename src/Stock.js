import React from 'react';
import Plot from 'react-plotly.js';
class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      stockSymbol: 'AMZN',
    };
  }
  componentDidMount() {
    this.fetchStock();
  }
  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = process.env.REACT_API;
    let StockSymbol = 'AMZN';
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data['Time Series (Daily)'][key]['1. open']
          );
        }
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }
  render() {
    return (
      <div>
        <h1>Stock Market</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{ width: 720, height: 440, title: this.state.stockSymbol }}
        />
      </div>
    );
  }
}
export default Stock;
