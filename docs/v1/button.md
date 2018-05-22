#### 按钮
按钮的样式最为繁琐，按尺寸分为（mini、small、medium、large）不同的尺寸，根据形式分成（正常，圆角，半圆形，空心），根据颜色分成（primary、success、info、warning、danger）。而且这些属性高都可以随意搭配，组成你所需要的任何形式的按钮，当然如果项目需要渐变按钮，需要另外引用主题包。
###### html结构
一个按钮组件其基本html结构如下，其中可以任意增减自己需要的元素。
`hc-button-icon` 图标按钮必须，里面可以是`hc-iconfont`也可以是`png、svg图片`等等。
`hc-button-label` 图标的文字容器，文字和图标可以随意交换前后位置。
`input[type=file]` 用来实现手机拍照或者从相册选取图片。
<div class="code-pre">
  <button class="hc-button" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button> 
</div>
<p class="source">显示代码</p>

``` html
<button class="hc-button" data-ripple="ripple">
  <span class="hc-button-icon"></span>  <!--按钮图标-->
  <span class="hc-button-label">默认按钮</span> <!--按钮文字-->
  <input type="file" capture="camera" accept='image/*'/>  <!--上传按钮必须-->
</button>
```

###### 不同形式的按钮
按钮形式多式多样，目前只考虑了四种形式的按钮：
* `hc-button` 直角按钮
* `hc-button-conner` 圆角按钮
* `hc-button-round` 圆弧按钮
* `hc-button-circle` 圆形按钮

<div class="code-pre">
  <button class="hc-button" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-conner" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-rounder" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-circle" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">按钮</span>
  </button>
</div>
<p class="source">显示代码</p>

``` html
<button class="hc-button" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span> 
  <input type="file" capture="camera" accept='image/*'/>
</button>
<button class="hc-button-conner" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
  <input type="file" capture="camera" accept='image/*'/>
</button>
<button class="hc-button-round" data-ripple="ripple">
  <span class="hc-button-icon"></span> 
  <span class="hc-button-label">默认按钮</span>
  <input type="file" capture="camera" accept='image/*'/> 
</button>
<button class="hc-button-circle" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">按钮</span>
</button>
```

###### 不同颜色的按钮
按钮的颜色跟app整体色调同步，同样分为（`primary`、`success`、`info`、`warning`、`danger`）五种颜色！
<div class="code-pre">
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-success" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-info" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-warning" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-danger" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
</div>
<p class="source">显示代码</p>

``` html
<button class="hc-button" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
  <input type="file" capture="camera" accept='image/*'/>
</button>
<button class="hc-button-conner" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span> 
  <input type="file" capture="camera" accept='image/*'/>
</button>
<button class="hc-button-rounder" data-ripple="ripple">
  <span class="hc-button-icon"></span> 
  <span class="hc-button-label">默认按钮</span> 
  <input type="file" capture="camera" accept='image/*'/>
</button>
```
###### 不同尺寸的按钮
按钮尺寸分（`mini`、`small`、`medium`、`large`），后续很多组件都会沿用这一设置！
<div class="code-pre">
  <button class="hc-button hc-button-mini hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-small hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-medium hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-large hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
</div>
<p class="source">显示代码</p>

``` html
<button class="hc-button" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
  <input type="file" capture="camera" accept='image/*'/>
</button>
<button class="hc-button-conner" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span> 
  <input type="file" capture="camera" accept='image/*'/>
</button>
<button class="hc-button-rounder" data-ripple="ripple">
  <span class="hc-button-icon"></span> 
  <span class="hc-button-label">默认按钮</span> 
  <input type="file" capture="camera" accept='image/*'/>
</button>
```

###### 线条按钮
线条按钮不同于其他按钮（直角、圆角……），线条按钮需要在(`hc-button`, `hc-button-conner`, `hc-button-round`, `hc-button-circle`)基础上添加修饰，如果不添加，就默认是`hc-button`直角线性按钮。
<div class="code-pre">
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-conner hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-rounder hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-circle hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">删除</span>
  </button>
</div>
<p class="source">显示代码</p>

``` html
<button class="hc-button-outline hc-button-primary" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
</button>
<button class="hc-button-conner hc-button-outline hc-button-primary" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
</button>
<button class="hc-button-rounder hc-button-outline hc-button-primary" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
</button>
<button class="hc-button-circle hc-button-outline hc-button-primary" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">删除</span>
</button>
</button>
```
###### 文字按钮
为了页面的协调性，譬如一个列表后面都跟着一个按钮，这时候如果选用上面那些按钮，就会显得不协调，这时候就需要用文字按钮替代。
<div class="code-pre">
  <button class="hc-button-text hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-text hc-button-success" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-text hc-button-warning" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-text hc-button-danger" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">删除</span>
  </button>
</div>
<p class="source">显示代码</p>

``` html
<button class="hc-button-text hc-button-primary" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
</button>
<button class="hc-button-text hc-button-success" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
</button>
<button class="hc-button-text hc-button-warning" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">默认按钮</span>
</button>
<button class="hc-button-text hc-button-danger" data-ripple="ripple">
  <span class="hc-button-icon"></span>
  <span class="hc-button-label">删除</span>
</button>
```
###### 按钮组
一组按钮，可以将`hc-form-conner`，`hc-form-rounder`放在`hc-form-group`上面代替单个按钮`hc-button-conner`，`hc-button-rounder`。
<div class="code-pre">
  <div class="hc-form-group">
    <button class="hc-button hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    <button class="hc-button hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    </button>
  </div>
  <div class="hc-form-group hc-form-conner" style="margin-top:1rem;">
    <button class="hc-button hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    <button class="hc-button hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    </button>
  </div>
  <div class="hc-form-group hc-form-rounder" style="margin-top:1rem;">
    <button class="hc-button hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    <button class="hc-button hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    </button>
  </div>
  <div class="hc-form-group" style="margin-top:1rem;">
    <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    </button>
  </div>
  <div class="hc-form-group hc-form-conner" style="margin-top:1rem;">
    <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    </button>
  </div>
  <div class="hc-form-group hc-form-rounder" style="margin-top:1rem;">
    <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
      <span class="hc-button-icon"></span>
      <span class="hc-button-label">默认按钮</span>
    </button>
    </button>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-group">
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  </button>
</div>
<div class="hc-form-group hc-form-conner" style="margin-top:1rem;">
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  </button>
</div>
<div class="hc-form-group hc-form-rounder" style="margin-top:1rem;">
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  </button>
</div>
<div class="hc-form-group" style="margin-top:1rem;">
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  </button>
</div>
<div class="hc-form-group hc-form-conner" style="margin-top:1rem;">
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  </button>
</div>
<div class="hc-form-group hc-form-rounder" style="margin-top:1rem;">
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-outline hc-button-primary" data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  </button>
</div>
```
###### 禁用状态
涉及到权限操作的时候，希望有些操作可以禁止，就用到了按钮的禁用状态！
<div class="code-pre">
  <button class="hc-button hc-button-primary" disabled data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-conner hc-button-primary" disabled data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-rounder hc-button-primary" disabled data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-rounder hc-button-outline hc-button-primary" disabled data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
  <button class="hc-button-text hc-button-primary" disabled data-ripple="ripple">
    <span class="hc-button-icon"></span>
    <span class="hc-button-label">默认按钮</span>
  </button>
</div>
<p class="source">显示代码</p>