import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Category from "../models/Category.js";
import Color from "../models/Color.js";
import Cpu from "../models/Cpu.js";
import GraphicCard from "../models/GraphicCard.js";
import HardDisk from "../models/HardDisk.js";
import Product from "../models/Product.js";
import Ram from "../models/Ram.js";
import APIFilters from "../utils/apiFilters.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";

// Lấy tất cả sản phẩm => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  // Get All Pro
  // const products = await Product.find().populate({
  //   path: "category",
  //   select: "-_id name",
  // });

  const resPerPage = 12;

  // Search Pro
  const apiFilters = new APIFilters(
    Product.find({
      statusActive: { $ne: "deactive" },
    })
      .populate({
        path: "category",
        select: "_id name",
      })
      .populate({
        path: "color",
        select: "_id name",
      })
      .populate({
        path: "ram",
        select: "_id type",
      })
      .populate({
        path: "cpu",
        select: "_id type",
      })
      .populate({
        path: "hardDisk",
        select: "_id type",
      })
      .populate({
        path: "graphicCard",
        select: "_id type",
      }),
    req.query
  )
    .search()
    .filters();

  const productsFilters = await apiFilters.query;
  const productsFiltersCount = productsFilters.length;

  // Pagination;
  apiFilters.pagination(resPerPage);
  const products = await apiFilters.query.clone();

  res.status(200).json({
    message: "Lấy danh sách sản phẩm thành công",
    resPerPage,
    productsFiltersCount,
    // productsFilters,
    products,
  });
});

// Lấy 1 sản phẩm => /api/v1/products/:id
export const getProductDetail = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id)
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "color",
      select: "_id name",
    })
    .populate({
      path: "ram",
      select: "_id type",
    })
    .populate({
      path: "cpu",
      select: "_id type",
    })
    .populate({
      path: "hardDisk",
      select: "_id type",
    })
    .populate({
      path: "graphicCard",
      select: "_id type",
    })
    .populate("reviews.user");
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  res.status(200).json({
    message: "Sản phẩm cần tìm",
    product,
  });
});

// Tạo sản phẩm mới => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);

  // Thêm sản phẩm vào danh mục
  const updateCategory = await Category.findByIdAndUpdate(product.category, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateCategory) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn danh mục",
    });
  }
  // Thêm màu
  const updateColor = await Color.findByIdAndUpdate(product.color, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateColor) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn màu",
    });
  }
  // Thêm ram
  const updateRam = await Ram.findByIdAndUpdate(product.ram, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateRam) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Ram",
    });
  }
  // Thêm cpu
  const updateCpu = await Cpu.findByIdAndUpdate(product.cpu, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateCpu) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Cpu",
    });
  }
  // Thêm hardDisk
  const updateHardDisk = await HardDisk.findByIdAndUpdate(product.hardDisk, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateHardDisk) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Hard Disk",
    });
  }
  // Thêm graphicCard
  const updateGraphicCard = await GraphicCard.findByIdAndUpdate(
    product.graphicCard,
    {
      $addToSet: {
        products: product._id,
      },
    }
  );
  if (!updateGraphicCard) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Graphic Card",
    });
  }
  res.status(200).json({
    message: "Tạo sản phẩm thành công",
    product,
  });
});

// Cập nhật sản phẩm => /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });
  // Thêm sản phẩm vào danh mục
  const updateCategory = await Category.findByIdAndUpdate(product.category, {
    $addToSet: {
      products: product._id,
    },
  });
  if (!updateCategory) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn danh sách",
    });
  }
  // Thêm màu
  const updateColor = await Color.findByIdAndUpdate(product.color, {
    $addToSet: {
      color: product._id,
    },
  });
  if (!updateColor) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn màu",
    });
  }
  // Thêm ram
  const updateRam = await Ram.findByIdAndUpdate(product.ram, {
    $addToSet: {
      ram: product._id,
    },
  });
  if (!updateRam) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Ram",
    });
  }
  // Thêm cpu
  const updateCpu = await Cpu.findByIdAndUpdate(product.cpu, {
    $addToSet: {
      cpu: product._id,
    },
  });
  if (!updateCpu) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Cpu",
    });
  }
  // Thêm hardDisk
  const updateHardDisk = await HardDisk.findByIdAndUpdate(product.hardDisk, {
    $addToSet: {
      hardDisk: product._id,
    },
  });
  if (!updateHardDisk) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Hard Disk",
    });
  }
  // Thêm graphicCard
  const updateGraphicCard = await GraphicCard.findByIdAndUpdate(
    product.graphicCard,
    {
      $addToSet: {
        graphicCard: product._id,
      },
    }
  );
  if (!updateGraphicCard) {
    return res.status(404).json({
      message: "Sản phẩm chưa được chọn Graphic Card",
    });
  }
  res.status(200).json({
    product,
  });
});

// Xóa sản phẩm => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  //Xóa hình ảnh sản phẩm

  for (let i = 0; i < product?.images?.length; i++) {
    await delete_file(product?.images[i].public_id);
  }
  await product.deleteOne();
  res.status(200).json({
    message: "Sản phẩm đã xóa",
  });
});

// Tạo/Update sản phẩm review => /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user?._id,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }

  const isReviewd = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// lấy tất cả sản phẩm review => /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate("reviews.user");
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));
  }
  res.status(200).json({
    reviews: product.reviews,
  });
});

// Xoá sản phẩm review => /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));
  }

  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = reviews.length;
  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

//Admin
// Lấy 1 sản phẩm - Admin => /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    message: "Sản phẩm cần tìm",
    products,
  });
});

// Cập nhật hình ảnh sản phẩm => /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    next(new ErrorHandler("Không tìm thấy sản phẩm", 400));
  }
  const uploader = async (image) => upload_file(image, "shopit/products");
  const urls = await Promise.all((req?.body?.images).map(uploader));
  product?.images?.push(...urls);
  await product?.save();
  res.status(200).json({
    product,
  });
});

// Xoá hình ảnh sản phẩm => /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));
  }

  const isDeleted = await delete_file(req.body.imgId);

  if (isDeleted) {
    product.images = product?.images?.filter(
      (img) => img.public_id !== req.body.imgId
    );

    await product?.save();
  }

  res.status(200).json({
    product,
  });
});

export const canUserReview = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,

    "orderItems.product": req.query.productId,
  });
  if (orders.length === 0) {
    return res.status(200).json({ canReview: false });
  }
  res.status(200).json({
    canReview: true,
  });
});

// Cập nhật statusActive => /api/v1/products/statusActive/:id
export const updateStatusActive = catchAsyncErrors(async (req, res) => {
  try {
    const { statusActive } = req.body;
    if (!statusActive) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái sản phẩm là bắt buộc",
      });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩms",
      });
    }
    // cập nhật statusActive
    product.statusActive = statusActive;

    await product.save();

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
