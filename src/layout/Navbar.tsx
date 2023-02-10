import karo from "../utils/images/karo.png";
import "../styles/layout/Navbar.scss";
import { Link } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
import { useState } from "react";

function Navbar() {
  const [style, setStyle] = useState<string>("");

  return (
    <div className="navbar">
      <div className="navbar-hero">
        <img src={karo} alt="" className="navbar-image" />
        <h1>
          <Link to="/" className="navbar-title">
            Bela Blok
          </Link>
        </h1>
      </div>
      <Hamburger
        onToggle={(toggled) => {
          if (toggled) {
            setStyle("navbar-navitems-container-display");
          } else {
            setStyle(" ");
          }
        }}
        color="white"
        easing="ease-out"
        rounded
      />
      <div className={style.length > 1 ? style : "navbar-navitems-container"}>
        Navitems
      </div>
    </div>
  );
}

export default Navbar;
