import express from "express";
import {
  deleteRam,
  getRam,
  getRamDetail,
  newRam,
  updateRam,
} from "../controllers/ramControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router.route("/rams").get(getRam);

router
  .route("/admin/rams")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newRam)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getRam);
router.route("/ram/:id").get(getRamDetail);
router.route("/admin/ram").post(newRam);
router
  .route("/admin/ram/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRam);
router.route("/ram/:id").delete(deleteRam);

export default router;
