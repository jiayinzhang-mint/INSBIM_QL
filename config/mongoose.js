import mongoose from "mongoose";

mongoose.set("useCreateIndex", true);
const mongoConfig = "mongodb://127.0.0.1/INSBIM";

export default mongoConfig;
