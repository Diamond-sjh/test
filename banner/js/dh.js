/* 
  Element:变化的元素
  moveVal:元素移动的距离
  stepVal:每一次位移的距离
*/
// 定义一个全局变量dsq
var dsq;
function newFunction(Element, moveVal, stepVal) {
  // 清除重复点击，重复启动定时器造成的干扰
  clearInterval(dsq);
  // 获取元素距定位父元素的距离(即left)
  var leftVal = Element.offsetLeft;
  // 使用反复定时器操作leftVal来控制div的移动
  dsq = window.setInterval(function() {
  // 盒子的left值和盒子需要变化的位置相同时(到达目标位置)，停止定时器，停止整个函数
    if (leftVal == moveVal) {
      clearInterval(dsq);
      return;
    }
    // 如果moveVal不是stepVal整倍数，就会出现弹动效果，如果剩余没有走的距离不足以再移动一步，那我们直接让元素到达目标值
    if (Math.abs(moveVal - leftVal) < stepVal) {
      leftVal = moveVal;
    } else {
      // 如果是正方向移动的话，moveVal一定是大于leftVal
      if (moveVal > leftVal) {
        leftVal += stepVal;
      } else {
        leftVal -= stepVal;
      }
    }
    // 将上面得到的leftVal赋值给盒子的left
    Element.style.left = leftVal + "px";
  }, 100);
}
