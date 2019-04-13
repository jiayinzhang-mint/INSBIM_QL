import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const deviceSchema = new Schema({
  name: String, //名称
  type: String, //类型
  storey: String, //所属楼层
  block: String, //所属大楼
  brand: String, //品牌
  desc: String, //描述
  createTime: {
    type: String,
    default: Date.now()
  },
  coordinate: [],
  data: [
    {
      createTime: {
        type: String,
        default: Date.now()
      }
    }
  ] //数据 内容不定
});

const Device = mongoose.model("device", deviceSchema);
export default Device;
