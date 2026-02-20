/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
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

const ProductGrid = ({ onProductSelect, searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      const filtered = allProducts.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.barcode.toLowerCase().includes(term) ||
        (product.desc && product.desc.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchTerm]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-10 pb-3">
        <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
          Total Products {searchTerm && `(Found: ${filteredProducts.length})`}
        </h2>
      </div>

      {/* Scrollable Product Grid */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No Products Found "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredProducts.map((item, index) => (
              <ProductCard 
                key={item.barcode || index}
                title={item.title}
                price={item.price}
                image={item.image}
                desc={item.desc}
                barcode={item.barcode}
                onProductClick={onProductSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;