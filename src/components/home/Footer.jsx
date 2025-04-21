import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" bg-[#4CAF50] text-white py-12 font-title3 text-xl">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 items-center text-center lg:text-left">
        {/* Social Media Links */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold">Follow us</h2>
          <div className="flex space-x-4">
            <NavLink>
              <FaTwitter className="text-white text-4xl bg-white/20 p-2 rounded-full" />
            </NavLink>
            <NavLink>
              <RiInstagramFill className="text-white text-4xl bg-white/20 p-2 rounded-full" />
            </NavLink>
            <NavLink>
              <FaFacebook className="text-white text-4xl bg-white/20 p-2 rounded-full" />
            </NavLink>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-semibold text-red-300 mb-4">Page</h2>
          <ul className="space-y-2 pl-5">
            <li>
              <NavLink to="/" className="hover:text-red-300">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-red-300">About us</NavLink>
            </li>
            <li>
              <NavLink to="/contactus" className="hover:text-red-300">Contact us</NavLink>
            </li>
            <li>
              <NavLink to="/foodblog" className="hover:text-red-300">Food blog</NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center lg:items-start space-y-2">
          <h2 className="text-2xl font-semibold text-red-300 mb-4">Get in touch</h2>
          
          <p>Lunchbox.com</p>
          <p>+91 7028747731</p>
        </div>
      </div>

      {/* Copyright and Terms */}
      <div className="text-center mt-8 border-t border-white/20 pt-6">
        <p className="text-white/70">&copy; 2024 Lunch-Box. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <NavLink className="hover:text-red-300">Terms and Conditions</NavLink>
          <NavLink className="hover:text-red-300">Privacy and Policy</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
