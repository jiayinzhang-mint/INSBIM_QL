import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const storeySchema = new Schema({
  block: String,
  floor: Number,
  device: [],
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Storey = mongoose.model("floor", storeySchema);

export default Storey;
