#### layout 布局
简称：栅栏布局，将屏幕横向等分为24分栏，以便迅速简便的创建布局。
###### 基础布局
使用单一芬兰创建基础的栅格布局。
<div class="code-pre">
  <ul class="hc-row">
    <li class="hc-col hc-col-24">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-10">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-8">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-6">
      <div class="block"></div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-row">
  <li class="hc-col hc-col-24">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-10">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-8">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-6">
    <div class="block"></div>
  </li>
</ul>
```
###### 一行布局
如果想一组元素在一行显示且不自动换行，切记`hc-col-xx`，后面的数字加起来不能超过24。否则会自动换行，在`hc-row`上加上对应的`class`，可以控制显示形式！

<div class="code-pre">
  <ul class="hc-row">
    <li class="hc-col hc-col-4">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-8">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-6">
      <div class="block"></div>
    </li>
  </ul>
  <ul class="hc-row hc-center">
    <li class="hc-col hc-col-4">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-8">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-6">
      <div class="block"></div>
    </li>
  </ul>
  <ul class="hc-row hc-end">
    <li class="hc-col hc-col-4">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-8">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-6">
      <div class="block"></div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-row">
  <li class="hc-col hc-col-4">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-8">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-6">
    <div class="block"></div>
  </li>
</ul>
<ul class="hc-row hc-center">
  <li class="hc-col hc-col-4">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-8">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-6">
    <div class="block"></div>
  </li>
</ul>
<ul class="hc-row hc-end">
  <li class="hc-col hc-col-4">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-8">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-6">
    <div class="block"></div>
  </li>
</ul>
```
###### 分栏间隔
上述案例中，每个模块都是紧挨在一起的，如果想每列之间有空隙，可以添加`hc-space`来进行控制，但是这里的间隔距离是固定死的，如若需要修改，可以通过主题文件进行覆盖。
<div class="code-pre">
  <ul class="hc-row hc-space">
    <li class="hc-col hc-col-24">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-10">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-8">
      <div class="block"></div>
    </li>
    <li class="hc-col hc-col-6">
      <div class="block"></div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-row hc-space">
  <li class="hc-col hc-col-24">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-10">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-8">
    <div class="block"></div>
  </li>
  <li class="hc-col hc-col-6">
    <div class="block"></div>
  </li>
</ul>
```