import express from "express";
import {
  deleteCpu,
  getCpu,
  getCpuDetail,
  newCpu,
  updateCpu,
} from "../controllers/cpuControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router.route("/cpus").get(getCpu);

router
  .route("/admin/cpus")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newCpu)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCpu);
router.route("/cpu/:id").get(getCpuDetail);
router.route("/admin/cpu").post(newCpu);
router
  .route("/admin/cpu/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCpu);
router.route("/cpu/:id").delete(deleteCpu);

export default router;
