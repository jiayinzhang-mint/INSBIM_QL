import createError from "http-errors";
import fs from "fs";
import redis from "redis";
import bluebird from "bluebird";

bluebird.promisifyAll(redis);

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
  static async pushSetting(req, res, next) {
    try {
      var rs = redis.createClient({ host: "127.0.0.1", port: "6379" });
      const request = req.body;
      console.log(request);
      const value = request.value;
      await rs.lpush("lora_conf_start", value);
      return res.status(200).json({ msg: "success" });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}
export default gatewayController;
