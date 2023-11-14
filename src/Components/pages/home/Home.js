import React from "react";
import "./Home.css";
import Login from "../login/Login";
import { useDataLayerValue } from "../../../DataLayer";
import Happify from "../happify/Happify";
import { getResponseToken } from "../../../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect } from "react";

const spotify = new SpotifyWebApi();

function Home() {

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
    <div>
      <Login />
    </div>
  )
}

export default Home;