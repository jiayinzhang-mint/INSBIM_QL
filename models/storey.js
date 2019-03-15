import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const storeySchema = new Schema({
  block: String, //所属大楼
  floor: Number, //所属楼层
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Storey = mongoose.model("storey", storeySchema);

export default Storey;
