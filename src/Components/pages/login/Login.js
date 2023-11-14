import React from "react";
import "./Login.css";
import { loginUrl } from "../../../spotify";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

function Login() {
  // Styling for the spotify button
  const IconButton = withStyles(() => ({
    root: {
      color: "white",
      transition: "transform .2s",
      borderRadius: 30,
      cursor: "pointer",
      fontWeight: "bold",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
  }))(Button);

  return (
    <div>
      <div className="login" style={{ paddingBottom: '15rem' }}>
        <text style={{ fontSize: 36, marginTop: '6rem' }}> welcome to happify. </text>
        <IconButton href={loginUrl} className="button-container">
          <div>
            <div id="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" version="1.1">
                <circle cx="120" cy="120" r="112" fill="#fbd847" stroke="#282725" strokeWidth="4" />
                <ellipse cx="90" cy="84" rx="12" ry="30" fill="#282725" />
                <ellipse cx="150" cy="84" rx="12" ry="30" fill="#282725" />
                <path id="smilePath" d="M36 162 Q120 216, 204 162" fill="none" />
                <text
                  id="text"
                  fontSize="13"
                  fontFamily="Inter Tight"
                  fill="black"
                  textAnchor="middle"
                  letterSpacing="2.4"
                  fontWeight="bold"
                >
                  <textPath href="#smilePath" startOffset="50%">
                    login with spotify
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </IconButton>
      </div>
    </div>
  );
}

export default Login;
