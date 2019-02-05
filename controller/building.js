import Building from "../models/building";
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
      return next(err);
    }
  }

  static async getBuildingList(req, res, next) {
    const buildingList = await Building.find({}, "block floor");
    return res.status(200).json({ msg: "success", buildingList: buildingList });
  }

  static async getBuilding(req, res, next) {
    const id = req.params.id;
    const building = await Building.findById(id);
    return res.status(200).json({ msg: "success", building: building });
  }

  static async deleteBuilding(req, res, next) {
    const id = req.body.id;
    try {
      await Building.findByIdAndRemove(id);
      //待添加对设备冗余字段的处理
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(err);
    }
  }
}

export default buildingController;
