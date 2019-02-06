class arrUtil {
  // if element is in arr
  static isInArr(e, arr) {
    if (arr.indexOf(e) > -1) {
      return true;
    }
    return false;
  }

  // group arr by key
  static groupArr(arr, key) {
    var map = [];
    var newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!this.isInArr(arr[i][key], map)) {
        map.push(arr[i][key]);
        newArr.push({ key: arr[i][key], item: [arr[i]] });
      } else {
        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j].key == arr[i][key]) {
            newArr[j].item.push(arr[i]);
          }
        }
      }
    }
    return newArr;
  }
}

export default arrUtil;
