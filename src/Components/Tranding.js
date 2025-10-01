import React, { useRef, useEffect } from "react";
import Earing from "../assets/Images/5 1.png";
import Earing2 from "../assets/Images/11 1.png";
import Earing3 from "../assets/Images/13 1.png";
import Earing4 from "../assets/Images/15 1.png";

const products = [
  { id: 1, imageUrl: Earing, label: "Trending" },
  { id: 2, imageUrl: Earing2, label: "Collection" },
  { id: 3, imageUrl: Earing3, label: "Trending" },
  { id: 4, imageUrl: Earing4, label: "Collection" },
];

// ================= Desktop Product Card =================
const DesktopProductCard = ({ imageUrl, label }) => (
  <div className="flex-shrink-0 w-64 p-2">
    <div className="w-full overflow-hidden rounded-lg shadow-lg aspect-[3/4]">
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <p className="mt-2 text-lg font-serif font-medium text-gray-800 text-center">{label}</p>
  </div>
);

// ================= Mobile/Tablet Product Card =================
const MobileProductCard = ({ imageUrl, label }) => (
  <div className="flex-shrink-0 w-1/2 sm:w-1/3 p-2">
    <div className="w-full overflow-hidden rounded-lg shadow-lg aspect-[3/4]">
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <p className="mt-2 text-base font-serif text-gray-800 text-center">{label}</p>
  </div>
);

const TrendingJewellery = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const desktopCardWidth = 256; // px -> lg:w-64
  const speed = 3000; // 3 sec

  const extendedProducts = [...products, ...products];

  // ===== Desktop Carousel =====
  useEffect(() => {
    let index = 0;
    const container = desktopRef.current;

    const interval = setInterval(() => {
      index += 1;
      container.style.transition = "transform 0.7s ease-in-out";
      container.style.transform = `translateX(-${index * desktopCardWidth}px)`;

      if (index >= products.length) {
        setTimeout(() => {
          container.style.transition = "none";
          index = 0;
          container.style.transform = `translateX(0px)`;
        }, 700);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  // ===== Mobile/Tablet Carousel =====
  useEffect(() => {
    let index = 0;
    const container = mobileRef.current;

    const interval = setInterval(() => {
      const card = container.querySelector("div"); // first card
      const cardWidth = card?.offsetWidth || 180; // dynamically get width

      index += 1;
      container.style.transition = "transform 0.7s ease-in-out";
      container.style.transform = `translateX(-${index * cardWidth}px)`;

      if (index >= products.length) {
        setTimeout(() => {
          container.style.transition = "none";
          index = 0;
          container.style.transform = `translateX(0px)`;
        }, 700);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Header */}
      <div className="text-center mb-10">
       <h1 className="text-2xl sm:text-3xl md:text-3xl font-serif font-semibold text-gray-800 tracking-wide mb-2">
  Trending Now
</h1>
<p className="text-sm sm:text-base md:text-base font-serif text-gray-600">
  Jewellery pieces everyone's eyeing right now
</p>

      </div>

      {/* ===== Desktop Carousel ===== */}
      <div className="hidden lg:block overflow-hidden max-w-[1024px] mx-auto">
        <div ref={desktopRef} className="flex">
          {extendedProducts.map((product, idx) => (
            <DesktopProductCard
              key={idx}
              imageUrl={product.imageUrl}
              label={product.label}
            />
          ))}
        </div>
      </div>

      {/* ===== Mobile/Tablet Carousel ===== */}
      <div className="block lg:hidden overflow-hidden w-full mx-auto">
        <div ref={mobileRef} className="flex">
          {extendedProducts.map((product, idx) => (
            <MobileProductCard
              key={idx}
              imageUrl={product.imageUrl}
              label={product.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingJewellery;
