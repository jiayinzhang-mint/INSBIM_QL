import mongoose from "mongoose";
import validator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import secret from "../config/secret";
const Schema = mongoose.Schema;

// schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true],
    lowercase: true,
    index: true
  },
  createTime: {
    type: String,
    default: Date.now()
  },
  mobile: String,
  name: String,
  role: String,
  salt: String,
  hash: String
});
userSchema.plugin(validator);

class userHandler {
  setPassword(password) {
    var salt = crypto.randomBytes(16).toString("hex");
    var hash = crypto
      .pbkdf2Sync(password, salt, 10000, 512, "sha512")
      .toString("hex");
    var authPara = {
      salt: salt,
      hash: hash
    };
    return authPara;
  }

  validPassword(password) {
    var hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.hash === hash;
  }

  generateJWT() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 7);
    return jwt.sign(
      {
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
      },
      secret
    );
  }

  toAuthJSON() {
    return {
      username: this.username,
      name: this.name,
      role: this.role,
      mobile: this.mobile,
      token: this.generateJWT()
    };
  }
}

userSchema.loadClass(userHandler);
export default mongoose.model("user", userSchema);
