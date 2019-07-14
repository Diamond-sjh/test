var timer; // 表示定时器的标识
/*
  功能：动画
  参数：
    element 要运动的元素  元素
    targetValue 目标值   数字
    speed  速度     数字

*/
function move(element, targetValue, speed) {
  // 清除旧的的定时器
  clearInterval(timer);
  // 开启一个新的定时器
  timer = setInterval(function () {
    // 获取div原有的left值
    var v = element.offsetLeft;
    // 判断是否到达目标
    if (v == targetValue) {
      // 清除定时器，防止定时器下一次累计
      clearInterval(timer);
      // return关键字结束函数本次的执行
      return;
    }

    // 判断是否是最后一步：Math.abs(目标值-原有值) < 速度
    if (Math.abs(targetValue - v) < speed) {
      // 是最后一步
      element.style.left = targetValue + 'px';
    } else {
      // 不是最后一步
      // 判断方向，更改变量v
      if (targetValue - v > 0) {
        v = v + speed;
      } else {
        v = v - speed;
      }
      // 把更改后的值重新设置给div
      element.style.left = v + 'px';
    }

  }, 10);
};