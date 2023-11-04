import React, { useRef, useEffect } from "react";
import "./Login.css";
import { useDataLayerValue } from "../DataLayer";

function Happify() {
  // Styling for the spotify button
  const [{ artists, user }] = useDataLayerValue();

  const svgRef = useRef(null); // Reference to the SVG element
  const textRef = useRef(null); // Reference to the textPath element

  let monthString = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
  monthString += ' TOP ARTIST';

  const calculateFontSize = (monthString) => {
    if (monthString.length > 10) {
      return '10';
    } else if (monthString.length > 5) {
      return '12';
    } else {
      return '14';
    }
  };

  const calculateOffset = (monthString) => {
    return `${50 - monthString.length * 1.5}%`;
  };

  const updateText = () => {

    const svg = svgRef.current;
    const textPath = textRef.current;
    const monthText = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();

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
  };

  useEffect(() => {
    updateText(); // Call the updateText function after the component mounts
  }, [artists]);

  return (
    <div>
      <div className="login">
        <svg xmlns="http://www.w3.org/2000/svg" width="240" height="350" version="1.1" ref={svgRef} style={{ marginTop: '50px' }}>
          <circle cx="120" cy="170" r="112" fill="#fac206" stroke="black" strokeWidth="4" />
          <ellipse cx="90" cy="134" rx="12" ry="30" fill="black" />
          <ellipse cx="150" cy="134" rx="12" ry="30" fill="black" />
          <path id="smilePath" d="M36 212 Q120 266, 204 212" fill="none" />
          <text
            id="text"
            fontSize="24"
            fontFamily="Inter Tight"
            fill="black"
            textAnchor="middle"
            letterSpacing="2.4"
          >
            <textPath href="#smilePath" startOffset="50%" ref={textRef}>
              {artists?.items?.[0]?.name.toUpperCase() || 'LOADING'}
            </textPath>
          </text>
          <path id="monthCurve" d="M5 100 Q100 15 200 80" fill="transparent" />
          <text letterSpacing="2.4" fontSize={calculateFontSize(monthString)}>
            <textPath href="#monthCurve" startOffset={calculateOffset(monthString)}>
              {monthString || 'LOADING'}
            </textPath>
          </text>
          <path id="curve" d="M20 260 Q100 330 180 290" fill="transparent" />
          <text letterSpacing="2.4">
            <textPath href="#curve" startOffset="30%">
              FOR {user?.display_name.toUpperCase() || 'LOADING'}
            </textPath>
          </text>
        </svg>
      </div>
    </div >
  );
}

export default Happify;
