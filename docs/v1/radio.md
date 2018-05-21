#### radio 单选框
在一组备选项中进行单选
###### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用select。

<div class="code-pre">
  <div class="hc-form-group">
    <div class="hc-form-radio hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group">
  <div class="hc-form-radio hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
```

###### 单选按钮
有时候，普通的单选按钮在手机上并不好操作，这时候就需要更方便操作的展现形式，单选按钮应运而生！单选按钮分三种：`直角`,`圆角`,`圆弧`，单选按钮只需要将`hc-form-radio`改成`hc-form-radio-button`，单选按钮里面不一定是文字，也可以是图标，具体的请参考图标！
<div class="code-pre">
  <div class="hc-form-group">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-conner" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-conner">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
```

###### 单选按钮对齐方式
单选按钮默认从左到右排列，当然也可以居中，或者从右到左排列。
<div class="code-pre">
  <div class="hc-form-group hc-rounder">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-form-center">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-form-end">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group hc-rounder">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-form-center">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-form-end">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
```
###### 单选列表
单选列表只需要将`hc-form-radio`改成`hc-form-radio-list`，并且将`hc-form-frame`里面的图标换成`hc-icon-checkbox`。
<div class="code-pre">
  <div class="hc-form-group hc-rounder hc-form-end">
    <div class="hc-form-radio-list hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-list hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-list hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-checkbox"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group hc-rounder hc-form-end">
  <div class="hc-form-radio-list hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-list hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-list hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-checkbox"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
```
###### 不同尺寸
不同尺寸主要针对单选按钮，分为：`mini`，`small`,`medium`,`large`，每种尺寸应用的 地方都不尽相同。
<div class="code-pre">
  <div class="hc-form-group hc-rounder hc-form-mini">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-form-small" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-form-medium" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-form-large" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group hc-rounder hc-form-mini">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-form-small">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-form-medium">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-form-large">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
```
###### 不同颜色
默认是蓝色，总共内置五种颜色：`primary`,`success`,`info`,`warning`,`danger`。
<div class="code-pre">
  <div class="hc-form-group hc-rounder hc-primary">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-warning" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-success" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-info" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-warning">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
  <div class="hc-form-group hc-rounder hc-danger" style="margin-top:0.5rem;">
    <div class="hc-form-radio-button hc-primary hc-form-radio-active">
      <input class="hc-form-core" type="radio" value="1">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项一</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="2">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项二</label>
    </div>
    <div class="hc-form-radio-button hc-primary">
      <input class="hc-form-core" type="radio" value="3">
      <span class="hc-form-frame">
        <i class="hc-iconfont hc-icon-radio"></i>
      </span>
      <label class="hc-form-label">项三</label>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group hc-rounder hc-primary">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-success">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-success">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-info">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-warning">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
<div class="hc-form-group hc-rounder hc-danger">
  <div class="hc-form-radio-button hc-primary hc-form-radio-active">
    <input class="hc-form-core" type="radio" value="1">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项一</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="2">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项二</label>
  </div>
  <div class="hc-form-radio-button hc-primary">
    <input class="hc-form-core" type="radio" value="3">
    <span class="hc-form-frame">
      <i class="hc-iconfont hc-icon-radio"></i>
    </span>
    <label class="hc-form-label">项三</label>
  </div>
</div>
```