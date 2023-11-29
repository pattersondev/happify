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
        <text style={{ fontSize: 36, marginTop: '3rem' }}> welcome to happify. </text>
        <IconButton href={loginUrl} className="button-container">
          <div>
            <div id="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" version="1.1">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" />
                  </filter>
                </defs>
                <circle cx="120" cy="120" r="112" fill="#fbd847" stroke="#282725" strokeWidth="4" filter="url(#shadow)" />
                <ellipse cx="90" cy="84" rx="12" ry="30" fill="#282725" />
                <ellipse cx="150" cy="84" rx="12" ry="30" fill="#282725" />
                <path id="smilePath" d="M36 140 Q120 240, 204 140" fill="none" />
                <text
                  id="text"
                  fontSize="13"
                  fontFamily="Inter Tight"
                  fill="black"
                  textAnchor="middle"
                  letterSpacing=".5"
                  fontWeight="bold"
                >
                  <textPath href="#smilePath" startOffset="50%" fontSize="20">
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
