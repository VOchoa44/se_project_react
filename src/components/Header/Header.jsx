import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const [value, setValue] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="logo image" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <NavLink to="/profile" className="header__nav-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegegne"
            className="header__avatar"
          />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
