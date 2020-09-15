import React from "react";
import Chart from "react-apexcharts";

function PieChart(props) {
  // gets the array of values and genres
  const { values, genres } = props;

  // All the options required by Apex Charts according to their docs
  let options = {
    colors: [
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
    chart: {
      redrawOnParentResize: true,
      animations: {
        enabled: true,
        easing: "linear",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 600,
        },
      },
    },

    labels: genres,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "15px",
        fontFamily: "Montserrat, Lato, sans-serif",
      },
    },

    legend: {
      show: true,
      fontSize: "16px",
      fontWeight: 700,

      labels: {
        colors: ["white"],
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    stroke: {
      width: 1,
    },
    responsive: [
      {
        breakpoint: 770,
        options: {
          chart: {
            width: "100%",
            height: 300,
          },
          legend: {
            show: true,
            position: "right",
          },
        },
      },
      {
        breakpoint: 650,
        options: {
          chart: {
            width: "100%",
            height: 400,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
        },
      },
    ],
  };

  return (
    <div className="pie">
      <Chart options={options} series={values} type="pie" width={"100%"} />
    </div>
  );
}

export default PieChart;
