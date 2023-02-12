import karo from "../utils/images/karo.png";
import "../styles/layout/Navbar.scss";
import { Link } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
import { useState } from "react";
import { NavItems } from "../utils/Interfaces";
import NavItem from "./components/NavItem";

function Navbar() {
  const [style, setStyle] = useState<string>("");
  const Fade = require("react-reveal/Fade");

  const NavItems: NavItems[] = [
    { text: "Blok", path: "/game" },
    { text: "FAQ", path: "/faq" },
    { text: "Kontaktiraj me", path: "/contact" },
  ];

  return (
    <div className="navbar">
      <Fade bottom distance={"25%"}>
        <div className="navbar-hero">
          <img src={karo} alt="" className="navbar-image" />
          <h1>
            <Link to="/" className="navbar-title">
              Bela Blok
            </Link>
          </h1>
        </div>
      </Fade>
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
        {NavItems.map((navitem: NavItems, i: number) => {
          return <NavItem key={i} {...navitem} />;
        })}
      </div>
    </div>
  );
}

export default Navbar;
