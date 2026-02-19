
export const printReceipt = (receiptData) => {
  const { 
    cartItems, 
    subtotal, 
    discountPercentage, 
    discountAmount, 
    tax, 
    totalAmount, 
    paymentMethod, 
    receivedAmount,
    payback,
    invoiceNo,
    fbrInvoiceNo,
    shopName,
    shopAddress,
    shopPhone
  } = receiptData;

  // Format date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Create a new window for printing
  const printWindow = window.open('', '_blank');  
  // Generate receipt HTML with auto-adjusting layout
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt</title>
        <style>
          /* Auto-adjust to any paper size */
          @page {
            margin: 0;
            size: 58mm auto; 
          }
          
          body {
            margin: 0;
            padding: 5px;
            width: 58mm;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            background: white;
          }
          
          /* Container that auto-adjusts to paper width */
          .receipt {
            width: 100%;
            max-width: 80mm; /* Maximum width for thermal printers */
            margin: 0 auto;
            box-sizing: border-box;
          }
          
          /* Responsive grid that adjusts to paper size */
          .grid-header, .grid-item {
            display: grid;
            grid-template-columns: 60% 15% 25%; /* Description, Qty, Price */
            gap: 5px;
            width: 100%;
            box-sizing: border-box;
          }
          
          /* For very narrow papers (like 58mm) */
          @media (max-width: 70mm) {
            .grid-header, .grid-item {
              grid-template-columns: 55% 15% 30%;
              gap: 3px;
              font-size: 10px;
            }
            
            body {
              font-size: 10px;
            }
            
            .receipt {
              max-width: 100%;
            }
          }
          
          /* For wider papers (like 80mm) */
          @media (min-width: 80mm) {
            .grid-header, .grid-item {
              grid-template-columns: 65% 12% 23%;
            }
          }
          
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .text-left { text-align: left; }
          .font-bold { font-weight: bold; }
          .font-normal { font-weight: normal; }
          
          .border-t { border-top: 1px solid #000; }
          .border-b { border-bottom: 1px solid #000; }
          .border-dotted { border-bottom: 1px dotted #000; }
          
          .mt-1 { margin-top: 4px; }
          .mt-2 { margin-top: 8px; }
          .mt-3 { margin-top: 12px; }
          .mt-4 { margin-top: 16px; }
          
          .mb-1 { margin-bottom: 4px; }
          .mb-2 { margin-bottom: 8px; }
          .mb-3 { margin-bottom: 12px; }
          
          .my-1 { margin: 4px 0; }
          .my-2 { margin: 8px 0; }
          
          .py-1 { padding: 4px 0; }
          .py-2 { padding: 8px 0; }
          
          .truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .items-center { align-items: center; }
          
          .text-xs { font-size: 12px; }
          .text-sm { font-size: 14px; }
          
          /* Responsive text sizes */
          @media (max-width: 70mm) {
            .text-xs { font-size: 10px; }
            .text-sm { font-size: 12px; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <!-- Shop Info -->
          <div class="text-center mb-2">
            <h1 class="font-bold text-sm" style="margin: 0;">${shopName}</h1>
            <div class="text-xs" style="margin-top: 2px;">${shopAddress}</div>
            <div class="text-xs">Telp. ${shopPhone}</div>
          </div>

          <!-- Receipt Title -->
          <div class="text-center font-bold text-sm border-t border-b py-1 my-2">
            CASH RECEIPT
          </div>

          <!-- Date and Time -->
          <div class="flex justify-between text-xs mb-2">
            <span>Date: ${formattedDate}</span>
            <span>Time: ${formattedTime}</span>
          </div>

          <!-- Invoice Numbers -->
          <div class="mb-2 text-xs">
            <div class="flex justify-between">
              <span>Invoice No:</span>
              <span class="font-bold">${invoiceNo}</span>
            </div>
            <div class="flex justify-between">
              <span>FBR Invoice No:</span>
              <span class="font-bold">${fbrInvoiceNo}</span>
            </div>
          </div>

          <!-- Items Header (Auto-adjusting grid) -->
          <div class="grid-header font-bold border-b py-1 text-xs">
            <div class="text-left">Description</div>
            <div class="text-center">Qty</div>
            <div class="text-right">Price</div>
          </div>

          <!-- Items List -->
          <div>
            ${cartItems.map(item => `
              <div class="grid-item py-1 text-xs border-dotted" style="border-bottom: 1px dotted #ccc;">
                <div class="text-left truncate">${item.title}</div>
                <div class="text-center">${item.quantity}</div>
                <div class="text-right">$${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Totals Section -->
          <div class="mt-2">
            <div class="flex justify-between text-xs py-1">
              <span>Subtotal</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>

            <div class="flex justify-between text-xs py-1">
              <span>Tax</span>
              <span>$${tax.toFixed(2)}</span>
            </div>

            <div class="flex justify-between text-xs py-1 border-b">
              <span>Discount (${discountPercentage}%)</span>
              <span>-$${discountAmount.toFixed(2)}</span>
            </div>

            <div class="flex justify-between font-bold text-sm py-2">
              <span>Total</span>
              <span>$${totalAmount.toFixed(2)}</span>
            </div>

            <div class="flex justify-between text-xs py-1 border-t">
              <span>Payment Method</span>
              <span class="font-bold">${paymentMethod.toUpperCase()}</span>
            </div>

            ${paymentMethod === "cash" && receivedAmount ? `
              <div class="flex justify-between text-xs py-1">
                <span>CASH</span>
                <span>$${parseFloat(receivedAmount).toFixed(2)}</span>
              </div>
            ` : ''}

            ${paymentMethod === "cash" && receivedAmount && payback >= 0 ? `
              <div class="flex justify-between text-xs py-1 font-bold">
                <span>Change</span>
                <span>$${payback.toFixed(2)}</span>
              </div>
            ` : ''}
          </div>

          <!-- Thank You Message -->
          <div class="text-center font-bold text-sm mt-4 mb-1">
            THANK YOU!
          </div>

          <!-- Footer -->
          <div class="text-center text-xs text-gray-500 mt-1" style="color: #666; font-size: 8px;">
            designed by freepik
          </div>
        </div>
        
        <script>
          // Auto-print when ready
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            }, 250);
          };
        </script>
      </body>
    </html>
  `;

  // Write to new window
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
  printWindow.focus();
};