import { Router } from "express";
import auth from "../utils/auth";

var router = Router();

import userController from "../controller/user";

router.post("/", auth.required, async (req, res, next) => {
  userController.createUser(req, res, next);
});

router.put("/", auth.required, async (req, res, next) => {
  userController.updateUser(req, res, next);
});

router.delete("/", auth.required, async (req, res, next) => {
  userController.deleteUser(req, res, next);
});

router.post("/login", async (req, res, next) => {
  userController.login(req, res, next);
});

export default router;
