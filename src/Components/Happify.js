import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { useDataLayerValue } from "../DataLayer";

function Happify() {
  // Styling for the spotify button
  const [{ artists }] = useDataLayerValue();
  const [loading, setLoading] = useState(true);

  const svgRef = useRef(null); // Reference to the SVG element
  const textRef = useRef(null); // Reference to the textPath element

  const updateText = () => {

    const svg = svgRef.current;
    const textPath = textRef.current;

    console.log(svg);
    const textLength = textPath.textContent.length;
    const maxTextLength = 8;
    const baseStartOffset = 50;

    let startOffset;
    if (textLength <= 4) {
      startOffset = 50;
    } else {
      startOffset = baseStartOffset - (textLength - maxTextLength) * 0.2;
    }

    startOffset = Math.max(0, Math.min(100, startOffset));
    textPath.setAttribute("startOffset", `${startOffset}%`);

    // Calculate the new font size based on text length
    const fontSize = Math.min(24, 240 / (textLength * 1.3));

    // Update the font size
    textPath.setAttribute("font-size", fontSize);

    //svg.setAttribute("width", 2 * (84 + textLength * 30)); // Adjust as needed
    // Calculate the new startOffset based on text length

  };

  useEffect(() => {
    // if (artists.length < 1) {
    //   console.log('HELLO')
    //   setLoading(true);
    // } else {

    //   updateText(); // Call the updateText function after the component mounts
    //   setLoading(false);

    // }

    updateText(); // Call the updateText function after the component mounts
  }, [artists]);

  return (
    <div>
      <div className="login">
        <div>
          <div id="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" version="1.1" ref={svgRef}>
              <circle cx="120" cy="120" r="112" fill="#fac206" stroke="black" strokeWidth="4" />
              <ellipse cx="90" cy="84" rx="12" ry="30" fill="black" />
              <ellipse cx="150" cy="84" rx="12" ry="30" fill="black" />
              <path id="smilePath" d="M36 162 Q120 216, 204 162" fill="none" />
              <text
                id="text"
                fontSize="24"
                fontFamily="Inter Tight"
                fill="black"
                textAnchor="middle"
                letterSpacing="2.4"
              >
                <textPath href="#smilePath" startOffset="50%" ref={textRef}>
                  {artists?.items?.[0]?.name || 'Default'}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Happify;
