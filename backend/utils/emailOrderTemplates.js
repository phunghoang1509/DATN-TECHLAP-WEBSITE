export const getOrderTemplates = (
  name,
  orderItems,
  itemsPrice,
  taxAmount,
  shippingAmount,
  totalAmount,
  shippingInfo
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác nhận đơn hàng</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              text-align: center;
          }
  
          p {
              margin-bottom: 15px;
          }
  
          .order-details {
              border-collapse: collapse;
              width: 100%;
          }
  
          .order-details th,
          .order-details td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
          }
  
          .order-details th {
              background-color: #f2f2f2;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Xác nhận đơn hàng</h1>
          <p>Xin chào ${name},</p>
          <p>Cảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi. Dưới đây là thông tin về đơn hàng của bạn:</p>
          <table class="order-details">
              <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
              </tr>
              ${orderItems
                .map(
                  (item) => `
                  <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                  </tr>
              `
                )
                .join("")}
          </table>
          <p>Tổng tiền sản phẩm: ${itemsPrice}</p>
          <p>Thuế: ${taxAmount}</p>
          <p>Phí vận chuyển: ${shippingAmount}</p>
          <p>Tổng tiền thanh toán: ${totalAmount}</p>
          <p>Địa chỉ giao hàng: ${shippingInfo.address},${
  shippingInfo?.district
}, ${shippingInfo.city}, ${shippingInfo.country}</p>
  <p>Vui lòng kiểm tra tình trạng đơn hàng trên Website. Nếu có thắc mắc xin liên hệ hotline: 0983123456 </>
          <p>Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Chúng tôi sẽ thông báo cho bạn khi đơn hàng của bạn được xử lý và vận chuyển.</p>
          <p>Trân trọng,</p>
          <p>TechLap</p>
      </div>
  </body>
  </html>`;
