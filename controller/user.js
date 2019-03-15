import createError from "http-errors";
import User from "../models/user";
import passport from "passport";
import arrUtil from "../utils/arrUtil";
class userController {
  static async createUser(req, res, next) {
    const request = req.body;
    var user = new User();
    user.username = request.username;
    if (request.role) user.role = request.role;
    if (request.name) user.name = request.name;
    if (request.mobile) user.mobile = request.mobile;
    // 创建JWT盐&哈希
    var authPara = user.setPassword(request.password);
    user.salt = authPara.salt;
    user.hash = authPara.hash;
    try {
      await user.save();
      return res
        .status(200)
        .json({ msg: "success", data: { user: user.toAuthJSON() } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getUser(req, res, next) {
    const request = req.query;
    var query = {};
    if (request.userId) query._id = request.userId;
    if (request.role) query.role = request.role;
    try {
      var userList = await User.find(
        query,
        "_id username name mobile role createTime"
      );
      return res.status(200).json({
        msg: "success",
        data: { userList: arrUtil.groupArr(userList, "role") }
      });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async updateUser(req, res, next) {
    const request = req.body;
    try {
      var user = await User.findById(request.id);
      if (!user) {
        return res.sendStatus(401);
      }
      if (typeof request.name !== "undefined") user.name = request.name;
      if (typeof request.mobile !== "undefined") user.mobile = request.mobile;
      if (typeof request.password !== "undefined") {
        user.setPassword(request.password);
      }
      await user.save();
      return res
        .status(200)
        .json({ msg: "success", data: { user: user.toAuthJSON() } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteUser(req, res, next) {
    const request = req.query;
    try {
      await User.findByIdAndDelete(request.userId);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async login(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        err = createError(500, err);
        return next(err);
      }
      if (user) {
        // 用户密码验证，返回token
        user.token = user.generateJWT();
        return res
          .status(200)
          .json({ msg: "success", data: { user: user.toAuthJSON() } });
      } else {
        return next(createError(422, info));
      }
    })(req, res, next);
  }
}

export default userController;
