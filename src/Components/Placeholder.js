import React from "react";
import NewChart from "./Chart";
import { useDataLayerValue } from "../DataLayer";

function Placeholder() {
  const [{ genres }] = useDataLayerValue();
  console.log(genres);
  return (
    <div className="container">
      <NewChart />
      {/* <h1>I'm a placeholder</h1> */}
      <div className="chart">
        {/* <Chart genres={genres} values={values} /> */}
      </div>
    </div>
  );
}

export default Placeholder;
