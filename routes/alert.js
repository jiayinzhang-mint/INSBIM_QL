import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import alertController from "../controller/alert";
import createError from "http-errors";

var router = Router();

router.post("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  alertController.createAlert(req, res, err);
});

router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  alertController.getAlert(req, res, err);
});

router.put("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  alertController.updateAlert(req, res, err);
});

router.delete("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  alertController.deleteAlert(req, res, err);
});

export default router;
