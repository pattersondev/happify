import React, { useRef, useEffect, useCallback } from "react";
import "../login/Login.css";
import { useDataLayerValue } from "../../../DataLayer";
import happifyBanner from "../../../Assets/happify-banner.jpg";
import { Button } from "@material-ui/core";
import { toPng } from 'html-to-image';
import fontFile from '../../../fonts/InterTight-Bold.ttf';

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

  const generateShareableImage = useCallback(() => {

    if (userString === undefined || userString === '') {
      updateText();
    }

    // Create a clone of the div
    const clonedDiv = pngRef.current.cloneNode(true);

    // Find the SVG element within the cloned div
    const svgElement = clonedDiv.querySelector('svg');

    if (svgElement) {
      // Get the bounding box of the SVG
      const bbox = svgElement.getBBox();

      // Calculate the aspect ratio of the SVG and the Instagram story
      const svgAspectRatio = bbox.width / bbox.height;
      const storyAspectRatio = 1080 / 1920;

      // Calculate the scale factor
      const scaleFactor = storyAspectRatio / svgAspectRatio;

      // Scale down the SVG within the cloned div
      clonedDiv.style.display = 'flex';
      clonedDiv.style.flexDirection = 'column';
      clonedDiv.style.justifyContent = 'center';
      clonedDiv.style.alignItems = 'center';
      clonedDiv.style.backGroundColor = 'white';

      const style = document.createElement('style');
      style.innerHTML = `
        @font-face {
          font-family: 'Inter Tight';
          font-weight: 'bold';
          src: url(${fontFile}) format('truetype');
        }
      `;
      clonedDiv.appendChild(style);
    }

    // Temporarily append the cloned div to the body
    document.body.appendChild(clonedDiv);

    // Convert the cloned div to PNG
    toPng(clonedDiv, { cacheBust: true })
      .then((dataUrl) => {

        const img = document.createElement('img');

        // Set the src of the img element to the PNG data URL
        img.src = dataUrl;

        // Apply the same classes as the SVG
        //img.className = svgRef.current.className;

        // Apply the same styles as the SVG
        img.style.cssText = svgRef.current.style.cssText;


        img.className = 'img-class';
        img.style.height = '55vh';
        // Append the img element to the parent of the div
        pngRef.current.parentNode.appendChild(img);

        // Remove the div from the page
        pngRef.current.parentNode.removeChild(pngRef.current);
        const div = document.querySelector('.x');
        if (div) {
          div.remove();
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pngRef]);

  const calculateFontSize = (monthString, month) => {
    if (true) {
      if (monthString.length >= 10) {
        return '14';
      } else if (monthString.length > 5 && monthString.length < 10) {
        return '18';
      } else {
        return '20';
      }
    }
  };

  const calculateOffset = (monthString, month) => {
    if (month) {
      return `${(50 - monthString.length * 1.6) + 2}%`;
    } else {
      return `${(50 - monthString.length * 1.8) - 2}%`;
    }
  };

  const updateText = () => {

    const svg = svgRef.current;
    const textPath = textRef.current;
    const monthText = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();

    const textLength = textPath.textContent.length;
    const maxTextLength = 8;
    const baseStartOffset = 50;

    let startOffset = 50;

    startOffset = Math.max(0, Math.min(100, startOffset));
    textPath.setAttribute("startOffset", `${startOffset}%`);

    // Calculate the new font size based on text length
    const fontSize = Math.min(40, 240 / (textLength * .6));

    // Update the font size
    textPath.setAttribute("font-size", fontSize);

    //if (textPath.textContent !== 'LOADING' && userString !== 'LOADING') generateShareableImage();
  };

  useEffect(() => {
    const images = document.getElementsByTagName('img');
    if (images.length >= 1 && images.length <= 2) updateText();
  }, [artists]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src={happifyBanner} alt="happify-banner" style={{ width: '17rem', height: '7rem' }} />
      <div className="happify">
        <div className="happify-banner">
          <div className="x" style={{ height: '54vh' }} ref={pngRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="350" version="1.1" ref={svgRef}>
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" />
                </filter>
              </defs>
              <circle cx="120" cy="170" r="112" fill="#ffd64a" stroke="#282725" strokeWidth="4" filter="url(#shadow)" />
              <ellipse cx="90" cy="134" rx="12" ry="30" fill="#282725" />
              <ellipse cx="150" cy="134" rx="12" ry="30" fill="#282725" />
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
              <text letterSpacing=".5" fontSize={calculateFontSize(userString, false)} fill="#282725" fontFamily="Inter Tight" fontWeight="bold">
                <textPath href="#curve" startOffset={calculateOffset(userString, false)}>
                  FOR {userString}
                </textPath>
              </text>
            </svg>
            <p style={{ textAlign: 'center', fontFamily: "Inter Tight", fontWeight: "bold" }}>
              happify.club
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Happify;
