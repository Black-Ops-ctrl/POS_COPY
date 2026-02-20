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
      className="bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-gray-100 hover:border-red-200"
    >
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover rounded-lg mb-3"
      />

      <h3 className="font-semibold text-gray-800 text-sm truncate">{title}</h3>
      {desc && (
        <p className="text-xs text-gray-500 mt-1 truncate">{desc}</p>
      )}
      <p className="text-red-500 font-bold text-base mt-2">
        ${price}
      </p>
    </div>
  );
};

export default ProductCard;