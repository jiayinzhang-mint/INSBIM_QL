import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const buildingSchema = new Schema({
  block: String,
  floor: Number,
  device: [],
  createTime: {
    type: String,
    default: Date.now()
  }
});

const Building = mongoose.model("building", buildingSchema);

export default Building;
