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
  
  // Generate receipt HTML with proper formatting for thermal printer
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
            padding: 3mm;
            width: 80mm;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            background: white;
            box-sizing: border-box;
          }
          
          /* Main container */
          .receipt {
            width: 100%;
            max-width: 74mm;
            margin: 0 auto;
          }
          
          /* Header section */
          .shop-header {
            text-align: center;
            margin-bottom: 5px;
            border-bottom: 1px dashed #000;
            padding-bottom: 5px;
          }
          
          .shop-name {
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .shop-details {
            font-size: 10px;
            line-height: 1.3;
          }
          
          /* Receipt title */
          .receipt-title {
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 5px 0;
            margin: 8px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          /* Info rows */
          .info-row {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            padding: 2px 0;
          }
          
          .invoice-section {
            background: #f5f5f5;
            padding: 4px;
            margin: 5px 0;
            font-size: 10px;
          }
          
          /* Items table - FIXED ALIGNMENT */
          .items-table {
            width: 100%;
            margin: 8px 0;
            border-collapse: collapse;
          }
          
          .items-table th {
            font-weight: bold;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 4px 0;
            font-size: 10px;
          }
          
          .items-table td {
            padding: 3px 0;
            font-size: 10px;
            border-bottom: 1px dotted #ccc;
          }
          
          .col-desc {
            text-align: left;
            width: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 45mm;
          }
          
          .col-qty {
            text-align: center;
            width: 15%;
          }
          
          .col-price {
            text-align: right;
            width: 25%;
            padding-right: 2px;
          }
          
          /* Totals section - FIXED ALIGNMENT */
          .totals-section {
            margin-top: 8px;
            border-top: 1px dashed #000;
            padding-top: 5px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
            font-size: 10px;
          }
          
          .total-row.sub {
            border-bottom: 1px dotted #ccc;
          }
  
          .total-row.final {
            font-weight: bold;
            font-size: 12px;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 6px 0;
            margin: 5px 0;
          }
          
          .total-label {
            text-align: left;
            width: 60%;
          }
          
          .total-value {
            text-align: right;
            width: 40%;
            font-family: 'Courier New', monospace;
          }
          
          /* Payment section */
          .payment-row {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
            font-size: 10px;
            border-bottom: 1px dashed #000;
            padding-bottom: 5px;
          }
          
          /* Footer */
          .thank-you {
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            margin: 15px 0 5px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          .footer-note {
            text-align: center;
            font-size: 8px;
            color: #666;
          }
          
          /* Manual cut marker */
          .cut-line {
            text-align: center;
            margin-top: 15px;
            font-size: 9px;
            color: #666;
            border-top: 2px dashed #999;
            padding-top: 5px;
          }
          
          /* Tear space */
          .tear-space {
            height: 4mm;
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
            <span>Time: ${formattedTime}</span>
          </div>

          <div class="invoice-section">
            <div class="info-row">
              <span>Invoice #:</span>
              <span class="font-bold">${invoiceNo}</span>
            </div>
            <div class="info-row">
              <span>FBR #:</span>
              <span class="font-bold">${fbrInvoiceNo}</span>
            </div>
          </div>

          <!-- Items Table - Using HTML Table for Perfect Alignment -->
          <table class="items-table">
            <thead>
              <tr>
                <th class="col-desc">Description</th>
                <th class="col-qty">Qty</th>
                <th class="col-price">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => {
                const itemName = item.title.length > 25 ? item.title.substring(0, 23) + '..' : item.title;
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
            <div class="total-row sub">
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

            <div class="total-row final">
              <span class="total-label">TOTAL</span>
              <span class="total-value">$${totalAmount.toFixed(2)}</span>
            </div>

            <div class="payment-row">
              <span>Payment Method</span>
              <span class="font-bold">${paymentMethod.toUpperCase()}</span>
            </div>

            ${paymentMethod === "cash" && receivedAmount ? `
              <div class="total-row">
                <span class="total-label">Cash</span>
                <span class="total-value">$${parseFloat(receivedAmount).toFixed(2)}</span>
              </div>
            ` : ''}

            ${paymentMethod === "cash" && receivedAmount && payback >= 0 ? `
              <div class="total-row" style="font-weight: bold;">
                <span class="total-label">Change</span>
                <span class="total-value">$${payback.toFixed(2)}</span>
              </div>
            ` : ''}
          </div>

          <!-- Thank You Message -->
          <div class="thank-you">
            THANK YOU!
          </div>

          <!-- Footer -->
          <div class="footer-note">
            designed by freepik
          </div>
          
          <!-- Cut Line -->
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
              safeClose(); // Close immediately on cancel
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