import fs from "fs";

var initFolder = ["../upload", "../upload/tmp"];

class fsInit {
  static async createFolder(folder) {
    try {
      fs.accessSync(folder);
    } catch (e) {
      fs.mkdirSync(folder);
    }
  }

  static async init() {
    initFolder.forEach(element => {
      this.createFolder(element);
    });
  }
}

fsInit.init();

export default fsInit;
