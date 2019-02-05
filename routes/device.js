import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import deviceController from "../controller/device";
var router = Router();

router.post("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.createDevice(req, res, err);
});

router.get("/:id", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.getDevice(req, res, err);
});

router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.getDeviceList(req, res, err);
});

router.put("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.updateDevice(req, res, err);
});

export default router;
