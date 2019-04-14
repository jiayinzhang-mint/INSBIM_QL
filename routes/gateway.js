import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import gatewayController from "../controller/gateway";
var router = Router();

// node.json
router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  gatewayController.getSetting(req, res, err);
});
router.put("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  gatewayController.updateSetting(req, res, err);
});

export default router;
