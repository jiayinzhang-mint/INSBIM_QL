import { Router } from "express";
import role from "../utils/role";
import auth from "../utils/auth";
import multer from "multer";
import deviceController from "../controller/device";
var router = Router();

// common CRUD

router.post("/", auth.required, async (req, res, err) => {
  // 角色判断
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.createDevice(req, res, err);
});

router.get("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.getDevice(req, res, err);
});

router.put("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.updateDevice(req, res, err);
});

router.delete("/", auth.required, async (req, res, err) => {
  if (!role.isAdmin(req.payload.username)) {
    return createError(403, "No permission.");
  }
  deviceController.deleteDevice(req, res, err);
});

// func

// xlsx导入设备列表

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // config file path
    cb(null, "upload/tmp");
  },
  filename: (req, file, cb) => {
    // filename
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

router.post(
  "/import",
  auth.required,
  upload.single("file"),
  async (req, res, err) => {
    if (!role.isAdmin(req.payload.username)) {
      return createError(403, "No permission.");
    }
    var file = req.file;
    console.log(file);
    deviceController.importDeviceFromXlsx(file, req, res, err);
  }
);

export default router;
