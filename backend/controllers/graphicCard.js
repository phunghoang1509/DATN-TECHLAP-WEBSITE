import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import GraphicCard from "../models/GraphicCard.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả graphicCard => /api/v1/graphicCard
export const getGraphicCard = catchAsyncErrors(async (req, res, next) => {
  // Get All graphicCard
  const graphicCards = await GraphicCard.find().populate({
    path: "products",
    select: "_id name",
  });

  res.status(200).json({
    message: "Lấy tất cả graphicCard thành công",
    graphicCards,
  });
});

// Lấy 1 graphicCard => /api/v1/graphicCard/:id
export const getGraphicCardDetail = catchAsyncErrors(async (req, res, next) => {
  const graphicCard = await GraphicCard.findById(req?.params?.id).populate({
    path: "products",
    select: "_id name",
  });
  if (!graphicCard) {
    return next(new ErrorHandler("Không tìm thấy graphicCard", 400));
  }
  res.status(200).json({
    message: "graphicCard cần tìm",
    graphicCard,
  });
});

// Tạo graphicCard  mới => /api/v1/admin/graphicCard
export const newGraphicCard = catchAsyncErrors(async (req, res) => {
  const graphicCard = await GraphicCard.create(req.body);
  res.status(200).json({
    message: "Tạo graphicCard thành công",
    graphicCard,
  });
});

// Cập nhật graphicCard => /api/v1/graphicCard/:id
export const updateGraphicCard = catchAsyncErrors(async (req, res) => {
  let graphicCard = await GraphicCard.findById(req?.params?.id);

  if (!graphicCard) {
    next(new ErrorHandler("Không tìm thấy graphicCard", 400));
  }

  graphicCard = await GraphicCard.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Cập nhập graphicCard thành công!",
    graphicCard,
  });
});

// Xóa graphicCard => /api/v1/graphicCard/:id
export const deleteGraphicCard = catchAsyncErrors(async (req, res) => {
  const graphicCard = await GraphicCard.findById(req?.params?.id);
  if (!graphicCard) {
    return next(new ErrorHandler("Không tìm thấy graphicCard", 400));
  }
  await graphicCard.deleteOne();
  res.status(200).json({
    message: "graphicCard đã xóa",
  });
});
