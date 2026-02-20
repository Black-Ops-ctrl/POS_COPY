/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import thai from "../../assets/png/img_category.webp";
import salmon from "../../assets/png/img_categoryOne.webp";
import healthy from "../../assets/png/img_categoryTwo.webp";
import bibimbap from "../../assets/png/img_categoryThree.webp";
import beef from "../../assets/png/img_categoryFour.webp";
import deleteIcon from "../../assets/png/ic_delete_button.png";
import { printReceipt } from "./../common/PrintReceipt"; 

const OrderSummary = ({ scannedBarcode, onBarcodeProcessed }) => {
  const [cartItems, setCartItems] = useState([]);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("2");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const scrollContainerRef = useRef(null);

  const productDatabase = {
    "M-MARK2212010015": { 
      id: 1, 
      title: "Thai Rice Bowl", 
      desc: "Over Hard, Mild", 
      price: 27.09, 
      image: thai 
    },
    "695240103033": { 
      id: 2, 
      title: "Smoke Salmon Rice Bowl", 
      desc: "Over Hard, Mild", 
      price: 27.09, 
      image: salmon 
    },
    "4792210131204": { 
      id: 3, 
      title: "Healthy Rice Bowl", 
      desc: "Over Hard, Mild", 
      price: 27.09, 
      image: healthy 
    },
    "AIPI16002537": { 
      id: 4, 
      title: "Bibimbap Rice Bowl", 
      desc: "Over Hard, Mild", 
      price: 27.09, 
      image: bibimbap 
    },
    "4057733899759": { 
      id: 5, 
      title: "Golden Beef Rice Bowl", 
      desc: "Over Hard, Mild", 
      price: 27.09, 
      image: beef 
    },
    "THAI2ND456": { 
      id: 6, 
      title: "Thai Rice Bowl", 
      desc: "Extra Spicy", 
      price: 27.09, 
      image: thai 
    },
    "SALM2ND789": { 
      id: 7, 
      title: "Smoke Salmon Rice Bowl", 
      desc: "Extra Salmon", 
      price: 27.09, 
      image: salmon 
    },
    "HEALTH2345": { 
      id: 8, 
      title: "Healthy Rice Bowl", 
      desc: "Vegan Option", 
      price: 27.09, 
      image: healthy 
    },
    "BIBIM6789": { 
      id: 9, 
      title: "Bibimbap Rice Bowl", 
      desc: "With Egg", 
      price: 27.09, 
      image: bibimbap 
    },
    "GBEEF345678": { 
      id: 10, 
      title: "Golden Beef Rice Bowl", 
      desc: "Well Done", 
      price: 27.09, 
      image: beef 
    },
    "THAI3RD901": { 
      id: 11, 
      title: "Thai Rice Bowl", 
      desc: "Mild Spice", 
      price: 27.09, 
      image: thai 
    },
    "SALM3RD234": { 
      id: 12, 
      title: "Smoke Salmon Rice Bowl", 
      desc: "Light Salt", 
      price: 27.09, 
      image: salmon 
    },
    "HEALTH5678": { 
      id: 13, 
      title: "Healthy Rice Bowl", 
      desc: "Gluten Free", 
      price: 27.09, 
      image: healthy 
    },
    "BIBIM9012": { 
      id: 14, 
      title: "Bibimbap Rice Bowl", 
      desc: "With Tofu", 
      price: 27.09, 
      image: bibimbap 
    },
    "GBEEF789123": { 
      id: 15, 
      title: "Golden Beef Rice Bowl", 
      desc: "Medium Rare", 
      price: 27.09, 
      image: beef 
    },
    "THAI4TH567": { 
      id: 16, 
      title: "Thai Rice Bowl", 
      desc: "Extra Vegetables", 
      price: 27.09, 
      image: thai 
    },
    "SALM4TH890": { 
      id: 17, 
      title: "Smoke Salmon Rice Bowl", 
      desc: "No Rice", 
      price: 27.09, 
      image: salmon 
    },
    "HEALTH9012": { 
      id: 18, 
      title: "Healthy Rice Bowl", 
      desc: "Low Carb", 
      price: 27.09, 
      image: healthy 
    },
    "BIBIM3456": { 
      id: 19, 
      title: "Bibimbap Rice Bowl", 
      desc: "Spicy Sauce", 
      price: 27.09, 
      image: bibimbap 
    },
    "GBEEF567890": { 
      id: 20, 
      title: "Golden Beef Rice Bowl", 
      desc: "Extra Beef", 
      price: 27.09, 
      image: beef 
    },
  };

  useEffect(() => {
    if (scrollContainerRef.current && cartItems.length > 0) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [cartItems.length]);

  useEffect(() => {
    if (scannedBarcode && productDatabase[scannedBarcode]) {
      addToCart(productDatabase[scannedBarcode]);
      onBarcodeProcessed(); 
    }
  }, [scannedBarcode]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.barcode === scannedBarcode);
      
      if (existingItem) {
        return prev.map((item) =>
          item.barcode === scannedBarcode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { 
          ...product, 
          barcode: scannedBarcode, 
          quantity: 1, 
          selected: false 
        }];
      }
    });
  };

  const handleSelect = (barcode) => {
    setCartItems((prev) =>
      prev.map((item) => (item.barcode === barcode ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAll = () => {
    const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const handleDelete = () => {
    setCartItems((prev) => prev.filter((item) => !item.selected));
  };

  const handleQuantityChange = (barcode, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.barcode === barcode
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const parsedDiscount = discountPercentage === "" ? 0 : parseFloat(discountPercentage) || 0;
  const discountAmount = (subtotal * parsedDiscount) / 100;

  const isAnySelected = cartItems.some((item) => item.selected);
  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);

  const handleReceivedAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setReceivedAmount(value);
    }
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setDiscountPercentage(value);
    }
  };

  const handleDiscountBlur = () => {
    if (discountPercentage === "" || discountPercentage === "0") {
      setDiscountPercentage("2");
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const tax = 1.99;
  const totalAfterDiscount = subtotal - discountAmount;
  const totalAmount = totalAfterDiscount + tax;
  const payback = receivedAmount && parseFloat(receivedAmount) - totalAmount;

  const generateInvoiceNo = () => {
    return `INV-${Date.now().toString().slice(-8)}`;
  };

  const generateFbrInvoiceNo = () => {
    return `FBR-${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`;
  };

  const handlePrint = () => {
    const receiptData = {
      cartItems,
      subtotal,
      discountPercentage: parsedDiscount,
      discountAmount,
      tax,
      totalAmount,
      paymentMethod,
      receivedAmount,
      payback,
      invoiceNo: generateInvoiceNo(),
      fbrInvoiceNo: generateFbrInvoiceNo(),
      shopName: "Smart Shop",
      shopAddress: "Abc Street, City, Country",
      shopPhone: "+92-308-4416769"
    };
    
    printReceipt(receiptData);
  };

  return (
    <div className="w-full max-w-full md:max-w-[360px] bg-gray-50 border-l p-2 xs:p-2 sm:p-2.5 md:p-3 flex flex-col h-full overflow-hidden">
      {/* Header with Delete Button */}
      <div className="flex justify-between items-center mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 flex-shrink-0">
        <h2 className="font-semibold text-xs xs:text-sm sm:text-sm md:text-base truncate">
          Cart Items ({cartItems.length})
        </h2>

        <button
          onClick={handleDelete}
          disabled={!isAnySelected}
          className={`p-1 xs:p-1 sm:p-1.5 md:p-2 rounded-md transition flex-shrink-0 ${isAnySelected ? "" : "opacity-30 cursor-not-allowed"}`}
        >
          <img src={deleteIcon} alt="delete" className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Select All Checkbox */}
      {cartItems.length > 0 && (
        <div className="flex items-center gap-1.5 xs:gap-1.5 sm:gap-2 mb-2 xs:mb-2 sm:mb-2.5 md:mb-3 pl-1 flex-shrink-0">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="w-3 h-3 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 accent-redColor cursor-pointer flex-shrink-0"
          />
          <span className="font-sans font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm">Select All</span>
        </div>
      )}

      {/* Scrollable Product Items with auto-scroll */}
      <div 
        ref={scrollContainerRef}
        className="space-y-2 xs:space-y-2 sm:space-y-2.5 md:space-y-3 overflow-y-auto flex-1 min-h-0 pr-1 xs:pr-1 sm:pr-1.5 md:pr-2 pl-1 scroll-smooth"
      >
        {cartItems.length === 0 ? (
          <p className="text-center text-greyColor py-4 xs:py-5 sm:py-6 md:py-8 text-xs xs:text-sm sm:text-sm md:text-base">
            Empty Cart.
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item.barcode} className="flex items-center gap-1.5 xs:gap-1.5 sm:gap-2 md:gap-2.5">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleSelect(item.barcode)}
                className="w-3 h-3 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 accent-red-500 cursor-pointer flex-shrink-0"
              />
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-8 h-8 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm mb-0.5 truncate">
                  {item.title}
                </p>
                <p className="text-[8px] xs:text-[10px] sm:text-[10px] md:text-xs text-gray-400 truncate">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-0.5 xs:gap-0.5 sm:gap-1 md:gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleQuantityChange(item.barcode, -1)}
                  className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300 text-[10px] xs:text-xs sm:text-xs md:text-sm"
                >
                  -
                </button>
                <span className="font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.barcode, 1)}
                  className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300 text-[10px] xs:text-xs sm:text-xs md:text-sm"
                >
                  +
                </button>
              </div>
              <p className="font-semibold font-sans text-blackColor text-[10px] xs:text-xs sm:text-xs md:text-sm flex-shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Billing Section */}
      {cartItems.length > 0 && (
        <div className="mt-auto pt-2 xs:pt-2 sm:pt-2.5 md:pt-3 pr-1 xs:pr-1 sm:pr-1.5 md:pr-2 pl-1 xs:pl-1 sm:pl-1.5 md:pl-2 border-t border-gray-200">
          {/* Tax */}
          <div className="flex justify-between text-[10px] xs:text-xs sm:text-xs md:text-sm font-semibold mb-0.5 xs:mb-0.5 sm:mb-1 md:mb-1.5">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>

          {/* Subtotal */}
          <div className="flex justify-between text-[10px] xs:text-xs sm:text-xs md:text-sm font-semibold mb-0.5 xs:mb-0.5 sm:mb-1 md:mb-1.5">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>

          {/* Discount */}
          <div className="flex justify-between items-center text-[10px] xs:text-xs sm:text-xs md:text-sm font-semibold mb-0.5 xs:mb-0.5 sm:mb-1 md:mb-1.5">
            <span className="whitespace-nowrap">Discount ({parsedDiscount}%)</span>
            <div className="flex items-center gap-0.5 xs:gap-0.5 sm:gap-1 md:gap-1.5 ml-1 xs:ml-1 sm:ml-1.5 md:ml-2">
              <input
                type="text"
                value={discountPercentage}
                onChange={handleDiscountChange}
                onBlur={handleDiscountBlur}
                className="w-6 xs:w-6 sm:w-8 md:w-10 lg:w-12 p-0.5 xs:p-0.5 sm:p-0.5 md:p-1 border border-red-300 rounded-md text-center text-[8px] xs:text-[10px] sm:text-xs md:text-sm"
                placeholder="2"
              />
              <span className="text-red-500 text-[8px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>

          {/* Total Amount */}
          <div className="flex justify-between font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm mt-0.5 xs:mt-0.5 sm:mt-1 md:mt-1.5">
            <span>Total Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>

          {/* Payment Method */}
          <div className="flex justify-between items-center font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm mt-0.5 xs:mt-0.5 sm:mt-1 md:mt-1.5">
            <span>Payment Method</span>
            <div className="flex gap-1 xs:gap-1 sm:gap-1.5 md:gap-2">
              <label className="flex items-center gap-0.5 xs:gap-0.5 sm:gap-0.5 md:gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => handlePaymentMethodChange("cash")}
                  className="accent-red-500 w-2.5 h-2.5 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                />
                <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm">Cash</span>
              </label>
              <label className="flex items-center gap-0.5 xs:gap-0.5 sm:gap-0.5 md:gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => handlePaymentMethodChange("card")}
                  className="accent-red-500 w-2.5 h-2.5 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                />
                <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm">Card</span>
              </label>
            </div>
          </div>
          <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>

          {/* Received Amount */}
          <div className="flex justify-between items-center font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm mt-0.5 xs:mt-0.5 sm:mt-1 md:mt-1.5">
            <span>Received Amount</span>
            <input
              type="number"
              value={receivedAmount}
              onChange={handleReceivedAmountChange}
              className="w-14 xs:w-14 sm:w-16 md:w-20 lg:w-24 p-0.5 xs:p-0.5 sm:p-0.5 md:p-1 border border-red-300 rounded-md text-[8px] xs:text-[10px] sm:text-xs md:text-sm"
              min="0"
              step="0.01"
            />
          </div>
          <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>

          {/* Payback */}
          {receivedAmount && payback !== undefined && (
            <>
              <div className="flex justify-between font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm mt-1 xs:mt-1 sm:mt-1.5 md:mt-2">
                <span>Payback</span>
                <span className={payback < 0 ? "text-red-500" : "text-green-500"}>
                  ${payback.toFixed(2)}
                </span>
              </div>
              <div className="border-b border-red-300 my-0.5 xs:my-0.5 sm:my-1 md:my-1.5"></div>
            </>
          )}

          {/* Print Button */}
          <button 
            onClick={handlePrint}
            className="w-full bg-red-500 text-white py-1.5 xs:py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-xl mt-2 xs:mt-2 sm:mt-2.5 md:mt-3 hover:bg-red-600 transition text-[10px] xs:text-xs sm:text-xs md:text-sm"
          >
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;