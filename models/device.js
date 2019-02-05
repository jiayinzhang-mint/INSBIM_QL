import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const deviceSchema = new Schema({
  name: String,
  type: String,
  storey: String,
  brand: String,
  desc: String,
  createTime: {
    type: String,
    default: Date.now()
  },
  data: [
    {
      createTime: {
        type: String,
        default: Date.now()
      }
    }
  ]
});

const Device = mongoose.model("device", deviceSchema);
export default Device;
