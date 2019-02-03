// mongoose
import { connect, connection } from "mongoose";

// const configDev = [];
// configDev.usr = "mint";
// configDev.pwd = "INSCHINAisdead1";
// const url = `mongodb://${configDev.usr}:${configDev.pwd}@39.96.61.110/INSLENS`;
const urlBase = 'mongodb://127.0.0.1/INSBIM'

connect(
  urlBase,
  { useNewUrlParser: true, useFindAndModify: false }
);
const db = connection;

export default db