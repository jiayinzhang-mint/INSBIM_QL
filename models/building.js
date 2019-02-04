import mongoose from "mongoose"

const Schema = mongoose.Schema;

// schema
const buildingSchema = new Schema({
  name: String,
  device: []
});

const Building = mongoose.model("building", buildingSchema);

class Building {

}

export default Building