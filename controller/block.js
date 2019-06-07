import createError from "http-errors";
import Block from "../models/block";
import storeyController from "../controller/storey";
import deviceController from "../controller/lora";

class blockController {
  static async createBlock(req, res, next) {
    const request = req.body;
    var block = new Block();
    block.name = request.name;
    // block.floorNum = request.floorNum;
    if (request.desc) block.desc = request.desc;
    try {
      await block.save();
      block.floorMin = request.floorMin;
      block.floorMax = request.floorMax;
      await storeyController.createStoreyForNewBlock(block);
      return res.status(200).json({ msg: "success", data: { block: block } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getBlock(req, res, next) {
    const request = req.query;
    var query = {};
    if (request.blockId) query.block = request.blockId;
    try {
      var blockList = await Block.find(query);
      return res
        .status(200)
        .json({ msg: "success", data: { blockList: blockList } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async updateBlock(req, res, next) {
    const request = req.body;
    var query = {};
    if (request.name) query.name = request.name;
    if (request.desc) query.desc = request.desc;

    try {
      var block = await Block.findByIdAndUpdate(request.blockId, query, {
        new: true
      });
      return res.status(200).json({ msg: "success", data: { block: block } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteBlock(req, res, next) {
    const blockId = req.query.blockId;
    try {
      // 删除大楼前，先删除所属设备，在删除楼层
      // await deviceController.releaseDevice({ blockId: blockId });
      await storeyController.deleteStoreyForDelBlock(blockId);
      await Block.findByIdAndRemove(blockId);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}

export default blockController;
