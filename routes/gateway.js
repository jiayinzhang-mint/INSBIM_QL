import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import gatewayController from "../controller/gateway";
import createError from "http-errors";

var router = Router();

// node.json
router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  gatewayController.getSetting(req, res, err);
});

router.post("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  gatewayController.pushSetting(req, res, err);
});

export default router;
