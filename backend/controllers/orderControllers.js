import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import { getOrderTemplates } from "../utils/emailOrderTemplates.js";
import user from "../models/user.js";
import Category from "../models/Category.js";
//Tạo mới Order => /api/v1/orders/new

export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  // Gửi email cho người đặt hàng
  const message = getOrderTemplates(
    req.user.name,
    orderItems,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    shippingInfo
  );
  await sendEmail({
    email: req.user.email,
    subject: "Xác nhận đơn hàng",
    message,
  });

  res.status(200).json({
    order,
  });
});
//Xem đơn đặt hàng của người dùng hiện tại => /api/v1/me/orders

export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    order,
  });
});
//Xem chi tiết đơn hàng => /api/v1/orders/:id

export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng nào có ID này", 404));
  }
  res.status(200).json({
    order,
  });
});

//Xem tất cả các đơn đặt hàng - ADMIN => /api/v1/admin
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    orders,
  });
});

//Cập nhật đơn đặt hàng - ADMIN => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng nào có ID này", 404));
  }
  // Mảng chứa trạng thái theo thứ tự từ sau lên trên
  const allowedStatus = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Đã giao",
    "Hoàn tất",
    "Hủy",
  ];

  // Kiểm tra nếu đã chọn trạng thái trước đó và trạng thái hiện tại không đúng thứ tự
  if (
    order.orderStatus &&
    allowedStatus.indexOf(order.orderStatus) >=
      allowedStatus.indexOf(req.body.status)
  ) {
    return next(new ErrorHandler(`Đơn hàng đã "${order.orderStatus}"`, 400));
  }

  let productNotFound = false;

  //update product stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      productNotFound = true;
      break;
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }
  if (productNotFound) {
    return next(
      new ErrorHandler("Không tìm thấy sản phẩm nào có một hoặc nhiều ID.", 404)
    );
  }

  // Kiểm tra xem orderStatus có phải là "Hoàn tất" không
  if (req.body.status === "Hoàn tất") {
    order.paymentInfo.status = "Đã thanh toán";
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

//Xoá đơn đặt hàng => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng nào có ID này"), 404);
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

//--------Amin Chart
async function getSalesData(startDate, endDate, dateList) {
  const orders = await Order.find();
  const users = await user.find();
  const categories = await Category.find().populate({
    path: "products",
    select: "_id name",
  });
  const salesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        totalQuantity: { $sum: "$totalAmount" },
        numOrders: { $sum: 1 },
      },
    },
  ]);

  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;
  const userSales = {}; // Đối tượng lưu trữ số lượng mua của mỗi user
  const categorySales = {}; // Đối tượng lưu trữ số lượng bán của mỗi danh mục

  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrders;

    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });

  const datesBetween = getDatesBetween(startDate, endDate);
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
  }));

  const productSales = {};

  orders.forEach((order) => {
    const userId = order.user; // Lấy ID của user từ đơn hàng

    order.orderItems.forEach((item) => {
      const productId = item.product._id; // Lấy productId từ product của item
      if (productSales[item.name]) {
        productSales[item.name] += item.quantity;
      } else {
        productSales[item.name] = item.quantity;
      }

      // Lưu số lượng mua hàng của mỗi user vào đối tượng userSales
      if (userSales[userId]) {
        userSales[userId] += item.quantity;
      } else {
        userSales[userId] = item.quantity;
      }

      categories.forEach((category) => {
        category.products.forEach((product) => {
          if (product._id.toString() === productId.toString()) {
            const categoryId = category._id.toString(); // Sử dụng _id của danh mục
            if (categorySales[categoryId]) {
              categorySales[categoryId] += item.quantity;
            } else {
              categorySales[categoryId] = item.quantity;
            }
          }
        });
      });
    });
  });

  const sortedProducts = Object.entries(productSales).sort(
    (a, b) => b[1] - a[1]
  );

  const topN = 5;
  const topProducts = sortedProducts
    .slice(0, topN)
    .map(([productName, count]) => {
      const product = categories
        .flatMap((category) => category.products)
        .find((p) => p.name === productName);

      return {
        id: product._id,
        name: product.name,
        count,
      };
    });

  // Sắp xếp users theo số lượng mua hàng giảm dần
  const sortedUsers = Object.entries(userSales).sort((a, b) => b[1] - a[1]);

  // Lấy ra top users mua hàng nhiều nhất
  const topUsers = sortedUsers.slice(0, topN).map(([userId, count]) => {
    const user = users.find((u) => u._id.toString() === userId.toString());
    return {
      id: user._id,
      name: user.name,
      count,
    };
  });

  // Sắp xếp danh mục theo số lượng bán giảm dần
  const sortedCategories = Object.entries(categorySales).sort(
    (a, b) => b[1] - a[1]
  );

  // Lấy ra top danh mục bán nhiều nhất
  const topCategories = sortedCategories
    .slice(0, topN)
    .map(([categoryId, count]) => {
      const category = categories.find(
        (c) => c._id.toString() === categoryId.toString()
      );
      return {
        id: category._id,
        name: category.name,
        count,
      };
    });

  return {
    salesData: finalSalesData,
    totalSales,
    totalNumOrders,
    topProducts,
    topUsers,
    topCategories,
  };
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export const getSales = catchAsyncErrors(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);
  const {
    salesData,
    totalSales,
    totalNumOrders,
    topProducts,
    topUsers,
    topCategories,
  } = await getSalesData(startDate, endDate);

  res.status(200).json({
    totalSales,
    totalNumOrders,
    sales: salesData,
    topProducts,
    topUsers,
    topCategories,
  });
});

// hủy đơn hàng từ phía người dùng
export const updateOrderMe = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  if (order.orderStatus === "Hủy") {
    return next(new ErrorHandler("Đơn hàng đã được hủy", 400));
  }

  // Cập nhật lại trạng thái thành "Hủy"
  order.orderStatus = "Hủy";
  await order.save();

  res.status(200).json({
    success: true,
  });
});
