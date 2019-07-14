/* 
  1、点击右侧按钮，图片盒子div.content向左移动，
  2、点击左侧按钮，图片盒子div.content向右移动，
  3、点击小点按钮，移动至相对应的图片
  4、图片自动轮播==>等同于右按钮效果
  5、鼠标进入停止轮播
  6、鼠标离开继续轮播
*/

// 获取元素
var banner = document.querySelector("#bannerCenter");
var content = document.querySelector(".content");
var btnLeft = document.querySelector(".btn-left");
var btnright = document.querySelector(".btn-right");
var lis = document.querySelectorAll(".controls li");

// 定义变量做为图片的下标，从0开始
var index = 0;

// 获取轮播图呈现内容盒子的宽度
var w = banner.offsetWidth;

// 1、右侧按钮功能实现
btnright.onclick = function () {
  if (index == 0) {
    content.style.left = 0 + "px";
  }
  lis[index].className = "";
  index++;
  var moveVal = -index * w;
  newFunction(content, moveVal, 200);
  if (index > 3) {
    index = 0;
  }
  lis[index].className = "active";
};

// 2、左侧按钮功能实现
btnLeft.onclick = function () {
  lis[index].className = "";
  index--;
  if (index < 0) {
    index = 3;
    content.style.left = -2880 + "px";
  }
  var moveVal = -index * w;
  newFunction(content, moveVal, 200);
  lis[index].className = "active";
};

// 3、小点按钮功能实现
for (var i = 0; i < lis.length; i++) {
  // 记录下标
  lis[i].liIndex = i;
  lis[i].onclick = function () {
    // 清除上一个li的class属性
    lis[index].className = "";
    // 找到当前点击li的下标
    index = this.liIndex;

    var moveVal = -index * w;
    newFunction(content, moveVal, 500);
    lis[index].className = "active";
  };
}

// 4、自动轮播(定时器实现)
var autoPlay = setInterval(function () {
  btnright.onclick();
}, 4000);

// 5、鼠标进入停止自动轮播
banner.onmouseover = function () {
  clearInterval(autoPlay);
};

// 6、鼠标离开继续轮播
banner.onmouseout = function () {
  autoPlay = setInterval(function () {
    btnright.onclick();
  }, 4000);
};
