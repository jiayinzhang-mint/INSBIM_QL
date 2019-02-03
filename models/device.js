import mongoose from "mongoose"

const Schema = mongoose.Schema;

// schema
const deviceSchema = new Schema({
  name: String,
  type: String,
  data: []
});

const deviceModel = mongoose.model("device", deviceSchema);
export default deviceModel