import React from "react";
import brandLogo from "../Assets/brandLogo.png";

const Navbar = () => {
  return (
    <div>
      <header className="bg-[#FFFFFF] flex justify-between pt-2 pb-2 shadow-md">
        <div className="pl-20">
          <img src={brandLogo} alt="brandLogo" className="w-20" />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
