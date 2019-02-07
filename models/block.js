import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const blockSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  desc: String,
  titlePic: String,
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Block = mongoose.model("block", blockSchema);
export default Block;
