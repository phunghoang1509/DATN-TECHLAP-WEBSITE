import express from "express";

import {
  createProductReview,
  deleteProduct,
  deleteProductImage,
  getAdminProducts,
  getProductDetail,
  getProductReviews,
  getProducts,
  newProduct,
  updateProduct,
  uploadProductImages,
  canUserReview,
  deleteReview,
  updateStatusActive,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetail);

router
  .route("/admin/products/:id/upload_images")
  .put(isAuthenticatedUser, authorizeRoles("admin"), uploadProductImages);
router
  .route("/admin/products/:id/delete_image")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductImage);

router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
  .route("/admin/products/statusActive/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateStatusActive);

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createProductReview);

router.route("/can_review").get(isAuthenticatedUser, canUserReview);

export default router;
