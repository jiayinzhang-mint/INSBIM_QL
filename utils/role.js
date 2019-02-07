import arrUtil from "./arrUtil";
const adminGroup = ["mint"];

class role {
  static isAdmin(username) {
    return arrUtil.isInArr(username, adminGroup);
  }
  static checkPermission(role) {}
}

export default role;
