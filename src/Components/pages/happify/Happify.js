import React, { useRef, useEffect, useCallback } from "react";
import "../login/Login.css";
import { useDataLayerValue } from "../../../DataLayer";
import './Happify.css';

function Happify() {
  // Styling for the spotify button
  const [{ artists, user }] = useDataLayerValue();
  const pngRef = useRef(null);

  const svgRef = useRef(null); // Reference to the SVG element
  const textRef = useRef(null); // Reference to the textPath element

  const monthString = new Date().toLocaleString('default', { month: 'long' }).toUpperCase() + ' TOP ARTIST';

  const userString = user?.display_name?.split(' ')[0].toLowerCase() || 'LOADING';

  let artistString = artists?.items?.[0]?.name.toLowerCase() || 'LOADING';

  const updateText = () => {
    const textPath = textRef.current;

    const textLength = textPath.textContent.length;

    let startOffset = 50;

    if (artistString === 'DREW') {
      artistString = 'COPYWRITE';
    }

    startOffset = Math.max(0, Math.min(100, startOffset));
    textPath.setAttribute("startOffset", `${startOffset}%`);

    // Calculate the new font size based on text length
    const fontSize = Math.min(40, 240 / (textLength * .6));

    // Update the font size
    textPath.setAttribute("font-size", fontSize);

    const div = document.querySelector('.footer');
    if (div) {
      div.remove();
    }
  };

  useEffect(() => {
    updateText();
  }, [artists]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="happify">
        <div className="happify-banner">
          <p style={{ textAlign: 'center', fontFamily: "Inter Tight", fontWeight: "bold", fontSize: 54, marginBottom: '2rem' }}>
            Happify
          </p>
          <div className="x" style={{ height: '54vh' }} ref={pngRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="350" version="1.1" ref={svgRef}>
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" />
                </filter>
              </defs>
              <circle cx="120" cy="170" r="112" fill="#ffd64a" stroke="#282725" strokeWidth="4" filter="url(#shadow)" />
              <ellipse cx="90" cy="125" rx="12" ry="35" fill="#282725" />
              <ellipse cx="150" cy="125" rx="12" ry="35" fill="#282725" />
              <path id="smilePath" d="M36 192 Q120 280, 204 192" fill="none" />
              <text
                id="text"
                fontSize="36"
                fontFamily="Inter Tight"
                fill="#282725"
                textAnchor="middle"
                letterSpacing=".3"
                fontWeight="bold"
              >
                <textPath href="#smilePath" startOffset="50%" ref={textRef}>
                  {artistString}
                </textPath>
              </text>
              <path id="monthCurve" d="M0 120 Q120 -30 250 135" fill="transparent" />
              <text letterSpacing=".5" fontSize={20} fill="#282725" fontFamily="Inter Tight" fontWeight="bold">
                <textPath href="#monthCurve" startOffset={20.6}>
                  {monthString || 'LOADING'}
                </textPath>
              </text>
              <path id="curve" d="M3 250 Q100 350 200 280" fill="transparent" />
              <text letterSpacing=".5" fontSize='24' fill="#282725" fontFamily="Inter Tight" fontWeight="bold">
                <textPath href="#curve" startOffset="28%">
                  happify.club
                </textPath>
              </text>
            </svg>
            <p style={{ textAlign: 'center', fontFamily: "Inter Tight", fontWeight: "bold", marginTop: '2rem' }}>
              for {userString}
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Happify;
