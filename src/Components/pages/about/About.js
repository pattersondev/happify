import React from 'react';


function About() {
  return (
    <div className="center">
      <div>
        <h1 style={{ fontSize: 50, marginTop: '15rem', textAlign: 'center' }}>about happify.</h1>
      </div>
      <div>
        <h2 style={{ fontSize: 18, marginTop: '3rem', textAlign: 'center' }}>happify is a web based application that leverages the Spotify API for authentication and user data to generate a personalized report of a user's monthly top artist.</h2>
      </div>
      <div>
        <h2 style={{ fontSize: 18, marginTop: '3rem', textAlign: 'center' }}>it was created and developed by jack cameron and sam patterson in November of 2023.</h2>
      </div>
    </div>
  );
}

export default About;