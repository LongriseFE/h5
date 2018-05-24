#### input 输入框
输入框在一个页面中至关重要，而在手机上，展现形式更为多样化，下面列举出一些！
###### 基础用法
下面是一个最简单的输入框！默认获取焦点的时候边框变蓝色！当输入框获取焦点的时候，需要在组件最外层添加`hc-form-input-focus`。
<div class="code-pre">
  <div class="hc-form-input">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
  <div class="hc-form-input hc-conner" style="margin-top:10px;">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
  <div class="hc-form-input hc-rounder" style="margin-top:10px;">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-input">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
<div class="hc-form-input hc-conner">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
<div class="hc-form-input hc-rounder">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
```
###### 下划线输入框
<div class="code-pre">
  <div class="hc-form-input-subline">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-input">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
```
###### 无边框输入框
<div class="code-pre">
  <div class="hc-form-input-light">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-light">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
```
###### 带图标输入框

<div class="code-pre">
  <div class="hc-form-input">
    <label class="hc-form-label">
      <span class="hc-iconfont hc-icon-password"></span>
    </label>
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
  <div class="hc-form-input" style="margin-top:10px;">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
    <span class="hc-form-frame">
      <span class="hc-iconfont hc-icon-password"></span>
    </span>
  </div>
  <div class="hc-form-input" style="margin-top:10px;">
    <label class="hc-form-label">
      <span class="hc-iconfont hc-icon-password"></span>
    </label>
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
    <span class="hc-form-frame">
      <span class="hc-iconfont hc-icon-password"></span>
    </span>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-input">
  <label class="hc-form-label">
    <span class="hc-iconfont hc-icon-password"></span>
  </label>
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
<div class="hc-form-input">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  <span class="hc-form-frame">
    <span class="hc-iconfont hc-icon-password"></span>
  </span>
</div>
<div class="hc-form-input">
  <label class="hc-form-label">
    <span class="hc-iconfont hc-icon-password"></span>
  </label>
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  <span class="hc-form-frame">
    <span class="hc-iconfont hc-icon-password"></span>
  </span>
</div>
```
###### 多行输入框 Textarea
<div class="code-pre">
  <div class="hc-form-textarea">
    <textarea class="hc-form-core" rows="5" placeholder="请输入内容" ctef="hc_textarea" md="name" bt="text" ht="input"></textarea>
  </div>
  <div class="hc-form-textarea hc-conner" style="margin-top:10px;">
    <textarea class="hc-form-core" rows="5" placeholder="请输入内容" ctef="hc_textarea" md="name" bt="text" ht="input"></textarea>
  </div>
  <div class="hc-form-textarea-light" style="margin-top:10px;">
    <textarea class="hc-form-core" rows="5" placeholder="请输入内容" ctef="hc_textarea" md="name" bt="text" ht="input"></textarea>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-textarea">
  <textarea class="hc-form-core" rows="5" placeholder="请输入内容" ctef="hc_textarea" md="name" bt="text" ht="input"></textarea>
</div>
<div class="hc-form-textarea hc-conner">
  <textarea class="hc-form-core" rows="5" placeholder="请输入内容" ctef="hc_textarea" md="name" bt="text" ht="input"></textarea>
</div>
<div class="hc-form-textarea-light">
  <textarea class="hc-form-core" rows="5" placeholder="请输入内容" ctef="hc_textarea" md="name" bt="text" ht="input"></textarea>
</div>
```
###### 不同颜色输入框
不同颜色的输入框看起来都是一样，唯一的区别就是获取焦点的时候边框颜色不同！同样`textarea`也有这些属性！
<div class="code-pre">
  <div class="hc-form-input hc-primary">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
  <div class="hc-form-input hc-success" style="margin-top:10px;">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
  <div class="hc-form-input hc-warning" style="margin-top:10px;">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
  <div class="hc-form-input hc-danger" style="margin-top:10px;">
    <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-input hc-primary">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
<div class="hc-form-input hc-success" style="margin-top:10px;">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
<div class="hc-form-input hc-warning" style="margin-top:10px;">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
<div class="hc-form-input hc-danger" style="margin-top:10px;">
  <input type="text" class="hc-form-core" ctef="hc_input" bt="text" ht="input" md="name" placeholder="请填写用户名！">
</div>
```