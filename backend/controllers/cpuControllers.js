import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Cpu from "../models/Cpu.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả cpu => /api/v1/cpus
export const getCpu = catchAsyncErrors(async (req, res, next) => {
  // Get All Cate
  const cpus = await Cpu.find().populate({
    path: "products",
    select: "-_id name",
  });

  res.status(200).json({
    message: "Lấy tất cả Cpu thành công",
    cpus,
  });
});

// Lấy 1 cpu => /api/v1/cpu/:id
export const getCpuDetail = catchAsyncErrors(async (req, res, next) => {
  const cpu = await Cpu.findById(req?.params?.id).populate({
    path: "products",
    select: "-_id name",
  });
  if (!cpu) {
    return next(new ErrorHandler("Không tìm thấy Cpu", 400));
  }
  res.status(200).json({
    message: "Cpu cần tìm",
    cpu,
  });
});

// Tạo Cpu  mới => /api/v1/admin/cpu
export const newCpu = catchAsyncErrors(async (req, res) => {
  const cpu = await Cpu.create(req.body);
  res.status(200).json({
    message: "Tạo Cpu thành công",
    cpu,
  });
});

// Cập nhật Cpu => /api/v1/cpu/:id
export const updateCpu = catchAsyncErrors(async (req, res) => {
  let cpu = await Cpu.findById(req?.params?.id);

  if (!cpu) {
    next(new ErrorHandler("Không tìm thấy Cpu", 400));
  }

  cpu = await Cpu.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Cập nhập Cpu thành công!",
    cpu,
  });
});

// Xóa cpu => /api/v1/cpu/:id
export const deleteCpu = catchAsyncErrors(async (req, res) => {
  const cpu = await Cpu.findById(req?.params?.id);
  if (!cpu) {
    return next(new ErrorHandler("Không tìm thấy cpu", 400));
  }
  await cpu.deleteOne();
  res.status(200).json({
    message: "Cpu đã xóa",
  });
});
