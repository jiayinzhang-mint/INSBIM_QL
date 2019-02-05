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
    if (request.storey) device.storey = request.storey;
    try {
      await device.save();
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getDevice(req, res, next) {
    const id = req.params.id;
    try {
      const device = await Device.findById(id, "name type storey brand desc");
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getDeviceList(req, res, next) {
    const request = req.body;
    var query = {};
    if (request.storey) query.storey = request.storey;
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
    if (request.storey) query.storey = request.storey;
    try {
      const device = await Device.findByIdAndUpdate(request.id, query, {
        new: true
      });
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async releaseDevice(storey) {
    await Device.updateMany({ storey: storey }, { storey: null });
  }
}
export default deviceController;
