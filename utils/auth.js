import jwt from "express-jwt";
import secret from "../config/secret";

const getTokenFromHeaders = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "INSBIM"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
var auth = {
  required: jwt({
    secret: secret,
    userProperty: "payload",
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeaders
  })
};

export default auth;
