import React from "react";
import "./Login.css";
import smileify from "../Assets/smileify.svg";
import { loginUrl } from "../spotify";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

function Login() {
  // Styling for the spotify button
  const IconButton = withStyles(() => ({
    root: {
      color: "white",
      backgroundColor: "#1db954",
      transition: "transform .2s",
      padding: 16,
      borderRadius: 30,
      cursor: "pointer",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#4ac776",
        transform: "scale(1.1)",
      },
    },
  }))(Button);
  // style={{ height: 20, width: 30 }}
  return (
    <div className="login">
      <h1></h1>
      <IconButton href={loginUrl}>
        <img alt="edit" src={smileify} />
        Login with Spotify
      </IconButton>
    </div>
  );
}

export default Login;
