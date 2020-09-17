import React from "react";
import Chart from "./Chart";
import "./Placeholder.css";
function Placeholder() {
  // const genres = [
  //   "djent",
  //   "melodic metalcore",
  //   "progressive metal",
  //   "deathcore",
  //   "metal",
  //   "instrumental rock",
  //   "death metal",
  //   "progressive jazz fusion",
  //   "melodic death metal",
  // ];
  // const values = [25, 12, 9, 8, 8, 7, 7, 6, 6];
  return (
    <div className="container">
      {/* <h1>I'm a placeholder</h1> */}
      <div className="chart">
        <Chart />
        {/* <Chart genres={genres} values={values} /> */}
      </div>
    </div>
  );
}

export default Placeholder;
