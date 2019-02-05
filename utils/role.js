const adminGroup = ["mint"];

class role {
  static isAdmin(username) {
    if (adminGroup.indexOf(username) > -1) {
      return true;
    } else {
      return false;
    }
  }
}

export default role;
