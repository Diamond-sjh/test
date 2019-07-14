// 1. 获取元素
var hours = document.querySelector('#hours');
var minutes = document.querySelector('#minutes');
var seconds = document.querySelector('#seconds');

// 2. 开启一个定时器,间隔时间为1000毫秒
var num = setInterval(function () {
  fn();
}, 1000);


// 3 封装
function fn() {
  // 3.1 定义两个时间（现在、未来）
  var start = new Date();
  var end = new Date('2019/07/11 22:01:00');
  // 3.2 计算两个日期的时间差（毫秒差）
  var temp = end - start;
  // 3.3 把毫秒差转换为多少小时、分钟、秒
  var h = parseInt(temp / 1000 / 60 / 60);
  h = h < 10 ? '0' + h : h;
  var m = parseInt(temp / 1000 / 60 % 60);
  m = m < 10 ? '0' + m : m;
  var s = parseInt(temp / 1000 % 60);
  s = s < 10 ? '0' + s : s;
  // 3.4 赋值到页面上的元素
  hours.innerText = h;
  minutes.innerText = m;
  seconds.innerText = s;

  // 判断时间是否到达目标,若到达停止定时器
  if (temp==0) {
    clearInterval(num);
  }

  if (temp< 0) {
    clearInterval(num);
    hours.innerText = '00';
    minutes.innerText = '00';
    seconds.innerText = '00';
  }
};
fn();