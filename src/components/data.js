export function dateFormatter (date) {
  //时间格式化
    let datetime = date;
    if (datetime) {
      datetime = new Date(datetime);
      let y = datetime.getFullYear() + "-";
      let mon = datetime.getMonth() + 1 + "-";
      let d = datetime.getDate() + " ";
      var h = datetime.getHours() + ":";//时  
      var mm = datetime.getMinutes() ;//分
      var s = datetime.getSeconds();//秒
      return y + mon + d + h + (mm < 10 ? "0" + mm : mm) + ":" + (s < 10 ? "0" + s : s);
    }
    return "";
};


