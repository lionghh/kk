// 转换日期，第一个参数日期，第二个参数，加或减多少天
function changeDateDate(date, num) {
  let tempDate = new Date(date.getTime()) // 复制日期
  tempDate.setDate(tempDate.getDate() + num)
  return tempDate
}

// 格式化日期
function formatDate(date) {
  if (date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return y + "-" + formatNum(m) + "-" + formatNum(d)
  } else {
    return ''
  }
}

// 格式化数字
function formatNum(num) {
  let str = num.toString()
  if (str.length < 2) {
    str = "0" + str;
  }
  return str;
}

// 是否闰年
function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

// 获取年月的天数
function getMonthDayNum(year, month) {
  month = month + 1
  if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) != -1) {
    return 31;
  } else if ([4, 6, 9, 11].indexOf(month) != -1) {
    return 30;
  } else if (isLeapYear(year)) { // 2月特殊处理
    return 29;
  } else {
    return 28;
  }
}

// 获取年月的起始日期
function getMonthRange(date) { // 返回某个月的起始和结束时间
  let year = date.getFullYear()
  let month = date.getMonth()
  let maxDayNum = getMonthDayNum(year, month)
  return {
    begin: new Date(year, month, 1),
    end: new Date(year, month, maxDayNum),
  }
}

// 根据月份生成日期数组
function getMonthDays(year, month) { // 返回某个月的起始和结束时间
  let maxDayNum = getMonthDayNum(year, month)
  let days = []
  for (let i = 1; i <= maxDayNum; i++) {
    days.push(new Date(year, month, i))
  }
  return days
}

export  default {
  changeDateDate,
  formatDate,
  formatNum,
  getMonthRange,
  getMonthDays,
  getMonthDayNum
}

