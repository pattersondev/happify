import React from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import "chartjs-plugin-labels";
import { useDataLayerValue } from "../DataLayer";

function NewChart() {
  // gets the data from datalayer
  const [{ genres, values, user }] = useDataLayerValue();

  console.log(user);
  // all the options for chartjs
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
  // function to make chart legend responsive
  (() => {
    window.innerWidth < 800
      ? (chartOptions.legend.position = "bottom")
      : (chartOptions.legend.position = "right");
  })();
  // input of the data from datalayer to the graph
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
      <h1 style={{ color: "black" }}>Hello there! {user?.display_name}</h1>
      <h3>Here's a chart of your most listened genres</h3>

      <div className="piechart">
        <Pie data={myData} options={chartOptions} />
      </div>
    </div>
  );
}

export default NewChart;
