import createError from "http-errors";
import Device from "../models/device";
import { type } from "os";

class deviceController {
  static async createDevice(req, res, next) {
    const request = req.body;
    var device = new Device();
    device.name = request.name;
    device.type = request.type;
    if (request.building) device.building = request.building;
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
      const device = await Device.findById(id, "name type building");
      return res.status(200).json({ msg: "success", device: device });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getDeviceList(req, res, next) {
    const request = req.body;
    var query = {};
    if (request.building) query.building = request.building;
    if (request.type) query.type = request.type;

    try {
      var deviceList = await Device.find(query, "name type building");
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
    if (request.building) query.building = request.building;
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

  static async releaseDevice(building) {
    await Device.updateMany({ building: building }, { building: null });
  }
}
export default deviceController;
