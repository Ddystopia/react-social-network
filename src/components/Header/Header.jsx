import React from "react";
import classNames from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classNames.header}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"
        alt="logo"
      />
    </header>
  );
}
export default Header;
