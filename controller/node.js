import createError from "http-errors";
import Node from "../models/node";
import Data from "../models/data";

class nodeController {
  static async getNode(req, res, next) {
    const request = req.query;
    console.log(request);
    var query = {};
    if (request.loraAddr) query.loraAddr = request.loraAddr;
    if (request.node_id) query.node_id = request.node_id;
    if (request.floor) query.floor = request.floor;
    console.log(request.floor);
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

  static async getNodeData(req, res, next) {
    const request = req.query;
    var query = {};
    if (query.node_id) query.node_id = request.node_id;
    try {
      var node = await Data.find(query);
      return res.status(200).json({ msg: "success", data: node });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
  }
}

export default nodeController;
