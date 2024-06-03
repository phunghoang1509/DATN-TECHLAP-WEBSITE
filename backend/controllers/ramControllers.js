import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Ram from "../models/Ram.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả Ram => /api/v1/ram
export const getRam = catchAsyncErrors(async (req, res, next) => {
  // Get All ram
  const rams = await Ram.find().populate({
    path: "products",
    select: "-_id name",
  });

  res.status(200).json({
    message: "Lấy tất cả Ram thành công",
    rams,
  });
});

// Lấy 1 ram => /api/v1/ram/:id
export const getRamDetail = catchAsyncErrors(async (req, res, next) => {
  const ram = await Ram.findById(req?.params?.id).populate({
    path: "products",
    select: "-_id name",
  });
  if (!ram) {
    return next(new ErrorHandler("Không tìm thấy Ram", 400));
  }
  res.status(200).json({
    message: "Ram cần tìm",
    ram,
  });
});

// Tạo Ram  mới => /api/v1/admin/ram
export const newRam = catchAsyncErrors(async (req, res) => {
  const ram = await Ram.create(req.body);
  res.status(200).json({
    message: "Tạo Ram thành công",
    ram,
  });
});

// Cập nhật Ram => /api/v1/ram/:id
export const updateRam = catchAsyncErrors(async (req, res) => {
  let ram = await Ram.findById(req?.params?.id);

  if (!ram) {
    next(new ErrorHandler("Không tìm thấy Ram", 400));
  }

  ram = await Ram.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Cập nhập Ram thành công!",
    ram,
  });
});

// Xóa ram => /api/v1/ram/:id
export const deleteRam = catchAsyncErrors(async (req, res) => {
  const ram = await Ram.findById(req?.params?.id);
  if (!ram) {
    return next(new ErrorHandler("Không tìm thấy Ram", 400));
  }
  await ram.deleteOne();
  res.status(200).json({
    message: "Ram đã xóa",
  });
});
