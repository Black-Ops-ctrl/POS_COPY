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
  
  // Generate receipt HTML - FIXED padding issue
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt</title>
        <style>
          /* Critical printer settings */
          @page {
            margin: 0;
            size: 80mm auto;
          }
          
          body {
            margin: 0;
            padding: 1mm; /* REDUCED from 4mm to 1mm */
            width: 80mm;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            font-weight: bold;
            background: white;
            box-sizing: border-box;
          }
          
          /* Main container - USE FULL WIDTH */
          .receipt {
            width: 100%;
            max-width: 78mm; /* Keep this */
            margin: 0 auto;
          }
          
          /* Header section */
          .shop-header {
            text-align: center;
            margin-bottom: 3px;
            padding-bottom: 3px;
          }
          
          .shop-name {
            font-weight: 900;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .shop-details {
            font-size: 11px;
            font-weight: bold;
            line-height: 1.2;
          }
          
          /* Receipt title */
          .receipt-title {
            text-align: center;
            font-weight: 900;
            font-size: 14px;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding: 4px 0;
            margin: 5px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          /* Info rows - REMOVED margin-left */
          .info-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            font-weight: bold;
            padding: 1px 0;
            width: 100%;
          }
          
          .info-row span:first-child {
            white-space: nowrap;
            text-align: left;
          }
          
          .info-row span:last-child {
            white-space: nowrap;
            text-align: right;
            /* REMOVED margin-left: 10px */
          }
          
          .invoice-section {
            padding: 1px 0;
            margin: 3px 0;
            font-size: 11px;
            font-weight: bold;
            width: 100%;
          }
          
          /* Items table - OPTIMIZED widths */
          .items-table {
            width: 100%;
            margin: 5px 0;
            border-collapse: collapse;
            font-weight: bold;
            table-layout: fixed;
          }
          
          .items-table th {
            font-weight: 900;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding: 4px 0;
            font-size: 11px;
            text-transform: uppercase;
          }
          
          .items-table td {
            padding: 2px 0;
            font-size: 11px;
            font-weight: bold;
          }
          
          .col-desc {
            text-align: left;
            width: 45%; /* Reduced */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
          }
          
          .col-qty {
            text-align: center;
            width: 15%;
            font-weight: bold;
          }
          
          .col-price {
            text-align: right;
            width: 40%; /* Increased */
            font-weight: bold;
            white-space: nowrap;
            padding-right: 0; /* REMOVED padding-right */
          }
          
          /* Totals section - OPTIMIZED widths */
          .totals-section {
            margin-top: 5px;
            border-top: 2px solid #000;
            padding-top: 5px;
            width: 100%;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 2px 0;
            font-size: 11px;
            font-weight: bold;
            width: 100%;
          }
          
          .total-row.final {
            font-weight: 900;
            font-size: 14px;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding: 6px 0;
            margin: 5px 0;
          }
          
          .total-label {
            text-align: left;
            width: 45%; /* Reduced */
            font-weight: bold;
            white-space: nowrap;
          }
          
          .total-value {
            text-align: right;
            width: 55%; /* Increased */
            font-family: 'Courier New', monospace;
            font-weight: 900;
            white-space: nowrap;
          }
          
          /* Payment section - OPTIMIZED for cash/card */
          .payment-row {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
            font-size: 12px;
            font-weight: bold;
            border-bottom: 2px solid #000;
            margin-top: 3px;
            width: 100%;
          }
          
          .payment-label {
            text-align: left;
            width: 45%; /* Reduced */
            white-space: nowrap;
          }
          
          .payment-value {
            text-align: right;
            width: 55%; /* Increased */
            font-weight: 900;
            white-space: nowrap;
            text-transform: uppercase;
          }
          
          /* Footer */
          .thank-you {
            text-align: center;
            font-weight: 900;
            font-size: 16px;
            margin: 10px 0 3px 0;
            text-transform: uppercase;
            letter-spacing: 3px;
          }
          
          /* Manual cut marker */
          .cut-line {
            text-align: center;
            margin-top: 10px;
            font-size: 10px;
            font-weight: bold;
            color: #000;
            border-top: 2px solid #000;
            padding-top: 3px;
            letter-spacing: 2px;
          }
          
          /* Tear space */
          .tear-space {
            height: 3mm;
          }
          
          /* Utility classes */
          .font-extra-bold {
            font-weight: 900;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <!-- Shop Header -->
          <div class="shop-header">
            <div class="shop-name">${shopName}</div>
            <div class="shop-details">${shopAddress}</div>
            <div class="shop-details">Tel: ${shopPhone}</div>
          </div>

          <!-- Receipt Title -->
          <div class="receipt-title">
            CASH RECEIPT
          </div>

          <!-- Date and Invoice Info - REMOVED extra spacing -->
          <div class="info-row">
            <span>Date: ${formattedDate}</span>
            <span>${formattedTime}</span>
          </div>

          <div class="invoice-section">
            <div class="info-row">
              <span>Invoice #:</span>
              <span class="font-extra-bold">${invoiceNo}</span>
            </div>
            <div class="info-row">
              <span>FBR #:</span>
              <span class="font-extra-bold">${fbrInvoiceNo}</span>
            </div>
          </div>

          <!-- Items Table -->
          <table class="items-table">
            <thead>
              <tr>
                <th class="col-desc">DESCRIPTION</th>
                <th class="col-qty">QTY</th>
                <th class="col-price">PRICE</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => {
                const itemName = item.title.length > 16 ? item.title.substring(0, 14) + '..' : item.title;
                return `
                  <tr>
                    <td class="col-desc" title="${item.title}">${itemName}</td>
                    <td class="col-qty">${item.quantity}</td>
                    <td class="col-price">$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <!-- Totals Section -->
          <div class="totals-section">
            <div class="total-row">
              <span class="total-label">Subtotal</span>
              <span class="total-value">$${subtotal.toFixed(2)}</span>
            </div>

            <div class="total-row">
              <span class="total-label">Tax</span>
              <span class="total-value">$${tax.toFixed(2)}</span>
            </div>

            <div class="total-row">
              <span class="total-label">Discount (${discountPercentage}%)</span>
              <span class="total-value">-$${discountAmount.toFixed(2)}</span>
            </div>

            <!-- FINAL TOTAL -->
            <div class="total-row final">
              <span class="total-label">TOTAL</span>
              <span class="total-value">$${totalAmount.toFixed(2)}</span>
            </div>

            <!-- PAYMENT METHOD - Will fit now -->
            <div class="payment-row">
              <span class="payment-label">PAYMENT METHOD</span>
              <span class="payment-value">${paymentMethod.toUpperCase()}</span>
            </div>

            ${paymentMethod === "cash" && receivedAmount ? `
              <div class="total-row">
                <span class="total-label">Cash</span>
                <span class="total-value">$${parseFloat(receivedAmount).toFixed(2)}</span>
              </div>
            ` : ''}

            ${paymentMethod === "cash" && receivedAmount && payback >= 0 ? `
              <div class="total-row" style="font-weight: 900;">
                <span class="total-label">CHANGE</span>
                <span class="total-value">$${payback.toFixed(2)}</span>
              </div>
            ` : ''}
          </div>

          <!-- Thank You Message -->
          <div class="thank-you">
            THANK YOU!
          </div>
          
          <!-- Cut line -->
          <div class="cut-line">
            • • • • • CUT HERE • • • • •
          </div>
          <div class="tear-space"></div>
        </div>
        
        <script>
          let printClicked = false;
          
          function safeClose() {
            setTimeout(function() {
              window.close();
            }, 100);
          }
          
          window.onafterprint = function() {
            printClicked = true;
          };
          
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
          
          // Detect print dialog cancellation
          let hasFocus = true;
          
          window.addEventListener('blur', function() {
            hasFocus = false;
          });
          
          window.addEventListener('focus', function() {
            if (!printClicked && !hasFocus) {
              safeClose();
            }
            hasFocus = true;
          });
          
          // Ctrl+W to close
          document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'w') {
              e.preventDefault();
              safeClose();
            }
          });
          
          // Auto-close after 30 seconds
          setTimeout(function() {
            if (!window.closed) {
              safeClose();
            }
          }, 30000);
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(receiptHTML);
  printWindow.document.close();
  printWindow.focus();
};