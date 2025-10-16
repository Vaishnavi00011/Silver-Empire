import React from 'react';
import banner from "../assets/Images/jewellry proposal_20250926_223349_0000.png";

const SimpleImageBanner = ({ imageSrc }) => {
  return (
    <div className="w-full lg:mt-28 mt-14 max-w-7xl mx-auto overflow-hidden">
      <img
        src={imageSrc}
        alt="Silver Empire Jewelry Collection Banner"
        className="
          w-full
          h-auto        /* Desktop & all screens auto height */
          max-h-[500px] sm:max-h-[500px]  /* Mobile/tablet max height */
          lg:max-h-none  /* Desktop full natural height */
          object-contain  /* Full image visible */
          object-center   /* Center crop if needed */
        "
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="lg:mt-20 lg:mb-20">
      <SimpleImageBanner imageSrc={banner} />
      {/* अन्य पेज सामग्री */}
    </div>
  );
};

export default App;
