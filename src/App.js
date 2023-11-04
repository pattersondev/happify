import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getResponseToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Happify from "./Components/Happify";

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
        dispatch({
          type: "SET_ARTISTS",
          artists,
        });
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        Header Holder
      </div>
      {token ? <Happify /> : <Login />}
      <div className="footer">
        <a href="https://instagram.com/sam.patt" style={{ color: "black" }} target='_blank'> Made by Sam Patterson</a>
        <a href="https://instagram.com/jackcameron02" style={{ color: "black" }} target='_blank'> and Jack Cameron</a>
      </div>
    </div>
  );
}

export default App;
