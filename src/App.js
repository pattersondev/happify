import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getResponseToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import NewChart from "./Components/Chart";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const token = getResponseToken();
    // for security reasons this function clears the token from the browser
    window.location.hash = "";
    const _token = token.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);

      // Gets the name of the user
      spotify.getMe().then((user) =>
        dispatch({
          type: "SET_USER",
          user,
        })
      );

      // get the top artists
      spotify.getMyTopArtists({ limit: 1, time_range: 'short_term' }).then((artists) => {
        console.log(artists);
        dispatch({
          type: "SET_ARTISTS",
          artists,
        });
      });

      // NEW FUNCTION that pushes genres and values for the chart
      spotify.getMyTopArtists({ limit: 100 }).then((artists) => {
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
        let sortedGenres = Object.entries(artistCopy).sort(
          (a, b) => b[1] - a[1]
        );

        // Separate the top 10 genres and counts to pass to the PieChart component
        let genres = sortedGenres.map((e) => e[0]).slice(0, 10);
        let values = sortedGenres.map((e) => e[1]).slice(0, 10);

        dispatch({
          type: "SET_GENRES",
          genres,
        });
        dispatch({
          type: "SET_VALUES",
          values,
        });
      });
    }
  }, []);

  return (
    <div className="App">
      {token ? <NewChart /> : <Login />}
      <div className="footer">
        <a href="https://instagram.com/sam.patt" style={{ color: "black" }} target='_blank'> Made by Sam Patterson</a>
        <a href="https://instagram.com/jackcameron02" style={{ color: "black" }} target='_blank'> and Jack Cameron</a>
      </div>
    </div>
  );
}

export default App;
