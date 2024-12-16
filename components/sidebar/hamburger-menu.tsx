import React from "react";

const HamburgerMenu = () => {
  return (
    <menu>
      <div className="w-6 h-0.5 bg-white rotate-45"></div>
      <div className="w-6 h-0.5 bg-white -rotate-45"></div>
    </menu>
  );
};

export default HamburgerMenu;
