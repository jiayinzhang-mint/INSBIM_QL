import mongoose from "mongoose"

const Schema = mongoose.Schema;

// schema
const userSchema = new Schema({
  username: String,
  password: String,
  mobile: String,
  name: String,
});

const userModel = mongoose.model("user", userSchema);
export default userModel