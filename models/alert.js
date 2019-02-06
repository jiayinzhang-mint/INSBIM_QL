import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const alertSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  level: Number,
  desc: String,
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Alert = mongoose.model("alert", alertSchema);
export default Alert;
