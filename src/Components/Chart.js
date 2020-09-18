import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import "chartjs-plugin-labels";

function NewChart(props) {
  // const { values, genres } = props;

  // const options = {
  //   chartData: {
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
  //       },
  //     ],
  //   },
  // };
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: [
        "djent",
        "melodic metalcore",
        "progressive metal",
        "deathcore",
        "metal",
        "instrumental rock",
        "death metal",
        "progressive jazz fusion",
        "melodic death metal",
      ],
      datasets: [
        {
          label: "Genres",
          data: [25, 12, 9, 8, 8, 7, 7, 6, 6],
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
    });
  };

  useEffect(() => {
    chart();
  }, []);

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

  return (
    <div className="piechart">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default NewChart;
