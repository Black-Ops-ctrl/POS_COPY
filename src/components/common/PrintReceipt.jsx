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
  
  // Generate receipt HTML with MAXIMUM width utilization
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
            padding: 1.5mm 1mm; /* Minimal padding: 1mm left + 1mm right */
            width: 80mm;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            font-weight: bold;
            background: white;
            box-sizing: border-box;
          }
          
          /* Main container - USE ALMOST FULL WIDTH */
          .receipt {
            width: 100%;
            max-width: 78mm; /* 80mm - 2mm padding */
            margin: 0 auto;
          }
          
          /* Header section */
          .shop-header {
            text-align: center;
            margin-bottom: 3px;
            padding-bottom: 2px;
          }
          
          .shop-name {
            font-weight: 900;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
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
            letter-spacing: 1px;
          }
          
          /* Info rows */
          .info-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            font-weight: bold;
            padding: 1px 0;
            width: 100%;
          }
          
          .info-row span:last-child {
            white-space: nowrap;
            text-align: right;
          }
          
          .invoice-section {
            padding: 1px 0;
            margin: 3px 0;
            font-size: 11px;
            font-weight: bold;
            width: 100%;
          }
          
          /* Items table - CRITICAL FIXES */
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
            padding: 3px 0;
            font-size: 11px;
            text-transform: uppercase;
          }
          
          .items-table td {
            padding: 2px 0;
            font-size: 11px;
            font-weight: bold;
          }
          
          /* FIXED column widths - Give more space to PRICE */
          .col-desc {
            text-align: left;
            width: 40%; /* Reduced to give more to price */
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
            width: 45%; /* INCREASED to show full price */
            font-weight: bold;
            white-space: nowrap;
            letter-spacing: 0.2px; /* Slight spacing for numbers */
          }
          
          /* Totals section - FIXED widths */
          .totals-section {
            margin-top: 5px;
            border-top: 2px solid #000;
            padding-top: 4px;
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
            padding: 5px 0;
            margin: 5px 0;
          }
          
          .total-label {
            text-align: left;
            width: 40%; /* Reduced */
            font-weight: bold;
            white-space: nowrap;
          }
          
          .total-value {
            text-align: right;
            width: 60%; /* INCREASED for full numbers */
            font-family: 'Courier New', monospace;
            font-weight: 900;
            white-space: nowrap;
          }
          
          /* Payment section - FIXED for CASH */
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
            width: 40%; /* Reduced */
            white-space: nowrap;
          }
          
          .payment-value {
            text-align: right;
            width: 60%; /* INCREASED to show full CASH/CARD */
            font-weight: 900;
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          /* Footer */
          .thank-you {
            text-align: center;
            font-weight: 900;
            font-size: 16px;
            margin: 10px 0 3px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
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
            letter-spacing: 1px;
          }
          
          /* Tear space */
          .tear-space {
            height: 3mm;
          }
          
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

          <!-- Date and Invoice Info -->
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

          <!-- Items Table - FIXED columns -->
          <table class="items-table">
            <thead>
              <tr>
                <th class="col-desc">DESCRIPTION</th>
                <th class="col-qty">QTY</th>
                <th class="col-price">PRICE</th> <!-- Now full word -->
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => {
                // Shorter description to give more space for price
                const itemName = item.title.length > 14 ? item.title.substring(0, 12) + '..' : item.title;
                const itemPrice = (item.price * item.quantity).toFixed(2);
                return `
                  <tr>
                    <td class="col-desc" title="${item.title}">${itemName}</td>
                    <td class="col-qty">${item.quantity}</td>
                    <td class="col-price">$${itemPrice}</td> <!-- Full price -->
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

            <!-- PAYMENT METHOD - Now shows full CASH/CARD -->
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