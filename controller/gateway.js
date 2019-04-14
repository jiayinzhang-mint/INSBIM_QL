import createError from "http-errors";
import fs from "fs";

class gatewayController {
  // node.json
  static async getSetting(req, res, next) {
    try {
      const request = req.query;
      const filename = request.key;
      var data = await fs.readFileSync(`./gateway/${filename}.json`);
      data = JSON.parse(data);
      return res.status(200).json({ data: data });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
  static async updateSetting(req, res, next) {
    try {
      const request = req.body;
      const filename = request.key;
      console.log(filename);
      await fs.writeFileSync(`./gateway/${filename}.json`, request.setting);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}
export default gatewayController;
