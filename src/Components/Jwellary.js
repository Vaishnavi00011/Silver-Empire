import React from 'react';
import banner from "../assets/Images/jewellry proposal_20250926_223349_0000.png";

const SimpleImageBanner = ({ imageSrc }) => {
  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden ">
      <img
        src={imageSrc}
        alt="Silver Empire Jewelry Collection Banner"
        className="
          w-full 
                   /* Desktop par normal height */
          lg:h-auto       /* Desktop same */
          h-auto    /* Mobile par height badi */
          md:h-[500px]    /* Tablet par bhi badi */
          object-cover
        "
      />
    </div>
  );
};

const App = () => {
  return (
    <div className='lg:mt-20 lg:mb-20 '>
      <SimpleImageBanner imageSrc={banner} />
      {/* अन्य पेज सामग्री */}
    </div>
  );
};

export default App;
