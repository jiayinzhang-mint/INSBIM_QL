import { Router } from "express";
import auth from "../utils/auth";
import role from "../utils/role";
import userController from "../controller/user";

var router = Router();


router.post("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return res.status(403).json({ msg: "noPermission" });
  }
  userController.createUser(req, res, next);
});

router.put("/", auth.required, async (req, res, next) => {
  userController.updateUser(req, res, next);
});

router.delete("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return res.status(403).json({ msg: "noPermission" });
  }
  userController.deleteUser(req, res, next);
});

router.post("/login", async (req, res, next) => {
  userController.login(req, res, next);
});

export default router;
