import createError from "http-errors";
import Storey from "../models/storey";
import deviceController from "./device";
import arrUtil from "../utils/arrUtil";
class storeyController {
  static async createStorey(req, res, next) {
    const request = req.body;
    var storey = new Storey();
    storey.block = request.blockId;
    storey.floor = Number(request.floor);
    try {
      await storey.save();
      return res.status(200).json({ msg: "success", data: { storey: storey } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getStorey(req, res, next) {
    const request = req.query;
    var query = {};
    if (request.storeyId) query._id = request.storeyId;
    if (request.block) query.block = request.block;
    try {
      var storeyList = await Storey.find(query, "block floor", {
        sort: "floor"
      });
      if (request.key) storeyList = arrUtil.groupArr(storeyList, request.key);
      return res.status(200).json({
        msg: "success",
        data: {
          storeyList: storeyList
        }
      });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteStorey(req, res, next) {
    const storeyId = req.query.storeyId;
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
    console.log(block);
    for (let index = block.floorMin; index < block.floorMax; index++) {
      if (index != 0) {
        storeyList.push({
          block: block._id,
          floor: index
        });
      }
    }
    await Storey.insertMany(storeyList);
  }

  static async deleteStoreyForDelBlock(blockId) {
    await Storey.deleteMany({ block: blockId });
  }
}

export default storeyController;
