var map = [];
var newArr = [];

class arrUtil {
  static isInArr(e, arr) {
    if (arr.indexOf(e) > -1) {
      return true;
    }
    return false;
  }

  static groupArr(arr, label) {
    for (let i = 0; i < arr.length; i++) {
      if (!this.isInArr(arr[i][label], map)) {
        map.push(arr[i][label]);
        newArr.push({ label: arr[i][label], item: [arr[i]] });
      } else {
        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j].label == arr[i][label]) {
            newArr[j].item.push(arr[i]);
          }
        }
      }
    }
  }
}
// arrUtil.groupArr(arr, "date");
// console.log(newArr[1].item[0].date);

export default arrUtil;
