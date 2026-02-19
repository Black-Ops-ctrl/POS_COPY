import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OrderSummary from "../common/OrderSummary";
import TopBar from "../common/TopBar";
import ProductGrid from "../common/ProductGrid";

// Import all products for the Enter key feature
import thai from "../../assets/png/img_categoryFive.webp";
import salmon from "../../assets/png/img_categoryOne.webp";
import healthy from "../../assets/png/img_categoryTwo.webp";
import bibimbap from "../../assets/png/img_categoryThree.webp";
import beef from "../../assets/png/img_categoryFour.webp";

const allProducts = [
  { title: "Thai Rice Bowl", price: "27.09", image: thai, barcode: "M-MARK2212010015", desc: "Spicy Thai Style" },
  { title: "Smoke Salmon Rice Bowl", price: "27.09", image: salmon, barcode: "695240103033", desc: "With Fresh Salmon" },
  { title: "Healthy Rice Bowl", price: "27.09", image: healthy, barcode: "4792210131204", desc: "Quinoa Base" },
  { title: "Bibimbap Rice Bowl", price: "27.09", image: bibimbap, barcode: "AIPI16002537", desc: "Korean Style" },
  { title: "Golden Beef Rice Bowl", price: "27.09", image: beef, barcode: "4057733899759", desc: "Tender Beef" },
  { title: "Thai Rice Bowl", price: "27.09", image: thai, barcode: "THAI2ND456", desc: "Spicy Thai Style" },
  { title: "Smoke Salmon Rice Bowl", price: "27.09", image: salmon, barcode: "SALM2ND789", desc: "With Fresh Salmon" },
  { title: "Healthy Rice Bowl", price: "27.09", image: healthy, barcode: "HEALTH2345", desc: "Quinoa Base" },
  { title: "Bibimbap Rice Bowl", price: "27.09", image: bibimbap, barcode: "BIBIM6789", desc: "Korean Style" },
  { title: "Golden Beef Rice Bowl", price: "27.09", image: beef, barcode: "GBEEF345678", desc: "Tender Beef" },
  { title: "Thai Rice Bowl", price: "27.09", image: thai, barcode: "THAI3RD901", desc: "Spicy Thai Style" },
  { title: "Smoke Salmon Rice Bowl", price: "27.09", image: salmon, barcode: "SALM3RD234", desc: "With Fresh Salmon" },
  { title: "Healthy Rice Bowl", price: "27.09", image: healthy, barcode: "HEALTH5678", desc: "Quinoa Base" },
  { title: "Bibimbap Rice Bowl", price: "27.09", image: bibimbap, barcode: "BIBIM9012", desc: "Korean Style" },
  { title: "Golden Beef Rice Bowl", price: "27.09", image: beef, barcode: "GBEEF789123", desc: "Tender Beef" },
  { title: "Thai Rice Bowl", price: "27.09", image: thai, barcode: "THAI4TH567", desc: "Spicy Thai Style" },
  { title: "Smoke Salmon Rice Bowl", price: "27.09", image: salmon, barcode: "SALM4TH890", desc: "With Fresh Salmon" },
  { title: "Healthy Rice Bowl", price: "27.09", image: healthy, barcode: "HEALTH9012", desc: "Quinoa Base" },
  { title: "Bibimbap Rice Bowl", price: "27.09", image: bibimbap, barcode: "BIBIM3456", desc: "Korean Style" },
  { title: "Golden Beef Rice Bowl", price: "27.09", image: beef, barcode: "GBEEF567890", desc: "Tender Beef" },
];

const POSLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scannedBarcode, setScannedBarcode] = useState(null);

  // Handle barcode scan from TopBar
  const handleBarcodeScanned = (barcode) => {
    console.log("Barcode scanned in POSLayout:", barcode);
    setScannedBarcode(barcode);
    setSearchTerm(""); // Clear search term after scanning
  };

  // Handle product selection from grid
  const handleProductSelect = (barcode) => {
    console.log("Product selected with barcode:", barcode);
    setScannedBarcode(barcode);
  };

  // Handle search
  const handleSearch = (term) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  // Optional: Handle Enter key to auto-select first product
  const handleEnterPress = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    const term = searchTerm.toLowerCase().trim();
    // Find the first product that matches the search
    const matchedProduct = allProducts.find(product => 
      product.title.toLowerCase().includes(term) ||
      (product.barcode && product.barcode.toLowerCase().includes(term)) ||
      (product.desc && product.desc.toLowerCase().includes(term))
    );
    
    if (matchedProduct) {
      console.log("Enter pressed - auto-selecting product:", matchedProduct.title);
      setScannedBarcode(matchedProduct.barcode);
      setSearchTerm(""); // Clear search after selection
    }
  };

  // Clear scanned barcode after processing
  const handleBarcodeProcessed = () => {
    console.log("Barcode processed");
    setScannedBarcode(null);
  };

  return (
    <div className="
      h-screen 
      bg-rose-100 
      p-1 
      xs:p-1.5 
      sm:p-2 
      md:p-3 
      lg:p-4 
      xl:p-5 
      2xl:p-6 
      overflow-hidden
    ">
      <div className="
        bg-white 
        rounded-lg 
        xs:rounded-lg 
        sm:rounded-xl 
        md:rounded-2xl 
        lg:rounded-3xl 
        xl:rounded-3xl 
        2xl:rounded-3xl 
        shadow-xl 
        h-full 
        flex 
        flex-col 
        lg:flex-row 
        overflow-hidden
      ">
        <Sidebar />

        <div className="
          flex-1 
          flex 
          flex-col 
          lg:flex-row 
          overflow-hidden
        ">
          {/* Main Content Area */}
          <div className="
            flex-1 
            p-2 
            xs:p-2.5 
            sm:p-3 
            md:p-4 
            lg:p-5 
            xl:p-6 
            2xl:p-8 
            overflow-y-auto 
            order-2 
            lg:order-1
          ">
            <TopBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              onBarcodeScanned={handleBarcodeScanned}
              onEnterPress={handleEnterPress}
            />
            <ProductGrid 
              onProductSelect={handleProductSelect}
              searchTerm={searchTerm}
            />
          </div>
          
          {/* Order Summary - Full width on mobile, fixed width on desktop */}
          <div className="
            w-full 
            xs:w-full 
            sm:w-full 
            md:w-full 
            lg:w-auto 
            xl:w-auto 
            2xl:w-auto 
            order-1 
            lg:order-2 
            border-b 
            lg:border-b-0 
            lg:border-l 
            border-gray-200
          ">
            <OrderSummary 
              scannedBarcode={scannedBarcode}
              onBarcodeProcessed={handleBarcodeProcessed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSLayout;