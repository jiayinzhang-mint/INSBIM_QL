import createError from "http-errors";
import Storey from "../models/storey";
import deviceController from "./device";
import arrUtil from "../utils/arrUtil";
class storeyController {
  static async createStorey(req, res, next) {
    const request = req.body;
    var storey = new Storey();
    storey.block = request.block;
    storey.floor = Number(request.floor);
    try {
      await storey.save();
      return res.status(200).json({ msg: "success", data: { storey: storey } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getStoreyList(req, res, next) {
    const request = req.body;
    var query = {};
    if (request.block) query.block = request.block;
    try {
      const storeyList = await Storey.find(query, "block floor");
      return res.status(200).json({
        msg: "success",
        data: {
          storeyList: arrUtil.groupArr(storeyList, "block")
        }
      });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getStorey(req, res, next) {
    const storeyId = req.params.storeyId;
    try {
      const storey = await Storey.findById(storeyId);
      return res.status(200).json({ msg: "success", data: { storey: storey } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteStorey(req, res, next) {
    const storeyId = req.body.storeyId;
    try {
      // device in this storey object will be released first
      await deviceController.releaseDevice({ storeyId: storeyId });
      await Storey.findByIdAndRemove(storeyId);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async createStoreyForNewBlock(block) {
    var storeyList = [];
    for (let index = 1; index < block.floorNum; index++) {
      storeyList.push({
        block: block._id,
        floor: index
      });
    }
    await Storey.insertMany(storeyList);
  }

  static async deleteStoreyForDelBlock(blockId) {
    await Storey.deleteMany({ block: blockId });
  }
}

export default storeyController;
