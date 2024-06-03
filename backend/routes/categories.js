import express from "express";
import {
  deleteCategory,
  getAdminCategories,
  getCategories,
  getCategoryDetail,
  newCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/categories").get(getCategories);
router.route("/category/:id").get(getCategoryDetail);
router
  .route("/admin/categories")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newCategory)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCategories);

router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory);
router.route("/category/:id").delete(deleteCategory);

export default router;
