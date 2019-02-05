import mongoose from "mongoose";
import User from "../models/user";
import passport from "passport";
import role from "../utils/role";

class userController {
  static async createUser(req, res, next) {
    if (!role.isAdmin(req.payload.username)) {
      return res.status(403).json({ msg: "noPermission" });
    }
    const request = req.body;
    var user = new User();
    user.username = request.username;
    var authPara = user.setPassword(request.password);
    user.salt = authPara.salt;
    user.hash = authPara.hash;
    try {
      await user.save();
      return res.status(200).json({ msg: "success", user: user.toAuthJSON() });
    } catch (err) {
      return next(err);
    }
  }

  static async updateUser(req, res, next) {
    const request = req.body;
    var user = await User.findById(request.id);
    if (!user) {
      console.log(user);
      return res.sendStatus(401);
    }
    if (typeof request.name !== "undefined") {
      user.name = request.name;
    }
    if (typeof request.mobile !== "undefined") {
      user.mobile = request.mobile;
    }
    if (typeof request.password !== "undefined") {
      user.setPassword(request.password);
    }
    try {
      await user.save();
      return res.status(200).json({ msg: "success", user: user.toAuthJSON() });
    } catch (err) {
      return next(err);
    }
  }

  static async deleteUser(req, res, next) {
    if (!role.isAdmin(req.payload.username)) {
      return res.status(403).json({ msg: "noPermission" });
    }
    const request = req.body;
    try {
      await User.findByIdAndDelete(request.id);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(err);
    }
  }

  static async login(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user) {
        user.token = user.generateJWT();
        return res
          .status(200)
          .json({ msg: "success", user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  }
}

export default userController;
