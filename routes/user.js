import { Router } from "express";
import auth from "../utils/auth";
import role from "../utils/role";
import userController from "../controller/user";
import createError from "http-errors";

var router = Router();

router.post("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  userController.createUser(req, res, next);
});

router.get("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  userController.getUser(req, res, next);
});

router.put("/", auth.required, async (req, res, next) => {
  userController.updateUser(req, res, next);
});

router.delete("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  userController.deleteUser(req, res, next);
});

router.post("/login", async (req, res, next) => {
  userController.login(req, res, next);
});

export default router;
