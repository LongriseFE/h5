window.onload = function () {
  var view = document.body;
  view.onclick = function (e) {
    var ev = e || window.event;
    var target = ev.target || ev.srcElement;
    var code = target.nextElementSibling.nextElementSibling;
    if (target.className === 'source') {
      code.style.display = 'block';
      target.className = 'source show';
      target.innerHTML = '隐藏代码';
    } else if (target.className === 'source show') {
      code.style.display = 'none';
      target.className = 'source';
      target.innerHTML = '显示代码';
    }
  };
};
