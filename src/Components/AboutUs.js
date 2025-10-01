import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import maskGroup from "../assets/Images/Mask group.png";
import maskGroup1 from "../assets/Images/Mask group (1).png";
import maskGroup2 from "../assets/Images/Mask group (2).png";

// Testimonial Card
const TestimonialCard = ({ imageSrc, testimonialText, customerName }) => {
  return (
    <div className="relative flex-shrink-0 w-72 h-52 flex justify-center animate-slideUpFade">
      <div className="bg-white text-gray-800 p-4 pt-14 rounded-2xl shadow-2xl
                      w-full h-full flex flex-col justify-between
                      transform transition-all duration-700 hover:scale-105 hover:shadow-3xl">
        <p className="text-sm italic text-gray-700 leading-relaxed">
          "{testimonialText}"
        </p>
        <p className="font-semibold text-sm text-gray-900 mt-2">- {customerName}</p>
      </div>

      <div className="absolute top-0 transform -translate-y-1/2">
        <img
          src={imageSrc}
          alt={customerName}
          className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg"
        />
      </div>
    </div>
  );
};

// Desktop Carousel (unchanged)
const DesktopTestimonials = () => {
  const testimonials = [
    { id: 1, image: maskGroup, name: "Jane Doe", text: "Exceeded all expectations. Top-notch quality and service!" },
    { id: 2, image: maskGroup1, name: "John Smith", text: "A game-changer for my business. Highly recommended!" },
    { id: 3, image: maskGroup2, name: "Emily White", text: "Fantastic experience from start to finish. Results speak!" },
    { id: 4, image: maskGroup, name: "Alex Johnson", text: "Amazing quality and support. I highly recommend!" },
    { id: 5, image: maskGroup1, name: "Sophie Lee", text: "Incredible service. Exceeded my expectations!" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = testimonials.length;

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalCards);

  const visibleCards = [
    testimonials[currentIndex % totalCards],
    testimonials[(currentIndex + 1) % totalCards],
    testimonials[(currentIndex + 2) % totalCards],
  ];

  return (
    <div className='hidden lg:flex flex-col '>
   <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-center text-gray-900 leading-snug tracking-wide">
  What Customers Think About Us
</h2>

    
    <div className="hidden sm:flex py-10 px-4 bg-white font-sans">
 
      <div className="w-full relative max-w-6xl mx-auto flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 md:p-4 bg-white text-gray-900 border-2 border-black rounded-full transition-all hover:bg-gray-100 focus:outline-none z-10 shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Carousel Container */}
        <div
          className='w-full md:w-[85%] mx-auto rounded-xl overflow-hidden flex justify-between items-center p-10'
          style={{
            minHeight: '400px',
            backgroundImage: `url("/Mask group (6).png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            filter: 'brightness(0.7) contrast(1.2)',
          }}
        >
          {visibleCards.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              imageSrc={testimonial.image}
              testimonialText={testimonial.text}
              customerName={testimonial.name}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 p-3 md:p-4 bg-white text-gray-900 border-2 border-black rounded-full transition-all hover:bg-gray-100 focus:outline-none z-10 shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div></div>
  );
};

// Mobile Carousel (1 card at a time, with background image)
const MobileTestimonials = () => {
  const testimonials = [
    { id: 1, image: maskGroup, name: "Jane Doe", text: "Exceeded all expectations. Top-notch quality and service!" },
    { id: 2, image: maskGroup1, name: "John Smith", text: "A game-changer for my business. Highly recommended!" },
    { id: 3, image: maskGroup2, name: "Emily White", text: "Fantastic experience from start to finish. Results speak!" },
    { id: 4, image: maskGroup, name: "Alex Johnson", text: "Amazing quality and support. I highly recommend!" },
    { id: 5, image: maskGroup1, name: "Sophie Lee", text: "Incredible service. Exceeded my expectations!" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = testimonials.length;

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalCards);

  return (
    <div className="sm:hidden py-16 px-4 bg-white font-sans">
  <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-center mb-4 sm:mb-6 text-gray-900 leading-snug tracking-wide">
  What Customers Think About Us
</h2>





      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white text-gray-900 border-2 border-black rounded-full z-10 shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Background + Single Card */}
        <div
          className="w-full flex justify-center items-center rounded-xl overflow-hidden p-6"
          style={{
            minHeight: '300px',
            backgroundImage: `url("/Mask group (6).png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            filter: 'brightness(0.7) contrast(1.2)',
          }}
        >
          <TestimonialCard
            size="mobile"
            imageSrc={testimonials[currentIndex].image}
            testimonialText={testimonials[currentIndex].text}
            customerName={testimonials[currentIndex].name}
          />
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 p-2 bg-white text-gray-900 border-2 border-black rounded-full z-10 shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


// Main Export
const CustomerTestimonialsSection = () => {
  return (
    <>
      <DesktopTestimonials />
      <MobileTestimonials />
    </>
  );
};

export default CustomerTestimonialsSection;
