import { Router } from "express";
import auth from "../utils/auth";

var router = Router();

import userController from "../controller/user";

router.post("/new", async (req, res, next) => {
  userController.createUser(req, res, next);
});

router.post("/login", async (req, res, next) => {
  userController.login(req, res, next);
});

router.put("/profile", auth.required, async (req, res, next) => {
  userController.editProfile(req, res, next);
});

export default router;
