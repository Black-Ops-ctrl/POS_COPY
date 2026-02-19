import React from "react";
import { Home, ShoppingCart, Settings, Grid } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="
      w-full 
      xs:w-full 
      sm:w-full 
      md:w-full 
      lg:w-20 
      xl:w-20 
      2xl:w-20 
      bg-white 
      shadow-lg 
      flex 
      flex-row 
      xs:flex-row 
      sm:flex-row 
      md:flex-row 
      lg:flex-col 
      xl:flex-col 
      2xl:flex-col 
      items-center 
      justify-between 
      xs:justify-between 
      sm:justify-between 
      md:justify-between 
      lg:justify-start 
      xl:justify-start 
      2xl:justify-start 
      py-1.5 
      xs:py-1.5 
      sm:py-2 
      md:py-2.5 
      lg:py-6 
      xl:py-6 
      2xl:py-6 
      px-3 
      xs:px-3 
      sm:px-4 
      md:px-5 
      lg:px-0 
      xl:px-0 
      2xl:px-0 
      gap-2 
      xs:gap-2 
      sm:gap-3 
      md:gap-4 
      lg:gap-8 
      xl:gap-8 
      2xl:gap-8 
      rounded-t-xl 
      xs:rounded-t-xl 
      sm:rounded-t-xl 
      md:rounded-t-xl 
      lg:rounded-l-2xl 
      xl:rounded-l-2xl 
      2xl:rounded-l-2xl 
      lg:rounded-t-none 
      xl:rounded-t-none 
      2xl:rounded-t-none
    ">
      {/* Logo */}
      <div className="
        text-redColor 
        font-bold 
        text-lg 
        xs:text-lg 
        sm:text-xl 
        md:text-xl 
        lg:text-2xl 
        xl:text-2xl 
        2xl:text-2xl
      ">
        ◎
      </div>
      
      {/* Navigation Icons */}
      <Home className="
        text-gray-400 
        hover:text-red-500 
        cursor-pointer 
        w-4 h-4 
        xs:w-4 xs:h-4 
        sm:w-4.5 sm:h-4.5 
        md:w-5 md:h-5 
        lg:w-6 lg:h-6 
        xl:w-6 xl:h-6 
        2xl:w-6 2xl:h-6
      " />
      
      <Grid className="
        text-gray-400 
        hover:text-red-500 
        cursor-pointer 
        w-4 h-4 
        xs:w-4 xs:h-4 
        sm:w-4.5 sm:h-4.5 
        md:w-5 md:h-5 
        lg:w-6 lg:h-6 
        xl:w-6 xl:h-6 
        2xl:w-6 2xl:h-6
      " />
      
      <ShoppingCart className="
        text-gray-400 
        hover:text-red-500 
        cursor-pointer 
        w-4 h-4 
        xs:w-4 xs:h-4 
        sm:w-4.5 sm:h-4.5 
        md:w-5 md:h-5 
        lg:w-6 lg:h-6 
        xl:w-6 xl:h-6 
        2xl:w-6 2xl:h-6
      " />
      
      <Settings className="
        text-gray-400 
        hover:text-red-500 
        cursor-pointer 
        w-4 h-4 
        xs:w-4 xs:h-4 
        sm:w-4.5 sm:h-4.5 
        md:w-5 md:h-5 
        lg:w-6 lg:h-6 
        xl:w-6 xl:h-6 
        2xl:w-6 2xl:h-6
        lg:mt-auto 
        xl:mt-auto 
        2xl:mt-auto
      " />
    </div>
  );
};

export default Sidebar;