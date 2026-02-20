import React from "react";
import { Home, ShoppingCart, Settings, Grid } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="
      /* Base styles */
      bg-white shadow-lg
      
      /* Mobile (default) - horizontal top bar */
      w-full h-auto
      flex flex-row items-center justify-between
      py-2 px-4
      rounded-t-xl
      
      /* Small screens */
      sm:py-2 sm:px-5
      
      /* Medium screens */
      md:py-3 md:px-6
      
      /* Large screens - vertical sidebar */
      lg:flex-col lg:w-20 lg:h-full
      lg:justify-start lg:py-8 lg:px-0
      lg:rounded-l-2xl lg:rounded-t-none
      
      /* Extra large screens */
      xl:w-24
      
      /* 2XL screens */
      2xl:w-28
    ">
      {/* Logo */}
      <div className="
        text-red-500 font-bold
        text-xl sm:text-2xl md:text-3xl
        lg:mb-8 lg:text-2xl
        xl:mb-10 xl:text-3xl
        2xl:mb-12 2xl:text-4xl
      ">
        ◎
      </div>
      
      {/* Navigation Icons Container */}
      <div className="
        flex flex-row items-center gap-4
        sm:gap-6 md:gap-8
        lg:flex-col lg:gap-6 lg:flex-1
        xl:gap-8
        2xl:gap-10
      ">
        <Home className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
          lg:w-6 lg:h-6
          xl:w-7 xl:h-7
          2xl:w-8 2xl:h-8
        " />
        
        <Grid className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
          lg:w-6 lg:h-6
          xl:w-7 xl:h-7
          2xl:w-8 2xl:h-8
        " />
        
        <ShoppingCart className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
          lg:w-6 lg:h-6
          xl:w-7 xl:h-7
          2xl:w-8 2xl:h-8
        " />
        
        <Settings className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
          lg:w-6 lg:h-6 lg:mt-auto
          xl:w-7 xl:h-7
          2xl:w-8 2xl:h-8
        " />
      </div>
    </div>
  );
};

export default Sidebar;