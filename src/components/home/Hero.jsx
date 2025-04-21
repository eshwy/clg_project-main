import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaArrowRight, FaClock, FaLeaf } from "react-icons/fa";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Animation effect
    setIsVisible(true);
    
    // Check if mobile on load and add resize listener
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="relative pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 md:px-20 flex flex-col-reverse md:flex-row justify-between items-center min-h-screen bg-cover bg-center bg-fixed font-title3 overflow-hidden"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      {/* Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      
      {/* Left Content */}
      <div 
        className={`relative z-10 text-center md:text-left flex flex-col items-center md:items-start text-white w-full md:w-1/2 lg:w-5/12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <span className="bg-green-600 font-title text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full mb-3 sm:mb-4 inline-flex items-center">
          <span className="animate-pulse mr-2 ">●</span> Now Delivering In Your Area
        </span>
        
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
          Lunch <span className="text-green-500 relative">
            Box
            <span className="absolute -top-1 -right-2 w-2 h-2 bg-green-400 rounded-full"></span>
          </span>
        </h1>
        
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mt-2 sm:mt-4 text-gray-200">
          Fresh & Healthy Meals <br className="hidden md:block" /> 
          Delivered to Your Doorstep
        </h2>
        
        <p className="mt-3 sm:mt-6 text-sm sm:text-base text-gray-300 max-w-lg">
          Enjoy chef-crafted, nutritionally balanced meals made with locally sourced ingredients. 
          Ready to eat in minutes.
        </p>
        
        {/* Search Bar */}
        <div className="flex mt-5 sm:mt-8 h-12 sm:h-14 md:h-16 w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto md:mx-0 rounded-full shadow-xl overflow-hidden backdrop-blur-sm border border-white/20">
          <div className="flex items-center bg-white/10 px-2 sm:px-4 text-gray-200">
            <FaMapMarkerAlt className="text-green-500" />
          </div>
          <input
            type="text"
            className="flex-grow px-2 sm:px-4 py-2 bg-white/10 text-white outline-none placeholder-gray-400 text-sm sm:text-base"
            placeholder="Enter your delivery pincode..."
          />
          <button className="px-3 sm:px-6 bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-all duration-300 group">
            <span className="mr-2 hidden md:inline text-sm sm:text-base">Check</span>
            <FaArrowRight className="text-base sm:text-lg transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 mt-4 sm:mt-8">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
              <FaClock className="text-green-500 text-sm sm:text-lg" />
            </div>
            <span className="text-gray-200 text-xs sm:text-sm md:text-base">30 Min Delivery</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
              <FaLeaf className="text-green-500 text-sm sm:text-lg" />
            </div>
            <span className="text-gray-200 text-xs sm:text-sm md:text-base">100% Organic</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
              <span className="text-green-500 text-sm sm:text-lg">$</span>
            </div>
            <span className="text-gray-200 text-xs sm:text-sm md:text-base">No Minimum Order</span>
          </div>
        </div>
        
        {/* CTA Buttons - New addition */}
        
      </div>
      
      {/* Right Image */}
      <div 
        className={`relative z-10 mb-8 md:mb-0 flex justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="w-[220px] xs:w-[280px] sm:w-[320px] md:w-[400px] lg:w-[500px] xl:w-[550px] relative">
          <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-center text-xs sm:text-sm rotate-12 shadow-lg">
            20% OFF<br />First Order
          </div>
          <img
            className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
            src="/images/2.png"
            alt="Lunch Box Meal"
          />
          
        </div>
      </div>
      
      {/* Mobile Indicator - Hidden visual element for developers */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 right-2 z-50 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {isMobile ? 'Mobile View' : 'Desktop View'}
        </div>
      )}
    </div>
  );
};

export default Hero;