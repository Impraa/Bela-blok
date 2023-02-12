import React from "react";
import "../styles/pages/Homepage.scss";
import { Link } from "react-router-dom";

function Homepage() {
  const Flip = require("react-reveal/Flip");

  return (
    <div className="homepage">
      <Flip top>
        <h2 className="greetings">Dobro Došao</h2>
      </Flip>
      <Flip bottom>
        <h3 className="pagename">na Bela Blok</h3>
      </Flip>
      <Link to="/game" className="start-game-btn">
        Započni
      </Link>
    </div>
  );
}

export default Homepage;
