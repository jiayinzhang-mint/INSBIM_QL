import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema
const dataInfoSchema = new Schema({
  node_id: String,
  building_num: String,
  company: String,
  node_type: String,
  floot: String,
  gis: {},
  data_list: [],
  note: String
});

const DataInfo = mongoose.model("data_info", dataInfoSchema);
export default DataInfo;
