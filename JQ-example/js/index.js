// 1. 点击左侧表格的添加，相应条目出现在右侧列表内，左侧列表对应条目的最后一列由 添加 变为 已添加
// 2. 点击左上侧批量添加，左侧选中的条目出现在右侧列表内，左侧列表对应条目的最后一列由 添加 变为 已添加
// 3. 点击右侧列表对应条目的叉号，从右侧列表内删除，左侧列表对应条目最后一列由 已添加 变回 添加
// 4. 点击右侧列表上部的批量移除，从右侧列表内删除选中项，左侧列表对应条目最后一列由 已添加 变回 添加
// 5. 点击右侧列表清空，清空右侧列表，左侧列表全部条目的最后一列变回 添加
// style="color:#ccc;"







// ---------------------------------------------------------左侧
// -----------------------------------全选按钮

// 全选按钮函数封装
function fn1() {
  // 获取tbOne中的行数==>即tr的个数
  var len1 = $('.tbOne tr').length;

  // 获取被选中复选框的个数
  var len2 = $('.tbOne input:checked').length;

  // 判断
  if (len1 == len2) {
    $('.bTable thead input').prop('checked', true);
  } else {
    $('.bTable thead input').prop('checked', false);
  }
}

// 点击bTable中的复选框
$('.bTable thead input').click(function () {
  $('.tbOne input').prop('checked', $(this).prop('checked'));
})

// 点击tbOne中的复选框
$('.tbOne').on('click', 'input', fn1)




// -------------------------------------添加内容

// 添加内容函数封装==>参数$Tr:为当前所要添加条目
function fn2($Tr) {
  // 获取当前条目第二个td的内容
  var txt = $Tr.find('td:nth-child(2)').text();
  // 对应条目的最后一列由 添加 变为 已添加
  $Tr.find('a').text('已添加').css('color', '#ccc');

  // 当前条目的复选框checked、disabled为true
  $Tr.find('input').prop('disabled', true).prop('checked', true);

  // 右侧列表创建tr>td*3
  // 创建tr
  $('<tr></tr>').appendTo('.tbTwo');
  // 右侧列表的该行第1个td内容为复选框
  $('<td></td>').appendTo('.tbTwo tr:last-child');
  $('<input type="checkbox">').appendTo('.tbTwo tr:last-child td:first-child');
  // 相应条目出现在 右侧列表新建tr的第2个td内
  $('<td>' + txt + '</td>').appendTo('.tbTwo tr:last-child');
  // 右侧列表的该行第3个td内容为❌
  $('<td></td>').appendTo('.tbTwo tr:last-child');
  $('<a href="javascript:;">×</a>').appendTo('.tbTwo tr:last-child td:last-child');
  // 判断是否全选
  fn1();
  if ($('.bTable thead input').prop('checked')) {
    $('.bTable thead input').prop('disabled', true);
  } else {
    $('.bTable thead input').prop('disabled', false);
  }
}

// 点击左侧表格的“添加”
$('.tbOne').on('click', 'a', function () {
  // 获取点击的a所在的条目
  var $Tr = $(this).parent().parent();

  // 获取当前的复选框是否被选中
  var isCheck = $Tr.find('input').prop('disabled');


  // 判断该条目是否已被选中
  if (!isCheck) {
    // 没有被禁用
    fn2($Tr);
  }

})

// 点击左侧表格的“批量添加”
$('.allBtn').click(function () {
  // 获取被选中未被禁用的复选框的个数
  var $isCheck = $('.tbOne input:checked:not(:disabled)');
  // var a = $('input[type="checkbox"]:checked')
  // var a = $('input[type="checkbox"]:not(:checked)')
  // 判断tbody中是否有选中的的复选框
  if ($isCheck.length == 0) {
    alert('请选中要添加的内容')
  } else {
    // 右侧遍历创建tr>td*3
    for (var i = 0; i < $isCheck.length; i++) {
      // 获取当前所在的条目
      var $Tr = $isCheck.eq(i).parent().parent()
      fn2($Tr);
    }
  }
})



// ---------------------------------------------------------右侧

// -----------------------------------全选按钮

// 右侧全选按钮函数封装
function fn3() {
  // 获取tbOne中的行数==>即tr的个数
  var len1 = $('.tbTwo tr').length;

  // 获取被选中复选框的个数
  var len2 = $('.tbTwo input:checked').length;

  // 判断
  if (len1 == len2) {
    $('.lTable thead input').prop('checked', true);
  } else {
    $('.lTable thead input').prop('checked', false);
  }
}

// 点击bTable中的复选框
$('.lTable thead input').click(function () {
  $('.tbTwo input').prop('checked', $(this).prop('checked'));
})

// 点击tbOne中的复选框
$('.tbTwo').on('click', 'input', fn3)

// -------------------------------------删除内容


// 删除函数封装
function fn4(txt1) {
  // 获取左侧列表的每一行的第二个td的内容
  for (var i = 0; i < $('.tbOne tr').length; i++) {
    var txt2 = $('.tbOne tr').eq(i)
      .find('td:nth-child(2)').text();

    // 与txt2比较
    if (txt1 == txt2) {
      // 相等则改变该行a标签的内容及样式
      $('.tbOne tr').eq(i)
        .find('a')
        .text('添加')
        .css('color', '#7F3528');
      // 当前条目的复选框checked、disabled为false
      $('.tbOne tr').eq(i)
        .find('input')
        .prop('disabled', false)
        .prop('checked', false);
    }
  }
  fn1();
  $('.lTable thead input').prop('checked', false);
  if ($('.bTable thead input').prop('checked')) {
    $('.bTable thead input').prop('disabled', true);
  } else {
    $('.bTable thead input').prop('disabled', false);
  }
}


// 点击×号删除对应的整行
$('.tbTwo').on('click', 'a', function () {
  // 获取点击的a所在的条目
  var $Tr = $(this).parent().parent();

  // 获取点击的a所在的条目的第二个td的内容
  var txt1 = $(this).parent().prev().text();

  // 确认删除该行
  if (confirm('确认删除该行')) {
    $Tr.remove();

    // 调用函数fn2
    fn4(txt1);
  }
})

// 点击批量删除删除选中项
$('.btn1').click(function () {
  // 获取选中的复选框
  var $isCheck = $('.tbTwo input:checked')

  if ($isCheck.length == 0) {
    alert('请选中要删除的内容')
  } else {
    if (confirm('确认删除该行')) {
      // 获取选中条目的公司名称
      for (var j = 0; j < $isCheck.length; j++) {

        // 选中的行的公司名称
        var txt1 = $isCheck.eq(j).parent().parent()
          .find('td:nth-child(2)').text();

        // 调用函数fn2
        fn4(txt1);

        // 删除选中的行
        $isCheck.eq(j).parent().parent().remove();
      }
    }
  }
})


// 点击清空按钮
$('.btn2').click(function () {
  if (confirm('是否清空列表')) {
    // 获取选中条目的公司名称
    for (var j = 0; j < $('.tbTwo tr').length; j++) {

      // 选中的行的公司名称
      var txt1 = $('.tbTwo tr').eq(j)
        .find('td:nth-child(2)').text();

      // 调用函数fn2
      fn4(txt1);

      // 删除选中的行
    }
    $('.tbTwo tr').remove();
  }
})