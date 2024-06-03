import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Category from "../models/Category.js";
import ErrorHandler from "../utils/errorHandler.js";

// Lấy tất cả danh mục => /api/v1/categories
export const getCategories = catchAsyncErrors(async (req, res, next) => {
  // Get All Cate
  const categories = await Category.find().populate({
    path: "products",
    select: "_id name",
  });

  res.status(200).json({
    message: "Lấy tất cả danh sách thành công!",
    categories,
  });
});

// Lấy 1 danh sách => /api/v1/category/:id
export const getCategoryDetail = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req?.params?.id).populate({
    path: "products",
    select: "_id name",
  });
  if (!category) {
    return next(new ErrorHandler("Không tìm thấy danh sách", 400));
  }
  res.status(200).json({
    message: "Danh sách cần tìm",
    category,
  });
});

// Tạo danh sách  mới => /api/v1/admin/categories
export const newCategory = catchAsyncErrors(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(200).json({
    message: "Tạo danh sách thành công",
    category,
  });
});

// Cập nhật danh sách => /api/v1/category/:id
export const updateCategory = catchAsyncErrors(async (req, res) => {
  let category = await Category.findById(req?.params?.id);

  if (!category) {
    next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }

  category = await Category.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    category,
  });
});

// Xóa danh sách => /api/v1/category/:id
export const deleteCategory = catchAsyncErrors(async (req, res) => {
  const category = await Category.findById(req?.params?.id);
  if (!category) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  await category.deleteOne();
  res.status(200).json({
    message: "Danh sách đã xóa",
  });
});

//Admin
// Lấy tất cả danh mục - Admin => /api/v1/admin/categories
export const getAdminCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    message: "Danh mục cần tìm",
    categories,
  });
});
