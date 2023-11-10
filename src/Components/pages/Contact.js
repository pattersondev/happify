import React from 'react';
import "./ee.css";


function Contact() {
    return (
        <div className="center">
          <div>
            <h1 style={{ fontSize: 50, marginTop: '6rem' }}>contact happify.</h1>
          </div>
          <div>
            <h2 style={{ fontSize: 18, marginTop: '3rem' }}>please refer to our primary email for all questions and inquiries.</h2>
          </div>
          <div className ="easterEggContainer">
            <h2 className="mainHeading"style={{ fontSize: 18, marginTop: '3rem' }}>happifybiz@gmail.com</h2>
            <p className="hiddenText">hi justin</p>
          </div>
        </div>
      );
}

export default Contact;