import React from "react";

const ProductCard = ({ image, title, price, desc, barcode, onProductClick }) => {
  const handleClick = () => {
    if (onProductClick && barcode) {
      console.log("Product clicked with barcode:", barcode);
      onProductClick(barcode);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-lightGreyColor rounded-xl p-2 sm:p-3 md:p-4 shadow-sm hover:shadow-lg transition cursor-pointer w-full"
    >
      <img
        src={image}
        alt={title}
        className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-full object-cover rounded-xl mb-2 sm:mb-3 md:mb-4"
      />

      <h3 className="font-semibold font-sans text-sm sm:text-base md:text-md truncate">{title}</h3>
      {desc && (
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">{desc}</p>
      )}
      <p className="text-blackColor font-semibold text-sm sm:text-base md:text-md mt-0.5 sm:mt-1">
        ${price}
      </p>
    </div>
  );
};

export default ProductCard;