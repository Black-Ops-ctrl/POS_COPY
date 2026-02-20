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
];

const POSLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scannedBarcode, setScannedBarcode] = useState(null);

  const handleBarcodeScanned = (barcode) => {
    console.log("Barcode scanned in POSLayout:", barcode);
    setScannedBarcode(barcode);
    setSearchTerm("");
  };

  const handleProductSelect = (barcode) => {
    console.log("Product selected with barcode:", barcode);
    setScannedBarcode(barcode);
  };

  const handleSearch = (term) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  const handleEnterPress = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    const term = searchTerm.toLowerCase().trim();
    const matchedProduct = allProducts.find(product => 
      product.title.toLowerCase().includes(term) ||
      (product.barcode && product.barcode.toLowerCase().includes(term)) ||
      (product.desc && product.desc.toLowerCase().includes(term))
    );
    
    if (matchedProduct) {
      console.log("Enter pressed - auto-selecting product:", matchedProduct.title);
      setScannedBarcode(matchedProduct.barcode);
      setSearchTerm("");
    }
  };

  const handleBarcodeProcessed = () => {
    console.log("Barcode processed");
    setScannedBarcode(null);
  };

  return (
    <div className="h-screen bg-rose-50 p-2 sm:p-3 md:p-4 overflow-hidden">
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl h-full flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar - Fixed for all screens */}
        <Sidebar />

        {/* Main Content Area - Takes remaining space */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TopBar Section */}
          <div className="p-3 sm:p-4 md:p-5 pb-2 md:pb-3">
            <TopBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              onBarcodeScanned={handleBarcodeScanned}
              onEnterPress={handleEnterPress}
            />
          </div>

          {/* Product Grid and Order Summary - Flex row on larger screens */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 gap-4">
            {/* Product Grid - Takes remaining space */}
            <div className="flex-1 min-h-0 min-w-0">
              <ProductGrid 
                onProductSelect={handleProductSelect}
                searchTerm={searchTerm}
              />
            </div>

            {/* Order Summary - Fixed width on larger screens, full width on mobile */}
            <div className="lg:w-70 xl:w-90 flex-shrink-0">
              <OrderSummary 
                scannedBarcode={scannedBarcode}
                onBarcodeProcessed={handleBarcodeProcessed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSLayout;