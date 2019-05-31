import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const loraSchema = new Schema({
  loraAddr: String, //网关地址
  serverAddr: String, // 服务器地址
  commType: String, //通信格式
  storey: String, //所属楼层
  block: String, //所属大楼
  heartCycle: String, //心跳周期
  port: String, //端口
  createTime: {
    type: String,
    default: Date.now()
  },
  note: String,
  nodes: [
    {
      createTime: {
        type: String,
        default: Date.now()
      }
    }
  ] //数据 内容不定
});

const Lora = mongoose.model("lora_conf", loraSchema);
export default Lora;
