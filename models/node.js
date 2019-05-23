import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const nodeSchema = new Schema({
  nodeAddr: String, //节点地址
  loraAddr: String, //网关地址
  reportFrequency: String, //上报周期
  calibrationValue: String, //校准值
  voltFrequency: String, //电量告警周期
  dataFrequency: String, //数据告警周期
  MinValue: String, //告警最小阈值
  MaxValue: String, //告警最大阈值
  loraType: String, //节点类型
  createTime: {
    type: String,
    default: Date.now()
  },
  floor: String,
  building_num: String,
  data_list: [],
  alert_list: []
});

const Node = mongoose.model("node_conf", nodeSchema);
export default Node;
