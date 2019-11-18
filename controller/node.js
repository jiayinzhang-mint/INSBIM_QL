import createError from "http-errors";
import Node from "../models/node";
import Data from "../models/data";

class nodeController {
  static async getNode(req, res, next) {
    const request = req.query;
    console.log(request);
    var query = {};
    
    if (request.floor) {query.floor = request.floor;

console.log(request.floor);
    try {
      var nodeList = await Data.find(query);
      return res
        .status(200)
        .json({ msg: "success", data: { nodeList: nodeList } });
    } catch (err) {
      err = createError(500, err);
      return next(err);
    }
   }
   else{
    if (request.loraAddr) query.loraAddr = request.loraAddr;
    if (request.nodeAddr) query.nodeAddr = request.nodeAddr;
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
    
  }

  static async getNodeData(req, res, next) {
    const request = req.query;
    var query = {};
    if (request.nodeAddr) query.nodeAddr = request.nodeAddr;
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
