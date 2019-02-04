import mongoose from "mongoose";
import { Router } from "express";
var router = Router();
import auth from "../utils/auth";
import User from "../models/user";

router.post("/new", async (req, res, next) => {
  const request = req.body;
  var user = new User();
  user.username = request.username;
  var authPara = user.setPassword(request.password);
  user.salt = authPara.salt;
  user.hash = authPara.hash;
  try {
    await user.save();
    return res.json({ user: user.toAuthJSON() });
  } catch (err) {}
});

export default router;
