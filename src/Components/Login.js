import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Jwellary from "../assets/Images/1810.sm002.001.TS.m000.c5.jewerly realistic.jpg";

const AuthModal = ({ setOpen }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-[900px] max-w-[95%] flex overflow-hidden border border-gray-200"
        >
          {/* Left Image Section */}
          <div className="hidden md:block w-1/2">
            <img
              src={Jwellary}
              alt="Auth Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl md:text-3xl"
            >
              ✖
            </button>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-black via-gray-700 to-gray-400 bg-clip-text text-transparent drop-shadow-lg">
              {isLogin ? "Welcome Back" : "Join Our Store"}
            </h2>

            {/* Form */}
            {isLogin ? (
              <form className="space-y-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition shadow-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition shadow-md"
                />
                <button
                  type="button"
                  className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:scale-[1.03] hover:shadow-xl transition-transform duration-300"
                >
                  Login
                </button>
                <p className="text-center text-sm text-gray-700">
                  Don’t have an account?{" "}
                  <span
                    className="text-black font-semibold cursor-pointer hover:underline"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            ) : (
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition shadow-md"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition shadow-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition shadow-md"
                />
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white py-4 rounded-2xl font-semibold hover:scale-[1.03] hover:shadow-xl transition-transform duration-300"
                >
                  Sign Up
                </button>
                <p className="text-center text-sm text-gray-700">
                  Already have an account?{" "}
                  <span
                    className="text-black font-semibold cursor-pointer hover:underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
