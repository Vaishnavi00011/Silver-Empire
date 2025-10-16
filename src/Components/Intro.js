import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Banner1 from "../assets/Images/website banner 1.webp";
import Banner2 from "../assets/Images/banner 2.webp";
import Banner3 from "../assets/Images/banner 3.webp";
import Banner4 from "../assets/Images/banner 4.webp";

const images = [Banner1, Banner2, Banner3, Banner4];

const Carousel = () => {
  const slides = [images[images.length - 1], ...images, images[0]];
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const intervalRef = useRef(null);

  // ✅ Function to move next
  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  // ✅ Function to move previous
  const prevSlide = () => {
    setCurrent((prev) => prev - 1);
  };

  // ✅ Start auto sliding (always clean + restart)
  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 4000);
  };

  // ✅ Stop auto sliding
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // ✅ Start again when component mounts or remounts
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide(); // cleanup on unmount
  }, []);

  // ✅ Infinite Loop Handling
  const handleTransitionEnd = () => {
    if (current === slides.length - 1) {
      setTransition(false);
      setCurrent(1);
    } else if (current === 0) {
      setTransition(false);
      setCurrent(slides.length - 2);
    }
  };

  // ✅ Re-enable transition after instant jump
  useEffect(() => {
    if (!transition) {
      const timeout = setTimeout(() => setTransition(true), 30);
      return () => clearTimeout(timeout);
    }
  }, [transition]);

  // ✅ Reset on route revisit (prevents blank white issue)
  useEffect(() => {
    setCurrent(1);
    setTransition(true);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden group"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Slides */}
      <div
        className="flex w-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transition ? "transform 0.7s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
           <img
  src={img}
  alt={`slide-${idx}`}
  className="w-full h-[50vh] mt-3 lg:mt-0 md:h-[70vh] lg:object-contain object cover bg-black rounded-xl md:rounded-none"
/>

          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={() => {
          stopAutoSlide();
          prevSlide();
          startAutoSlide();
        }}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black transition opacity-0 group-hover:opacity-100"
      >
        <FaChevronLeft size={22} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => {
          stopAutoSlide();
          nextSlide();
          startAutoSlide();
        }}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black transition opacity-0 group-hover:opacity-100"
      >
        <FaChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx + 1)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === idx + 1
                ? "bg-white scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
