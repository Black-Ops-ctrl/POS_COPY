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
      py-1.5 px-3
      rounded-t-xl
      
      /* Small screens */
      sm:py-2 sm:px-4
      
      /* Medium screens */
      md:py-2 md:px-5
      
      /* Large screens - vertical sidebar */
      lg:flex-col lg:w-16 lg:h-full
      lg:justify-start lg:py-4 lg:px-0
      lg:rounded-l-2xl lg:rounded-t-none
      
      /* Extra large screens */
      xl:w-20 xl:py-5
      
      /* 2XL screens */
      2xl:w-24 2xl:py-6
    ">
      {/* Logo */}
      <div className="
        text-red-500 font-bold
        text-lg sm:text-xl md:text-2xl
        lg:mb-6 lg:text-xl
        xl:mb-8 xl:text-2xl
        2xl:mb-10 2xl:text-3xl
      ">
        ◎
      </div>
      
      {/* Navigation Icons Container */}
      <div className="
        flex flex-row items-center gap-3
        sm:gap-4 md:gap-5
        lg:flex-col lg:gap-4 lg:flex-1
        xl:gap-5
        2xl:gap-6
      ">
        <Home className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5
          lg:w-5 lg:h-5
          xl:w-6 xl:h-6
          2xl:w-6 2xl:h-6
        " />
        
        <Grid className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5
          lg:w-5 lg:h-5
          xl:w-6 xl:h-6
          2xl:w-6 2xl:h-6
        " />
        
        <ShoppingCart className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5
          lg:w-5 lg:h-5
          xl:w-6 xl:h-6
          2xl:w-6 2xl:h-6
        " />
        
        <Settings className="
          text-gray-400 hover:text-red-500 cursor-pointer transition-colors
          w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5
          lg:w-5 lg:h-5 lg:mt-auto
          xl:w-6 xl:h-6
          2xl:w-6 2xl:h-6
        " />
      </div>
    </div>
  );
};

export default Sidebar;