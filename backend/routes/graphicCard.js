import express from "express";
import {
  deleteGraphicCard,
  getGraphicCard,
  getGraphicCardDetail,
  newGraphicCard,
  updateGraphicCard,
} from "../controllers/graphicCard.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();
router.route("/graphicCards").get(getGraphicCard);

router
  .route("/admin/graphicCards")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newGraphicCard)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getGraphicCard);
router.route("/graphicCard/:id").get(getGraphicCardDetail);
router
  .route("/admin/graphicCard/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateGraphicCard);
router.route("/graphicCard/:id").delete(deleteGraphicCard);

export default router;
