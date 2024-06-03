import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import HardDisk from "../models/HardDisk.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả hardDisk => /api/v1/hardDisk
export const getHardDisk = catchAsyncErrors(async (req, res, next) => {
  // Get All hardDisk
  const hardDisks = await HardDisk.find().populate({
    path: "products",
    select: "-_id name",
  });

  res.status(200).json({
    message: "Lấy tất cả hardDisk thành công",
    hardDisks,
  });
});

// Lấy 1 hardDisk => /api/v1/hardDisk/:id
export const getHardDiskDetail = catchAsyncErrors(async (req, res, next) => {
  const hardDisk = await HardDisk.findById(req?.params?.id).populate({
    path: "products",
    select: "-_id name",
  });
  if (!hardDisk) {
    return next(new ErrorHandler("Không tìm thấy hardDisk", 400));
  }
  res.status(200).json({
    message: "hardDisk cần tìm",
    hardDisk,
  });
});

// Tạo hardDisk  mới => /api/v1/admin/hardDisk
export const newHardDisk = catchAsyncErrors(async (req, res) => {
  const hardDisk = await HardDisk.create(req.body);
  res.status(200).json({
    message: "Tạo hardDisk thành công",
    hardDisk,
  });
});

// Cập nhật hardDisk => /api/v1/hardDisk/:id
export const updateHardDisk = catchAsyncErrors(async (req, res) => {
  let hardDisk = await HardDisk.findById(req?.params?.id);

  if (!hardDisk) {
    next(new ErrorHandler("Không tìm thấy hardDisk", 400));
  }

  hardDisk = await HardDisk.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Cập nhập hardDisk thành công!",
    hardDisk,
  });
});

// Xóa hardDisk => /api/v1/hardDisk/:id
export const deleteHardDisk = catchAsyncErrors(async (req, res) => {
  const hardDisk = await HardDisk.findById(req?.params?.id);
  if (!hardDisk) {
    return next(new ErrorHandler("Không tìm thấy hardDisk", 400));
  }
  await hardDisk.deleteOne();
  res.status(200).json({
    message: "hardDisk đã xóa",
  });
});
