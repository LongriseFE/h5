#### checkbox 复选框
一组备选项中进行多选
###### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。
<div class="code-pre">
  <div class="hc-form-group">
    <div class="hc-form-checkbox hc-primary hc-form-checkbox-active">
      <input class="hc-form-core" type="checkbox" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label" ctf="hc_cblabel">项一</label>
    </div>
    <div class="hc-form-checkbox hc-primary ">
      <input class="hc-form-core" type="checkbox" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-checkbox hc-primary ">
      <input class="hc-form-core" type="checkbox" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
    <div class="hc-form-checkbox hc-primary ">
      <input class="hc-form-core" type="checkbox" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项四</label>
    </div>
    <div class="hc-form-checkbox hc-primary ">
      <input class="hc-form-core" type="checkbox" value="3">
      <span class="hc-form-frame" ctf="hc_cbcore">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项五</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group">
  <div class="hc-form-checkbox hc-primary hc-form-checkbox-active">
    <input class="hc-form-core" type="checkbox" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label" ctf="hc_cblabel">项一</label>
  </div>
  <div class="hc-form-checkbox hc-primary ">
    <input class="hc-form-core" type="checkbox" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-checkbox hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
  <div class="hc-form-checkbox hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项四</label>
  </div>
  <div class="hc-form-checkbox hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame" ctf="hc_cbcore">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项五</label>
  </div>
</div>
```
###### 圆形复选框
<div class="code-pre">
  <div class="hc-form-checkbox-circle hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame" ctf="hc_cbcore">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">发送短信</label>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-checkbox-circle hc-primary ">
  <input class="hc-form-core" type="checkbox" value="3">
  <span class="hc-form-frame" ctf="hc_cbcore">
    <i class="hc-iconfont hc-icon-checkbox"></i>
  </span>
  <label class="hc-form-label">发送短信</label>
</div>
```
###### 复选按钮
类似单选按钮。
<div class="code-pre">
  <div class="hc-form-group">
    <div class="hc-form-checkbox-button hc-primary hc-form-checkbox-active">
      <input class="hc-form-core" type="checkbox" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label" ctf="hc_cblabel">项一</label>
    </div>
    <div class="hc-form-checkbox-button hc-primary ">
      <input class="hc-form-core" type="checkbox" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-checkbox-button hc-primary ">
      <input class="hc-form-core" type="checkbox" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
    <div class="hc-form-checkbox-button hc-primary ">
      <input class="hc-form-core" type="checkbox" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项四</label>
    </div>
    <div class="hc-form-checkbox-button hc-primary ">
      <input class="hc-form-core" type="checkbox" value="3">
      <span class="hc-form-frame" ctf="hc_cbcore">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项五</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group">
  <div class="hc-form-checkbox-button hc-primary hc-form-checkbox-active">
    <input class="hc-form-core" type="checkbox" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label" ctf="hc_cblabel">项一</label>
  </div>
  <div class="hc-form-checkbox-button hc-primary ">
    <input class="hc-form-core" type="checkbox" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-checkbox-button hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
  <div class="hc-form-checkbox-button hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项四</label>
  </div>
  <div class="hc-form-checkbox-button hc-primary ">
    <input class="hc-form-core" type="checkbox" value="3">
    <span class="hc-form-frame" ctf="hc_cbcore">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项五</label>
  </div>
</div>
```