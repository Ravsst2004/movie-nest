import React from "react";
import Profile from "../profile";
import HamburgerMenu from "./hamburger-menu";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center px-10 py-2 bg-blueDark">
        <h1 className="text-2xl font-bold text-white">Movie Nest</h1>

        <div>
          {/* Profile */}
          <div className="hidden md:block">
            <Profile />
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
