import mongoose from "mongoose"

const Schema = mongoose.Schema;

// schema
const deviceSchema = new Schema({
  name: String,
  type: String,
  data: []
});

const Device = mongoose.model("device", deviceSchema);
export default Device