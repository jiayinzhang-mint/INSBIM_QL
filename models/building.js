import mongoose from "mongoose"

const Schema = mongoose.Schema;

// schema
const buildingSchema = new Schema({
  name: String,
  device: []
});

const buildingModel = mongoose.model("building", buildingSchema);
export default buildingModel