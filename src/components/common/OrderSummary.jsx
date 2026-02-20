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

  // Complete product database with all 20 items
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

  // Auto-scroll to bottom when new items added
  useEffect(() => {
    if (scrollContainerRef.current && cartItems.length > 0) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [cartItems.length]);

  // Handle scanned barcode
  useEffect(() => {
    if (scannedBarcode && productDatabase[scannedBarcode]) {
      addToCart(productDatabase[scannedBarcode]);
      onBarcodeProcessed(); 
    }
  }, [scannedBarcode, onBarcodeProcessed]);

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
      prev.map((item) => 
        item.barcode === barcode 
          ? { ...item, selected: !item.selected } 
          : item
      )
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

  // Calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const parsedDiscount = discountPercentage === "" ? 0 : parseFloat(discountPercentage) || 0;
  const discountAmount = (subtotal * parsedDiscount) / 100;
  const tax = 1.99;
  const totalAfterDiscount = subtotal - discountAmount;
  const totalAmount = totalAfterDiscount + tax;
  const payback = receivedAmount && parseFloat(receivedAmount) - totalAmount;

  const isAnySelected = cartItems.some((item) => item.selected);
  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);

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
    <div className="bg-gray-50 rounded-xl h-full flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">
            Cart Items ({cartItems.length})
          </h2>
          <button
            onClick={handleDelete}
            disabled={!isAnySelected}
            className={`p-2 rounded-lg transition-colors ${
              isAnySelected 
                ? "hover:bg-red-50 text-red-500" 
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <img src={deleteIcon} alt="delete" className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-red-500 cursor-pointer rounded"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
        )}
      </div>

      {/* Scrollable Items */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8 text-sm">
            Your cart is empty
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item.barcode} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleSelect(item.barcode)}
                className="w-4 h-4 accent-red-500 cursor-pointer rounded mt-1"
              />
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.barcode, -1)}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.barcode, 1)}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="font-bold text-red-500 text-sm whitespace-nowrap">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Billing Section */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Discount</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={discountPercentage}
                  onChange={handleDiscountChange}
                  onBlur={handleDiscountBlur}
                  className="w-12 p-1 border border-gray-300 rounded text-center text-sm"
                  placeholder="2"
                />
                <span className="text-red-500 text-sm font-medium">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-red-500">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => handlePaymentMethodChange("cash")}
                    className="accent-red-500"
                  />
                  <span className="text-sm">Cash</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => handlePaymentMethodChange("card")}
                    className="accent-red-500"
                  />
                  <span className="text-sm">Card</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Received</span>
              <input
                type="number"
                value={receivedAmount}
                onChange={handleReceivedAmountChange}
                className="w-24 p-1.5 border border-gray-300 rounded text-sm text-right"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            {receivedAmount && payback !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Change</span>
                <span className={payback < 0 ? "text-red-500" : "text-green-600 font-medium"}>
                  ${payback.toFixed(2)}
                </span>
              </div>
            )}

            <button 
              onClick={handlePrint}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium mt-2"
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;