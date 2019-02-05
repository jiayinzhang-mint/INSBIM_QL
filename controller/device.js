import createError from "http-errors";
import Device from "../models/device";
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
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getDevice(req, res, next) {
    const deviceId = req.params.deviceId;
    try {
      const device = await Device.findById(
        deviceId,
        "name type storey brand desc"
      );
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getDeviceList(req, res, next) {
    const request = req.body;
    var query = {};
    if (request.storey) query.storey = request.storeyId;
    if (request.type) query.type = request.type;

    try {
      var deviceList = await Device.find(query, "name type storey brand");
      return res.status(200).json({ msg: "success", deviceList: deviceList });
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
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async releaseDevice(context) {
    var query = {};
    if (context.storeyId) query.storey = context.storeyId;
    if (context.blockId) query.block = context.blockId;
    console.log(query);
    await Device.updateMany(query, { storey: null, block: null });
  }
}
export default deviceController;
