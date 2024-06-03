import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Color from "../models/Color.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả sản phẩm => /api/v1/colors
export const getColor = catchAsyncErrors(async (req, res, next) => {
  // Get All color
  const colors = await Color.find().populate({
    path: "products",
    select: "-_id name",
  });

  res.status(200).json({
    message: "Lấy tất cả màu thành công",
    colors,
  });
});

// Lấy 1 danh sách => /api/v1/color/:id
export const getColorDetail = catchAsyncErrors(async (req, res, next) => {
  const color = await Color.findById(req?.params?.id).populate({
    path: "products",
    select: "-_id name",
  });
  if (!color) {
    return next(new ErrorHandler("Không tìm thấy màu", 400));
  }
  res.status(200).json({
    message: "Màu cần tìm",
    color,
  });
});

// Tạo danh sách mới mới => /api/v1/admin/color
export const newColor = catchAsyncErrors(async (req, res) => {
  const color = await Color.create(req.body);
  res.status(200).json({
    message: "Tạo danh sách thành công",
    color,
  });
});

// Cập nhật danh sách => /api/v1/color/:id
export const updateColor = catchAsyncErrors(async (req, res) => {
  let color = await Color.findById(req?.params?.id);

  if (!color) {
    next(new ErrorHandler("Không tìm thấy màu", 400));
  }

  color = await Color.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Cập nhật màu thành công",
    color,
  });
});

// Xóa danh sách => /api/v1/color/:id
export const deleteColor = catchAsyncErrors(async (req, res) => {
  const color = await Color.findById(req?.params?.id);
  if (!color) {
    return next(new ErrorHandler("Không tìm thấy màu", 400));
  }
  await color.deleteOne();
  res.status(200).json({
    message: "Màu đã xóa",
  });
});
