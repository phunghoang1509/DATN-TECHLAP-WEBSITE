import express from "express";
import {
  deleteColor,
  getColor,
  getColorDetail,
  newColor,
  updateColor,
} from "../controllers/colorControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router.route("/colors").get(getColor);

router
  .route("/admin/colors")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newColor)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getColor);
router.route("/color/:id").get(getColorDetail);
router.route("/admin/color").post(newColor);
router
  .route("/admin/color/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateColor);
router.route("/color/:id").delete(deleteColor);

export default router;
