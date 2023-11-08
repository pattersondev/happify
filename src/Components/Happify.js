import React, { useRef, useEffect, useCallback } from "react";
import "./Login.css";
import { useDataLayerValue } from "../DataLayer";
import happifyBanner from "../Assets/happify-banner.jpg";
import { Button } from "@material-ui/core";
import { toPng } from 'html-to-image';

function Happify() {
  // Styling for the spotify button
  const [{ artists, user }] = useDataLayerValue();
  const pngRef = useRef(null);

  const svgRef = useRef(null); // Reference to the SVG element
  const textRef = useRef(null); // Reference to the textPath element

  let monthString = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
  monthString += ' TOP ARTIST';

  let artistString = artists?.items?.[0]?.name.toLowerCase() || 'LOADING';
  if (artistString === 'DREW') {
    artistString = 'COPYWRITE';
  }

  const userString = user?.display_name?.split(' ')[0].toUpperCase() || 'LOADING';

  const onButtonClick = useCallback(() => {
    if (pngRef.current === null) {
      return
    }

    const svgElement = pngRef.current.querySelector('svg');
    if (svgElement) {
      // Add a slight delay before the conversion
      setTimeout(() => {
        const clonedSvgElement = svgElement.cloneNode(true);
        clonedSvgElement.setAttribute('transform', 'scale(0.50)');

        toPng(clonedSvgElement, { cacheBust: true, })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'my-image-name.png'
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, 100); // 100ms delay
    }
  }, [pngRef])

  const calculateFontSize = (monthString) => {
    if (monthString.length >= 10) {
      return '12';
    } else if (monthString.length > 5) {
      return '14';
    } else {
      return '16';
    }
  };

  const calculateOffset = (monthString) => {
    return `${50 - monthString.length * 1.6}%`;
  };

  const updateText = () => {

    const svg = svgRef.current;
    const textPath = textRef.current;
    const monthText = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();

    const textLength = textPath.textContent.length;
    const maxTextLength = 8;
    const baseStartOffset = 50;

    let startOffset = 50;
    // if (textLength <= 4) {
    //   startOffset = 50;
    // } else {
    //   //startOffset = baseStartOffset - (textLength - maxTextLength) * 0.15;
    //   startOffset = 50;
    // }

    startOffset = Math.max(0, Math.min(100, startOffset));
    textPath.setAttribute("startOffset", `${startOffset}%`);

    // Calculate the new font size based on text length
    const fontSize = Math.min(30, 240 / (textLength * 1.3));

    // Update the font size
    textPath.setAttribute("font-size", fontSize);
  };

  useEffect(() => {
    updateText(); // Call the updateText function after the component mounts
  }, [artists]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="happify">
        <div style={{ height: '54vh' }} ref={pngRef}>
          <svg xmlns="http://www.w3.org/2000/svg" width="240" height="350" version="1.1" ref={svgRef}>
            <circle cx="120" cy="170" r="112" fill="#ffd64a" stroke="#282725" strokeWidth="4" />
            <ellipse cx="90" cy="134" rx="12" ry="30" fill="#282725" />
            <ellipse cx="150" cy="134" rx="12" ry="30" fill="#282725" />
            <path id="smilePath" d="M36 212 Q120 266, 204 212" fill="none" />
            <text
              id="text"
              fontSize="36"
              fontFamily="Inter Tight"
              fill="#282725"
              textAnchor="middle"
              letterSpacing="2.8"
              fontWeight="bold"
            >
              <textPath href="#smilePath" startOffset="50%" ref={textRef}>
                {artistString}
              </textPath>
            </text>
            <path id="monthCurve" d="M0 110 Q100 0 205 80" fill="transparent" />
            <text letterSpacing="2.4" fontSize={calculateFontSize(monthString)} fill="#282725" fontFamily="Inter Tight" fontWeight="bold">
              <textPath href="#monthCurve" startOffset={calculateOffset(monthString)}>
                {monthString || 'LOADING'}
              </textPath>
            </text>
            <path id="curve" d="M3 240 Q100 340 200 270" fill="transparent" />
            <text letterSpacing="2.2" fontSize={calculateFontSize(userString)} fill="#282725" fontFamily="Inter Tight" fontWeight="bold">
              <textPath href="#curve" startOffset={calculateOffset(userString)}>
                FOR {userString}
              </textPath>
            </text>
          </svg>
          <p style={{ textAlign: 'center', fontFamily: "Inter Tight", fontWeight: "bold" }}>
            happify.club
          </p>
        </div>
        <Button onClick={onButtonClick} style={{ borderRadius: 30, fontFamily: "Inter Tight", fontWeight: "bold" }}>
          share to instagram story
        </Button>
      </div>
    </div>
  );
}

export default Happify;
