/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import thai from "../../assets/png/img_categoryFive.webp";
import salmon from "../../assets/png/img_categoryOne.webp";
import healthy from "../../assets/png/img_categoryTwo.webp";
import bibimbap from "../../assets/png/img_categoryThree.webp";
import beef from "../../assets/png/img_categoryFour.webp";

// Products with assigned barcodes for testing
const allProducts = [
  { 
    title: "Thai Rice Bowl", 
    price: "27.09", 
    image: thai, 
    barcode: "M-MARK2212010015",
    desc: "Spicy Thai Style"
  },
  { 
    title: "Smoke Salmon Rice Bowl", 
    price: "27.09", 
    image: salmon, 
    barcode: "695240103033",
    desc: "With Fresh Salmon"
  },
  { 
    title: "Healthy Rice Bowl", 
    price: "27.09", 
    image: healthy, 
    barcode: "4792210131204",
    desc: "Quinoa Base"
  },
  { 
    title: "Bibimbap Rice Bowl", 
    price: "27.09", 
    image: bibimbap, 
    barcode: "AIPI16002537",
    desc: "Korean Style"
  },
  { 
    title: "Golden Beef Rice Bowl", 
    price: "27.09", 
    image: beef, 
    barcode: "4057733899759",
    desc: "Tender Beef"
  },
  { 
    title: "Thai Rice Bowl", 
    price: "27.09", 
    image: thai, 
    barcode: "THAI2ND456",
    desc: "Spicy Thai Style"
  },
  { 
    title: "Smoke Salmon Rice Bowl", 
    price: "27.09", 
    image: salmon, 
    barcode: "SALM2ND789",
    desc: "With Fresh Salmon"
  },
  { 
    title: "Healthy Rice Bowl", 
    price: "27.09", 
    image: healthy, 
    barcode: "HEALTH2345",
    desc: "Quinoa Base"
  },
  { 
    title: "Bibimbap Rice Bowl", 
    price: "27.09", 
    image: bibimbap, 
    barcode: "BIBIM6789",
    desc: "Korean Style"
  },
  { 
    title: "Golden Beef Rice Bowl", 
    price: "27.09", 
    image: beef, 
    barcode: "GBEEF345678",
    desc: "Tender Beef"
  },
  { 
    title: "Thai Rice Bowl", 
    price: "27.09", 
    image: thai, 
    barcode: "THAI3RD901",
    desc: "Spicy Thai Style"
  },
  { 
    title: "Smoke Salmon Rice Bowl", 
    price: "27.09", 
    image: salmon, 
    barcode: "SALM3RD234",
    desc: "With Fresh Salmon"
  },
  { 
    title: "Healthy Rice Bowl", 
    price: "27.09", 
    image: healthy, 
    barcode: "HEALTH5678",
    desc: "Quinoa Base"
  },
  { 
    title: "Bibimbap Rice Bowl", 
    price: "27.09", 
    image: bibimbap, 
    barcode: "BIBIM9012",
    desc: "Korean Style"
  },
  { 
    title: "Golden Beef Rice Bowl", 
    price: "27.09", 
    image: beef, 
    barcode: "GBEEF789123",
    desc: "Tender Beef"
  },
  { 
    title: "Thai Rice Bowl", 
    price: "27.09", 
    image: thai, 
    barcode: "THAI4TH567",
    desc: "Spicy Thai Style"
  },
  { 
    title: "Smoke Salmon Rice Bowl", 
    price: "27.09", 
    image: salmon, 
    barcode: "SALM4TH890",
    desc: "With Fresh Salmon"
  },
  { 
    title: "Healthy Rice Bowl", 
    price: "27.09", 
    image: healthy, 
    barcode: "HEALTH9012",
    desc: "Quinoa Base"
  },
  { 
    title: "Bibimbap Rice Bowl", 
    price: "27.09", 
    image: bibimbap, 
    barcode: "BIBIM3456",
    desc: "Korean Style"
  },
  { 
    title: "Golden Beef Rice Bowl", 
    price: "27.09", 
    image: beef, 
    barcode: "GBEEF567890",
    desc: "Tender Beef"
  },
];

const ProductGrid = ({ onProductSelect, searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Initialize filtered products with all products
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, []);

  // Filter products based on search term
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
    <div className="w-full max-w-full overflow-hidden px-1 xs:px-2 sm:px-3 md:px-4">
      <h2 className="font-semibold font-sans mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
        Total Products {searchTerm && `(Found: ${filteredProducts.length})`}
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 sm:py-12 md:py-16">
          <p className="text-greyColor text-xs sm:text-sm md:text-base">No Products Found "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid 
          grid-cols-2 
          xs:grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          2xl:grid-cols-6 
          gap-2 xs:gap-1 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5
          justify-items-stretch
          w-full
        ">
          {filteredProducts.map((item, index) => (
            <div key={item.barcode || index} className="w-full min-w-0">
              <ProductCard 
                title={item.title}
                price={item.price}
                image={item.image}
                desc={item.desc}
                barcode={item.barcode}
                onProductClick={onProductSelect}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;