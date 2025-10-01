import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

const Carousel = () => {
  const [current, setCurrent] = useState(1); // start from 1 (because of clone)
  const [isAnimating, setIsAnimating] = useState(true);
  const slidesRef = useRef(null);

  // Create clone array [last, ...images, first]
  const slides = [images[images.length - 1], ...images, images[0]];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrent((prev) => prev - 1);
  };

  // Handle transition end (for seamless infinite loop)
  const handleTransitionEnd = () => {
    if (current === slides.length - 1) {
      // reached last clone → jump to real first
      setIsAnimating(false);
      setCurrent(1);
    }
    if (current === 0) {
      // reached first clone → jump to real last
      setIsAnimating(false);
      setCurrent(slides.length - 2);
    }
  };

  return (
    <div className="relative w-full overflow-hidden ">
      {/* Images wrapper */}
      <div
        ref={slidesRef}
        className="flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: isAnimating ? "transform 0.7s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 h-90">
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index + 1)} // shift because of clone
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === index + 1 ? "bg-white scale-125" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
