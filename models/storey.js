import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const storeySchema = new Schema({
  block: String,
  floor: Number,
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Storey = mongoose.model("storey", storeySchema);

export default Storey;
