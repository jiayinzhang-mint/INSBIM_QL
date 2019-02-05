import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import buildController from "../controller/building";
var router = Router();

router.post("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return res.status(403).json({ msg: "noPermission" });
  }
  buildController.createBuilding(req, res, next);
});

router.get("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return res.status(403).json({ msg: "noPermission" });
  }
  buildController.getBuildingList(req, res, next);
});

router.get("/:id", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return res.status(403).json({ msg: "noPermission" });
  }
  buildController.getBuilding(req, res, next);
});

router.delete("/", auth.required, async (req, res, next) => {
  if (!role.isAdmin(req.payload.username)) {
    return res.status(403).json({ msg: "noPermission" });
  }
  buildController.deleteBuilding(req, res, next);
});

export default router;
