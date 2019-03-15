import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const alertSchema = new Schema({
  title: {
    type: String,
    unique: true
  }, //标题
  level: Number, //等级
  desc: String, //描述
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Alert = mongoose.model("alert", alertSchema);
export default Alert;
