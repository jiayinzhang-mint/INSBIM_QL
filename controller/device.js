import createError from "http-errors";
import Device from "../models/device";
import xlsx from "node-xlsx";
import path from "path";
import fs from "fs";
const { promisify } = require("util");
const deleteFile = promisify(fs.unlink);

class deviceController {
  static async createDevice(req, res, next) {
    const request = req.body;
    var device = new Device();
    device.name = request.name;
    device.type = request.type;
    if (request.brand) device.brand = request.brand;
    if (request.desc) device.desc = request.desc;
    if (request.storeyId) {
      device.storey = request.storeyId;
      device.block = request.blockId;
    }
    try {
      await device.save();
      return res.status(200).json({ msg: "success", data: { device: device } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getDevice(req, res, next) {
    const request = req.query;
    var query = {};
    if (request.deviceId) query._id = request.deviceId;
    if (request.storey) query.storey = request.storeyId;
    if (request.block) query.block = request.blockId;
    if (request.type) query.type = request.type;

    try {
      var deviceList = await Device.find(query, "name type brand block storey");
      return res
        .status(200)
        .json({ msg: "success", data: { deviceList: deviceList } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async updateDevice(req, res, next) {
    const request = req.body;
    var query = {};
    if (request.name) query.name = request.name;
    if (request.type) query.type = request.type;
    if (request.type) query.desc = request.desc;
    if (request.type) query.brand = request.brand;
    if (request.storey) {
      query.storey = request.storeyId;
      query.block = request.blockId;
    }
    try {
      const device = await Device.findByIdAndUpdate(request.deviceId, query);
      return res.status(200).json({ msg: "success", data: { device: device } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteDevice(req, res, next) {
    const request = req.body;
    try {
      await Device.findByIdAndRemove(request.deviceId);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async releaseDevice(context) {
    var query = {};
    if (context.storeyId) query.storey = context.storeyId;
    if (context.blockId) query.block = context.blockId;
    await Device.updateMany(query, { storey: null, block: null });
  }

  static async importDeviceFromXlsx(file, req, res, next) {
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
      var deviceList = [];
      for (let index = 1; index < workSheet.length; index++) {
        deviceList.push({
          name: workSheet[index][0],
          type: workSheet[index][1],
          brand: workSheet[index][2]
        });
      }
      await deleteFile(xlsxPath);
      await Device.insertMany(deviceList);
      return res.status(200).json({
        msg: "success",
        data: { fileInfo: fileInfo, deviceList: deviceList }
      });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}
export default deviceController;
