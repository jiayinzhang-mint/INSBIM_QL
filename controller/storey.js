import createError from "http-errors";
import Storey from "../models/storey";
import deviceController from "./device";
class storeyController {
  static async createStorey(req, res, next) {
    const request = req.body;
    var storey = new Storey();
    storey.block = request.block;
    storey.floor = Number(request.floor);
    try {
      await storey.save();
      return res.status(200).json({ msg: "success", storey: storey });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getStoreyList(req, res, next) {
    const storeyList = await Storey.find({}, "block floor");
    return res.status(200).json({ msg: "success", storeyList: storeyList });
  }

  static async getStorey(req, res, next) {
    const id = req.params.id;
    try {
      const storey = await Storey.findById(id);
      return res.status(200).json({ msg: "success", storey: storey });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteStorey(req, res, next) {
    const id = req.body.id;
    try {
      // device in this storey object will be released first
      await deviceController.releaseDevice(id);
      await Storey.findByIdAndRemove(id);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}

export default storeyController;
