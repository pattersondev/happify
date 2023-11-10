import React, { useEffect, Component } from "react";
//import React, { Component } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Privacy from "./Components/pages/Privacy";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import Home from "./Components/pages/Home";
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


      console.log(genres);
      dispatch({
        type: "SET_GENRES",
        genres,
      });
    });

  }, [dispatch]);


  return (
    <Router>
      <div className="App">
        <div className="header-container">
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <h2 className="Home">home</h2>
            </Link>
          </li>
          <li>
            <Link to="/About" style={{ textDecoration: 'none', color: 'black' }}>
              <h2 className="about">about</h2>
            </Link>
          </li>
          <li>
            <Link to="/Privacy" style={{ textDecoration: 'none', color: 'black' }}>
              <h2 className="about">privacy</h2>
            </Link>
          </li>
          <li>
            <Link to="/Contact" style={{ textDecoration: 'none', color: 'black' }}>
              <h2 className="contact">contact</h2>
            </Link>
          </li>
        </div>
        <Routes>
          <Route path='' element={< Home />}></Route>
          <Route exact path='/About' element={< About />}></Route>
          <Route exact path='/Privacy' element={< Privacy />}></Route>
          <Route exact path='/Contact' element={< Contact />}></Route>
        </Routes>
        
        <div className="footer">
          <a href="https://www.linkedin.com/in/pattersonrsam/" style={{ color: "black" }} target='_blank'> created by sam patterson</a>
          <a href="https://www.linkedin.com/in/jackmoorecameron/" style={{ color: "black" }} target='_blank'> and jack cameron</a>
        </div>
      </div>
    </Router>
  );
}

export default App;
