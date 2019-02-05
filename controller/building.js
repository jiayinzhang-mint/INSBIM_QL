import createError from "http-errors";
import Building from "../models/building";
import deviceController from "../controller/device";
class buildingController {
  static async createBuilding(req, res, next) {
    const request = req.body;
    var building = new Building();
    building.block = request.block;
    building.floor = Number(request.floor);
    try {
      await building.save();
      return res.status(200).json({ msg: "success", building: building });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async getBuildingList(req, res, next) {
    const buildingList = await Building.find({}, "block floor");
    return res.status(200).json({ msg: "success", buildingList: buildingList });
  }

  static async getBuilding(req, res, next) {
    const id = req.params.id;
    try {
      const building = await Building.findById(id);
      return res.status(200).json({ msg: "success", building: building });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }

  static async deleteBuilding(req, res, next) {
    const id = req.body.id;
    try {
      // device in this building object will be released first
      await deviceController.releaseDevice(id);
      await Building.findByIdAndRemove(id);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}

export default buildingController;
