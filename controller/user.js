import createError from "http-errors";
import User from "../models/user";
import passport from "passport";

class userController {
  static async createUser(req, res, next) {
    const request = req.body;
    var user = new User();
    user.username = request.username;
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
      var userList = await User.find(query, "_id username role createTime");
      return res
        .status(200)
        .json({ msg: "success", data: { userList: userList } });
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
    const request = req.body;
    try {
      await User.findByIdAndDelete(request.id);
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
