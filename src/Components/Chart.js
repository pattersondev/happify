import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import "chartjs-plugin-labels";
import { useDataLayerValue } from "../DataLayer";

function NewChart(props) {
  const [chartData, setChartData] = useState({});
  const [{ genres, values, user }] = useDataLayerValue();

  // const chart = () => {
  //   setChartData({
  //     labels: genres,
  //     datasets: [
  //       {
  //         label: "Genres",
  //         data: values,
  //         backgroundColor: [
  //           "#ffba08",
  //           "#faa307",
  //           "#f48c06",
  //           "#e85d04",
  //           "#dc2f02",
  //           "#d00000",
  //           "#9d0208",
  //           "#6a040f",
  //           "#370617",
  //           "#03071e",
  //         ],
  //         borderWidth: 0.5,
  //       },
  //     ],
  //   });
  // };

  // useEffect(() => {
  //   chart();
  // }, []);

  const chartOptions = {
    plugins: {
      labels: {
        position: "border",
        render: "percentage",
        fontColor: "white",
        fontSize: 15,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white",
        usePointStyle: true,
        boxWidth: 15,
        fontSize: 18,
        fontFamily: "Montserrat",
        padding: 10,
      },
      position: "right",
      align: "left",
    },
  };

  (() => {
    window.innerWidth < 800
      ? (chartOptions.legend.position = "bottom")
      : (chartOptions.legend.position = "right");
  })();
  //   Chart.Legend.prototype.afterFit = function() {
  //     this.width = this.height + 50;
  // };

  const myData = {
    labels: genres,
    datasets: [
      {
        label: "Genres",
        data: values,
        backgroundColor: [
          "#ffba08",
          "#faa307",
          "#f48c06",
          "#e85d04",
          "#dc2f02",
          "#d00000",
          "#9d0208",
          "#6a040f",
          "#370617",
          "#03071e",
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div className="main">
      <h1>Hello there! {user?.display_name}</h1>
      <h3>Here's a chart of your most listened genres</h3>

      <div className="piechart">
        <Pie data={myData} options={chartOptions} />
      </div>
    </div>
  );
}

export default NewChart;
