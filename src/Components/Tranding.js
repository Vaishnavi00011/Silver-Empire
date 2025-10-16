import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

// ================= Desktop Product Card =================
const DesktopProductCard = ({ imageUrl, label }) => (
  <div className="flex-shrink-0 w-1/5 p-2"> {/* 5 per view -> 1/5 */}
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
  const [products, setProducts] = useState([]);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const speed = 3000; // 3 sec

  // ===== Fetch API =====
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://91.108.105.41:8000/api/products/featured/");
        const featured = res.data.results.map((item) => ({
          id: item.id,
          imageUrl: `http://91.108.105.41:8000${item.primary_image.image}`,
          label: item.category_name || item.name,
        }));
        setProducts(featured);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchProducts();
  }, []);

  const extendedProducts = [...products, ...products];

  // ===== Desktop Carousel =====
  useEffect(() => {
    if (products.length === 0) return;
    let index = 0;
    const container = desktopRef.current;
    const cardWidth = container.querySelector("div")?.offsetWidth || 256;

    const interval = setInterval(() => {
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
  }, [products]);

  // ===== Mobile/Tablet Carousel =====
  useEffect(() => {
    if (products.length === 0) return;
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
  }, [products]);

  return (
    <div className="sm:px-6 mt-14 lg:mt-28 lg:px-8">
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
      <div className="hidden lg:block overflow-hidden max-w-[1275px] mx-auto">
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
