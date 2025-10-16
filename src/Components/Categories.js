import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JewelleryShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const containerRef = useRef(null);

  const TITLE_HEIGHT = "80px";

  // Fetch categories from API
  useEffect(() => {
    axios
      .get("http://91.108.105.41:8000/api/categories/")
      .then((res) => {
        // Front page pe sirf first 4 categories dikhaye
        const frontCategories = res.data.results
          .filter((cat) => cat.is_active)
          .slice(0, 4)
          .map((cat) => ({
            name: cat.name,
            imageUrl: cat.image
              ? `http://91.108.105.41:8000${cat.image}`
              : "/default-category.png",
          }));
        setCategories(frontCategories);
      })
      .catch((err) => console.log("Error fetching categories:", err));
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const customTitleStyle = {
    height: TITLE_HEIGHT,
    backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(15,15,15,0.9))",
    borderRadius: "20px 20px 0 0",
    clipPath: `polygon(
      0% 0%, 
      100% 0%, 
      100% 100%,
      calc(50% + 20px) 100%, 
      50% calc(100% - 15px), 
      calc(50% - 20px) 100%, 
      0% 100%
    )`,
  };

  const reflectiveTextStyle = {
    color: "transparent",
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.9))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    filter: "brightness(1.5) contrast(1.1)",
    textShadow: "0 0 4px rgba(255,255,255,0.1)",
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center lg:mt-28 mt-14 px-2 w-full"
    >
      {/* ================= DESKTOP / LARGE SCREEN ================= */}
      <div className="hidden md:grid max-w-7xl w-full mx-auto grid-cols-[85%_15%] items-stretch">
        {/* LEFT SECTION */}
        <div
          className={`bg-white rounded-2xl p-6 flex flex-col items-center h-full ${
            isVisible ? "animate-fadeIn" : ""
          }`}
        >
          <div
            className="w-full mb-8 relative flex justify-center"
            style={{ height: TITLE_HEIGHT }}
          >
            <div
              className="absolute inset-0 text-white flex items-center justify-center shadow-lg overflow-hidden"
              style={customTitleStyle}
            >
              <h2
                className={`text-2xl md:text-3xl font-serif font-semibold px-4 ${
                  isVisible ? "animate-shimmer" : ""
                }`}
                style={reflectiveTextStyle}
              >
                The Perfect Jewel for Your Unique Style.
              </h2>
            </div>
          </div>

          <div className="flex justify-between items-start space-x-4 w-full px-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center w-1/4 group"
              >
                <div
                  className={`relative rounded-xl overflow-hidden shadow-md w-full aspect-square transform transition duration-700 group-hover:rotate-2 group-hover:scale-110 ${
                    isVisible ? "animate-float" : ""
                  }`}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                </div>
                <p className="font-serif font-medium text-gray-800 mt-3 text-sm md:text-base">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <Link to={"/collection"}>
          <div
            className={`w-full rounded-2xl mt-5 shadow-2xl flex flex-col justify-center items-center text-white text-center p-6 cursor-pointer group relative overflow-hidden`}
            style={{
              width: "100%",
              height: "370px",
              backgroundImage:
                'linear-gradient(145deg, rgba(0,0,0,0.95), rgba(255,255,255,0.08)), url("/Rectangle 1112.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-white/10 to-black/50 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>
            <p
              className={`text-6xl font-extrabold mb-2 z-10 text-white ${
                isVisible ? "animate-bounce-slow" : ""
              }`}
            >
              10+
            </p>
            <p
              className={`text-2xl md:text-3xl font-semibold z-10 text-white/90 ${
                isVisible ? "animate-pulse-slow" : ""
              }`}
            >
              Categories
            </p>
            <div className="absolute top-3 left-3 w-4 h-4 bg-white/30 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-pulse-slow"></div>
          </div>
        </Link>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="flex flex-col md:hidden justify-center items-center w-full">
        {/* Title */}
        <div
          className={`bg-white rounded-2xl p-4 w-full flex flex-col items-center ${
            isVisible ? "animate-fadeIn" : ""
          }`}
        >
          <div
            className="w-full mb-4 relative flex justify-center"
            style={{ height: "60px" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(40,40,40,0.9))",
              }}
            >
              <h2 className="text-center text-lg md:text-xl font-serif font-semibold px-4 text-white tracking-wide">
                The Perfect Jewel for Your Style
              </h2>
            </div>
          </div>

          {/* 4 Categories */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center w-full group"
              >
                <div
                  className={`relative rounded-xl overflow-hidden shadow-md w-full aspect-square transform transition duration-500 group-hover:scale-105 ${
                    isVisible ? "animate-float" : ""
                  }`}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                </div>
                <p className="font-serif font-medium text-gray-800 mt-2 text-sm">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 10+ Categories Button */}
        <Link to="/collection">
          <button className="relative w-44 py-2.5 px-6 rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold text-sm tracking-wide overflow-hidden shadow-lg hover:scale-105 transform transition-all group cursor-pointer flex justify-center items-center mt-6">
            {/* Moving shine */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 animate-shine pointer-events-none rounded-full"></span>

            {/* Sparkle particles */}
            <span className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-0 opacity-0 animate-sparkle-particle"></span>
            <span className="absolute w-1.5 h-1.5 bg-white rounded-full top-3/4 left-0 opacity-0 animate-sparkle-particle-delay"></span>

            {/* Button Text */}
            <span className="relative z-10 flex items-center justify-center text-center">
              Explore 10+ Categories
            </span>
          </button>
        </Link>
      </div>

      {/* ================= ANIMATIONS ================= */}
      <style>
        {`
          @keyframes fadeIn { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
          @keyframes float { 0%{ transform: translateY(0px);}50%{ transform: translateY(-6px);}100%{ transform: translateY(0px);} }
          @keyframes shimmer {0%{ background-position: -200% 0;}100%{ background-position: 200% 0;} }
          @keyframes bounce {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
          @keyframes pulse {0%,100%{opacity:1;}50%{opacity:0.5;} }
          @keyframes glow {0%,100%{ box-shadow:0 0 15px rgba(255,255,255,0.2);}50%{box-shadow:0 0 25px rgba(255,255,255,0.5);} }

          .animate-fadeIn { animation: fadeIn 1s ease-in-out forwards; }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-shimmer { background-size: 200% auto; animation: shimmer 3s linear infinite; }
          .animate-bounce-slow { animation: bounce 3s infinite; }
          .animate-pulse-slow { animation: pulse 3s infinite; }
          .animate-glow { animation: glow 3s ease-in-out infinite; }

          @keyframes shine {
            0% { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
            50% { transform: translateX(120%) skewX(-20deg); opacity: 0.5; }
            100% { transform: translateX(120%) skewX(-20deg); opacity: 0; }
          }
          .animate-shine {
            animation: shine 2s infinite;
            background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
            transform: translateX(-120%) skewX(-20deg);
          }
          @keyframes sparkleParticle {
            0% { transform: translateX(0) translateY(0) scale(0.5); opacity: 0; }
            50% { transform: translateX(100%) translateY(-10%) scale(1); opacity: 1; }
            100% { transform: translateX(200%) translateY(-20%) scale(0.5); opacity: 0; }
          }
          .animate-sparkle-particle {
            animation: sparkleParticle 2.5s infinite;
          }
          .animate-sparkle-particle-delay {
            animation: sparkleParticle 2.5s infinite 1.2s;
          }
        `}
      </style>
    </div>
  );
};

export default JewelleryShowcase;
