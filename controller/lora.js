import createError from "http-errors";
import Lora from "../models/lora";
import xlsx from "node-xlsx";
import path from "path";
import fs from "fs";
import arrUtil from "../utils/arrUtil";
const { promisify } = require("util");
const deleteFile = promisify(fs.unlink);

class loraController {
  // 创建设备
  static async createLora(req, res, next) {
    // 获取request值，为body
    const request = req.body;
    var lora = new Lora();
    lora.loraAddr = request.loraAddr;
    lora.serverAddr = request.serverAddr;
    lora.commType = request.commType;
    lora.heartCycle = request.heartCycle;
    lora.port = request.port;

    // try {
    //   // 等待 创建完成
    //   await lora.save();
    //   // 返回200
    //   return res.status(200).json({ msg: "success", data: { lora: lora } });
    // } catch (err) {
    //   // 返回500
    //   err = createError(500, err);
    //   return next(err);
    // }
  }

  static async getLora(req, res, next) {
    // 获取request值，为query
    const request = req.query;
    // 创建查询条件数组
    var query = {};
    if (request.loraAddr) query.loraAddr = request.loraAddr;

    try {
      // 等待查询返回结果
      var loraList = await Lora.find(
        //查询条件数组
        query,
        //查询的字段
        "loraAddr serverAddr commType heartCycle port block storey createTime note"
      );
      // 数据分组
      if (request.key) loraList = arrUtil.groupArr(loraList, request.key);

      return res
        .status(200)
        .json({ msg: "success", data: { loraList: loraList } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async importloraFromXlsx(file, req, res, next) {
    const fileInfo = {
      name: file.filename,
      type: file.mimetype,
      size: file.size,
      path: file.path
    };
    const basePath = path.resolve(__dirname, "../upload/tmp/") + "/";
    const xlsxPath = basePath + fileInfo.name;
    try {
      const workBook = await xlsx.parse(xlsxPath);
      const workSheet = workBook[0].data;
      var loraList = [];
      for (let index = 1; index < workSheet.length; index++) {
        loraList.push({
          name: workSheet[index][0],
          type: workSheet[index][1],
          brand: workSheet[index][2]
        });
      }
      await deleteFile(xlsxPath);
      await lora.insertMany(loraList);
      return res.status(200).json({
        msg: "success",
        data: { fileInfo: fileInfo, loraList: loraList }
      });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}
export default loraController;
