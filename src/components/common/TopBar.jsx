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
      // Don't interfere with normal input when user is typing in an input field
      const activeElement = document.activeElement;
      if (
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT"
      ) {
        // If user is typing in search input, let it handle normally
        if (activeElement.id === "search-input") {
          return;
        }
        return; // Ignore if typing in other inputs
      }

      // IMPORTANT: Skip modifier keys (Shift, Ctrl, Alt, Meta)
      if (e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta" || e.key === "Tab") {
        return; // Don't add these to buffer
      }

      const now = Date.now();
      // If more than 100ms between keys, it's probably not a scanner
      if (now - lastTime.current > 100) {
        inputBuffer.current = "";
      }
      lastTime.current = now;

      // Prevent default for Enter to avoid form submission
      if (e.key === "Enter") {
        e.preventDefault();
      }

      // Accumulate characters until Enter is pressed (scanner sends Enter)
      if (e.key !== "Enter") {
        // Only add if it's a printable character (length 1)
        if (e.key.length === 1) {
          inputBuffer.current += e.key;
        }
      } else {
        // Enter key pressed - complete the barcode scan
        if (inputBuffer.current.length > 0) {
          const scannedBarcode = inputBuffer.current;
          console.log("Barcode scanned:", scannedBarcode);
          
          // Clean the barcode - remove any remaining non-printable chars
          const cleanBarcode = scannedBarcode.replace(/[^\x20-\x7E]/g, '').trim();
          
          // Set the barcode in search field and trigger scan
          setLocalSearchTerm(cleanBarcode);
          setSearchTerm(cleanBarcode);
          onBarcodeScanned(cleanBarcode);
          
          // Clear buffer
          inputBuffer.current = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBarcodeScanned, setSearchTerm]);

  // Handle manual input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    setSearchTerm(value);
  };

  // Handle search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(localSearchTerm);
      
      // Optional: Auto-select first product when pressing Enter
      if (onEnterPress) {
        onEnterPress(localSearchTerm);
      }
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    onSearch(localSearchTerm);
  };

  return (
    <div className="flex flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 w-full">
      {/* Search Bar - Reduced length */}
      <div className="relative flex-1 max-w-[250px] xs:max-w-[280px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]">
        <Search 
          className="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-500 cursor-pointer" 
          size={14}
          onClick={handleSearchClick}
        />
        <input
          id="search-input"
          type="text"
          value={localSearchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search or scan barcode..."
          className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 rounded-full bg-greyColorOne focus:outline-none border border-blackColor text-greyColor text-xs sm:text-sm"
        />
      </div>

      {/* User Info - Fixed width to stay on same line */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <img
          src={avatar}
          alt="avatar"
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
        />
        <div className="text-right">
          <p className="font-semibold font-sans text-xs sm:text-sm whitespace-nowrap">Lauren Smith</p>
          <p className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">Cashier</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;