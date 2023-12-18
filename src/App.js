import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Privacy from "./Components/pages/privacy/Privacy";
import About from "./Components/pages/about/About";
import Contact from "./Components/pages/contact/Contact";
import Home from "./Components/pages/home/Home";
import "./App.css";
import { getResponseToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Happify from "./Components/pages/happify/Happify";
import NavBar from "./Components/navbar/Navbar";

const spotify = new SpotifyWebApi();
let isHappify = false;


function Footer() {

  useEffect(() => {
    const happifyComponent = document.getElementsByClassName('happify');
    if (happifyComponent) {
      isHappify = true;
    }
  }, []);

  return (
    <div className="footer">
      <a href="https://www.linkedin.com/in/pattersonrsam/" style={{ color: "black" }} target='_blank'> created by sam patterson</a>
      <a href="https://www.linkedin.com/in/jackmoorecameron/" style={{ color: "black" }} target='_blank'> and jack cameron</a>
    </div>
  );
}

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
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/spotify/callback" element={<Happify />} />
        </Routes>

        {!isHappify && <Footer />}
      </div>
    </Router>
  );
}

export default App;
