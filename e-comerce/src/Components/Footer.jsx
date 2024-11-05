import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-500">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="footer" />
          <p className="w-full md:w-2/3 text-gray-600">footer text here</p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out">
              <Link to="/about">About Us</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out">
              <Link to="/delivery">Delivery</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out">
              <Link to="/privacy-policy">Privacy policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+251935119111</li>
            <li>surafelgbr@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2017@ something.com -All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;