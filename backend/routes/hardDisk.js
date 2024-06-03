import express from "express";
import {
  deleteHardDisk,
  getHardDisk,
  getHardDiskDetail,
  newHardDisk,
  updateHardDisk,
} from "../controllers/hardDiskControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router.route("/hardDisks").get(getHardDisk);

router
  .route("/admin/hardDisks")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newHardDisk)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getHardDisk);
router.route("/hardDisk/:id").get(getHardDiskDetail);
router.route("/admin/hardDisk").post(newHardDisk);
router
  .route("/admin/hardDisk/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateHardDisk);
router.route("/hardDisk/:id").delete(deleteHardDisk);

export default router;
