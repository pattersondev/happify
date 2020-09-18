import React from "react";
import "./Stats.css";
import { useDataLayerValue } from "../DataLayer";
import PieChart from "./PieChart";
import Chart from "./Chart";

function Stats() {
  // Pull the artists and user from the data layer
  const [{ artists, user }] = useDataLayerValue();

  // Create an objet with all the genres the user has with the name as a key and a number
  // representing how many times it found that genre
  let artistGenres = artists?.items
    ?.map((artist) => artist.genres.map((genre) => genre))
    .flat()
    .reduce((total, curr) => {
      curr in total ? total[curr]++ : (total[curr] = 1);
      return total;
    }, {});

  // Copy the object so it can be handled
  let artistCopy = {};
  Object.assign(artistCopy, artistGenres);

  // Orders the genres by most found
  let sortedGenres = Object.entries(artistCopy).sort((a, b) => b[1] - a[1]);

  // Separate the top 10 genres and counts to pass to the PieChart component
  let pieGenres = sortedGenres.map((e) => e[0]).slice(0, 9);
  let pieValues = sortedGenres.map((e) => e[1]).slice(0, 9);

  return (
    <div className="main">
      <h1>Hello there! {user?.display_name}</h1>
      <h3>Here's a chart of your most listened genres</h3>

      <div className="chart">
        <PieChart genres={pieGenres} values={pieValues} />
        <Chart genres={pieGenres} values={pieValues} />
      </div>
    </div>
  );
}

export default Stats;
