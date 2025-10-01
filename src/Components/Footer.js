import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { PiYoutubeLogoLight } from 'react-icons/pi';
import { TfiClose } from 'react-icons/tfi';
import Logo from "../assets/Logo/PNG-01-01-e1741102611213 (1) 1.png"

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6 font-sans relative overflow-x-hidden">

      {/* Wave Shape */}
      <div
        className="absolute top-0 left-0 w-full h-16 overflow-hidden z-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 75% 30%, 50% 80%, 25% 30%, 0% 80%)', backgroundColor: 'white' }}
      ></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* --------------------- Desktop Section --------------------- */}
        <div className="hidden md:grid grid-cols-4 gap-12 border-b border-gray-700 pb-12 pt-10">

          {/* Column 1: Logo & Social */}
          <div className="space-y-6">
            <img src={Logo} alt="Silver Empire Logo" className="w-40 mb-4" />
            <h3 className="text-xl font-semibold mb-6">Social</h3>
            <div className="grid grid-cols-2 gap-4 w-fit">
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-gray-800 transition">
                <TfiClose className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-gray-800 transition">
                <PiYoutubeLogoLight className="text-xl" />
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-400 transition">Delivery Information</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">International Shipping</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Payment Options</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Find a Store</a></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Help & FAQS</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">About</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Offers & Contest Details</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <p className="text-sm font-light">+91 7378178000</p>
            <a href="mailto:info@silverempire.in" className="text-sm font-light hover:text-gray-400 transition">info@silverempire.in</a>

            <h3 className="text-2xl font-semibold mt-6 mb-4">Chat With Us</h3>
            <div className="flex space-x-4 flex-wrap">
              <a href="#" className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-gray-800 transition">
                <FaWhatsapp className="text-sm" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-gray-800 transition">
                <GrMail className="text-sm" />
              </a>
            </div>
          </div>
        </div>

        {/* --------------------- Mobile/Tablet Section --------------------- */}
        <div className="md:hidden grid grid-cols-1 gap-8 border-b border-gray-700 pb-8 pt-6">

          {/* Logo & Social */}
          <div className="space-y-6 text-left">
            <img src={Logo} alt="Silver Empire Logo" className="w-32 mb-4" />
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <div className="flex gap-4 flex-wrap">
              <FaFacebookF className="w-10 h-10 p-2 border border-white rounded-full hover:bg-gray-800 transition" />
              <FaInstagram className="w-10 h-10 p-2 border border-white rounded-full hover:bg-gray-800 transition" />
              <TfiClose className="w-10 h-10 p-2 border border-white rounded-full hover:bg-gray-800 transition" />
              <PiYoutubeLogoLight className="w-10 h-10 p-2 border border-white rounded-full hover:bg-gray-800 transition" />
            </div>
          </div>

          {/* Useful Links */}
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-400 transition">Delivery Information</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">International Shipping</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Payment Options</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Find a Store</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Help & FAQS</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">About</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Offers & Contest Details</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-left space-y-4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">+91 7378178000</p>
            <a href="mailto:info@silverempire.in" className="text-sm hover:text-gray-400 transition">info@silverempire.in</a>

            <h3 className="text-lg font-semibold mt-4 mb-2">Chat With Us</h3>
            <div className="flex gap-4 flex-wrap">
              <FaWhatsapp className="w-10 h-10 p-2 border border-white rounded-full hover:bg-gray-800 transition" />
              <GrMail className="w-10 h-10 p-2 border border-white rounded-full hover:bg-gray-800 transition" />
            </div>
          </div>
        </div>

        {/* ---------------- Disclaimer / Payment / Copyright ---------------- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-6 mt-8">

          {/* Disclaimer Section */}
          <div className="space-y-2 text-sm text-left md:text-left">
            <p className="text-base font-semibold">Disclaimer</p>
            <a href="#" className="block hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="block hover:text-gray-400 transition">Terms & Conditions</a>
          </div>

          {/* Payment Icons Section */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
            <hr className="border-gray-700 w-full md:w-[300px]" />
            <div className="flex gap-3 flex-wrap justify-start md:justify-end max-w-full">
              <div className="w-16 h-10 border border-gray-500 rounded-lg flex items-center justify-center text-xs text-white">VISA</div>
              <div className="w-16 h-10 border border-gray-500 rounded-lg flex items-center justify-center text-xs text-white">UPI</div>
              <div className="w-16 h-10 border border-gray-500 rounded-lg flex items-center justify-center text-xs text-white">CARD</div>
              <div className="w-20 h-10 border border-gray-500 rounded-lg flex items-center justify-center text-[8px] text-white text-center leading-tight">Diners Club International</div>
            </div>
            <hr className="border-gray-700 w-full md:w-[300px]" />
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-left md:text-center text-gray-500 text-xs mt-6">
          © 2025. All Rights Reserved. by Silver Empire
        </div>

      </div>
    </footer>
  );
};

export default Footer;
