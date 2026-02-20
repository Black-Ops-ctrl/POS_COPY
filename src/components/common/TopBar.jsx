import React, { useState, useEffect, useRef } from "react";
import avatar from "../../assets/png/img_category.webp";
import { Search } from "lucide-react";

const TopBar = ({ searchTerm, setSearchTerm, onSearch, onBarcodeScanned, onEnterPress }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
  const inputBuffer = useRef("");
  const lastTime = useRef(0);

  // Global barcode scanner detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      if (
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT"
      ) {
        if (activeElement.id === "search-input") {
          return;
        }
        return;
      }

      if (e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta" || e.key === "Tab") {
        return;
      }

      const now = Date.now();
      if (now - lastTime.current > 100) {
        inputBuffer.current = "";
      }
      lastTime.current = now;

      if (e.key === "Enter") {
        e.preventDefault();
      }

      if (e.key !== "Enter") {
        if (e.key.length === 1) {
          inputBuffer.current += e.key;
        }
      } else {
        if (inputBuffer.current.length > 0) {
          const scannedBarcode = inputBuffer.current;
          console.log("Barcode scanned:", scannedBarcode);
          
          const cleanBarcode = scannedBarcode.replace(/[^\x20-\x7E]/g, '').trim();
          
          setLocalSearchTerm(cleanBarcode);
          setSearchTerm(cleanBarcode);
          onBarcodeScanned(cleanBarcode);
          
          inputBuffer.current = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBarcodeScanned, setSearchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    setSearchTerm(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(localSearchTerm);
      
      if (onEnterPress) {
        onEnterPress(localSearchTerm);
      }
    }
  };

  const handleSearchClick = () => {
    onSearch(localSearchTerm);
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full">
      {/* Search Bar - Responsive width */}
      <div className="relative flex-1 max-w-md">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" 
          size={18}
          onClick={handleSearchClick}
        />
        <input
          id="search-input"
          type="text"
          value={localSearchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search or scan barcode..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 border border-transparent focus:border-red-300 text-sm transition-all"
        />
      </div>

      {/* User Info - Fixed */}
      <div className="flex items-center gap-2 flex-shrink-0">
      <img
        src={avatar}
        alt="avatar"
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-200"
      />
      <div className="text-right hidden sm:block">
        <p className="font-semibold text-sm sm:text-base whitespace-nowrap">Lauren Smith</p>
        <p className="text-xs text-gray-400 whitespace-nowrap">Cashier</p>
      </div>
    </div>
    </div>
  );
};

export default TopBar;