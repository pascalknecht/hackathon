import React from "react";
import { lineChartData, lineChartOptions } from "../../variables/charts";
import dynamic from "next/dynamic";

const ChartWrapper = dynamic(
    () => import('./ChartWrapper'),
    { ssr: false }
)

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: lineChartData,
      chartOptions: lineChartOptions,
    });
  }

  render() {
    return (
      <ChartWrapper
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
