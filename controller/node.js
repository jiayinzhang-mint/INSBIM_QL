import createError from "http-errors";
import Node from "../models/node";

class nodeController {
  static async getNode(req, res, next) {
    const request = req.query;
    var query = {};
    query.loraAddr = request.loraAddr;
    try {
      var nodeList = await Node.find(query);
      return res
        .status(200)
        .json({ msg: "success", data: { nodeList: nodeList } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}

export default nodeController;
