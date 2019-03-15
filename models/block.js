import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const blockSchema = new Schema({
  name: {
    type: String,
    unique: true
  }, //名称
  desc: String, //描述
  titlePic: String, //标题图片
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Block = mongoose.model("block", blockSchema);
export default Block;
