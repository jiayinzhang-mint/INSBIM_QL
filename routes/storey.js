import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import storeyController from "../controller/storey";
var router = Router();

router.post("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  storeyController.createStorey(req, res, next);
});

router.get("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  storeyController.getStoreyList(req, res, next);
});

router.get("/:storeyId", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  storeyController.getStorey(req, res, next);
});

router.delete("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  storeyController.deleteStorey(req, res, next);
});

export default router;
