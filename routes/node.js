import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import nodeController from "../controller/node";
import createError from "http-errors";

var router = Router();

// common CRUD

router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  nodeController.getNode(req, res, err);
});

export default router;
