import mongoose from "mongoose";
// mongodb 连接
mongoose.set("useCreateIndex", true);
const mongoConfig = "mongodb://127.0.0.1/INSBIM";

export default mongoConfig;
