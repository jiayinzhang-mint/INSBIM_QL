import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import blockController from "../controller/block";
import createError from "http-errors";

var router = Router();

router.post("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  blockController.createBlock(req, res, err);
});

router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  blockController.getBlock(req, res, err);
});


router.put("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  blockController.updateBlock(req, res, err);
});

router.delete("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  blockController.deleteBlock(req, res, err);
});

export default router;
