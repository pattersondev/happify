import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
function Chart(props) {
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
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="piechart">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />

      {/* <Pie
        data={options.chartData}
        options={{ responsive: true, maintainAspectRatio: false }}
      /> */}
    </div>
  );
}

export default Chart;
