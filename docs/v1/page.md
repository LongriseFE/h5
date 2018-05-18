#### page 页面容器

用于布局页面组件，方便快速搭建页面的基本结构：

`hc-page`：外层容器。一个可见的页面全部当成一个page。

`hc-headerbar`：顶部title组件。

`hc-page-view`：页面中间区域，一个页面最重要的可视区。

`hc-page-footer`：页面底部容器，一般情况用来放button组件。

> 友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。

###### 基本页面

``` html
<div class="hc-page">
  <section class="hc-page-view">
    <div class="hc-page-scroller">
      <div class="hc-page-scroller-content">
        这里面是内容区
      </div>
    </div>
  </section>
</div>
```

<div class="phone">
  <div class="hc-page">
    <section class="hc-page-view">
      <div class="hc-page-scroller">
        <div class="hc-page-scroller-content">
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
        </div>
      </div>
    </section>
  </div>
</div>

***

###### 带顶部导航
顶部导航是另外一个单独的组件，直接加在`hc-page`里面就行了！

``` html
<div class="hc-page">
  <header class="hc-headerbar">
    <div class="hc-headerbar-back">
      <span class="hc-iconfont hc-icon-back"></span>
    </div>
    <h1 class="hc-headerbar-title">消息</h1>
    <div class="hc-headerbar-menu"></div>
  </header>
  <section class="hc-page-view">
    <div class="hc-page-scroller">
      <div class="hc-page-scroller-content">
        这里面是内容区
      </div>
    </div>
  </section>
</div>
```

<div class="phone">
  <div class="hc-page">
    <header class="hc-headerbar">
      <div class="hc-headerbar-back">
        <span class="hc-iconfont hc-icon-back"></span>
      </div>
      <h1 class="hc-headerbar-title">消息</h1>
      <div class="hc-headerbar-menu"></div>
    </header>
    <section class="hc-page-view">
      <div class="hc-page-scroller">
        <div class="hc-page-scroller-content">
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
        </div>
      </div>
    </section>
  </div>
</div>

***

###### 带底部按钮
`hc-page-view-footer`是一个容器，可以直接放在`hc-page`里面最后面就行了！，当然也可以放在`hc-page-view`里面，和里面的`hc-page-scroller`同级。`hc-page-view-footer-item`可以是多个，宽度要手动添加（hc-col-1 ………… hc-col-24）！

``` html
<div class="hc-page">
  <header class="hc-headerbar">
    <div class="hc-headerbar-back">
      <span class="hc-iconfont hc-icon-back"></span>
    </div>
    <h1 class="hc-headerbar-title">消息</h1>
    <div class="hc-headerbar-menu"></div>
  </header>
  <section class="hc-page-view">
    <div class="hc-page-scroller">
      <div class="hc-page-scroller-content">
        这里面是内容区
      </div>
    </div>
  </section>
  <footer class="hc-page-view-footer">
    <div class="hc-page-view-footer-item hc-col-24">
      <button class="hc-button hc-button-danger hc-button-full" data-ripple="ripple">
        <span class="hc-button-icon"></span>
        <span class="hc-button-label">确认</span>
      </button> 
    </div>
  </footer>
</div>
```

<div class="phone">
  <div class="hc-page">
    <header class="hc-headerbar">
      <div class="hc-headerbar-back">
        <span class="hc-iconfont hc-icon-back"></span>
      </div>
      <h1 class="hc-headerbar-title">消息</h1>
      <div class="hc-headerbar-menu"></div>
    </header>
    <section class="hc-page-view">
      <div class="hc-page-scroller">
        <div class="hc-page-scroller-content">
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
          <p>友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。友情提示：本ui库所有布局皆采用flex布局，使用前请确定目标浏览器是否兼容。</p>
        </div>
      </div>
    </section>
    <footer class="hc-page-view-footer">
      <div class="hc-page-view-footer-item hc-col-24">
        <button class="hc-button hc-button-danger hc-button-full" data-ripple="ripple">
          <span class="hc-button-icon"></span>
          <span class="hc-button-label">确认</span>
        </button> 
      </div>
    </footer>
  </div>
</div>

***

###### 一个完整的导航页面
一个app必然有一个导航页面，而最多的便是底部导航，为了代码能更好的复用，底部导航做成了一个组件！现实环境中，下面的导航是可以点击的。甚至可以手动滑动切换！

``` html
<div class="hc-page">
  <header class="hc-headerbar">
    <div class="hc-headerbar-back">
      <span class="hc-iconfont hc-icon-back"></span>
    </div>
    <h1 class="hc-headerbar-title">消息</h1>
    <div class="hc-headerbar-menu"></div>
  </header>
  <section class="hc-page-view">
    <div class="hc-tab hc-tab-reserve hc-tab-stretch">
      <ul class="hc-tab-bar">
        <li class="hc-tab-bar-item hc-tab-bar-active">
          <span class="hc-tab-bar-icon"></span>
          <span class="hc-tab-bar-label">消息</span>
          <span class="hc-tab-bar-badge"></span>
        </li>
        <li class="hc-tab-bar-item">
          <span class="hc-tab-bar-icon"></span>
          <span class="hc-tab-bar-label">通讯录</span>
          <span class="hc-tab-bar-badge"></span>
        </li>
        <li class="hc-tab-bar-item">
          <span class="hc-tab-bar-icon"></span>
          <span class="hc-tab-bar-label">工作台</span>
          <span class="hc-tab-bar-badge"></span>
        </li>
        <li class="hc-tab-bar-item">
          <span class="hc-tab-bar-icon"></span>
          <span class="hc-tab-bar-label">我的</span>
          <span class="hc-tab-bar-badge"></span>
        </li>
      </ul>
      <div class="hc-tab-panel">
        <div class="hc-tab-wrap">
          <div class="hc-tab-item">
            <div class="hc-page-scroller">
              <div class="hc-page-scroller-content">
                这里面内容超出滚动
              </div>
            </div>
          </div>
          <div class="hc-tab-item">超出不滚动</div>
          <div class="hc-tab-item">超出不滚动</div>
          <div class="hc-tab-item">超出不滚动</div>
        </div>
      </div>
    </div>
  </section>
</div>
```

<div class="phone">
  <div class="hc-page">
    <header class="hc-headerbar">
      <div class="hc-headerbar-back">
        <span class="hc-iconfont hc-icon-back"></span>
      </div>
      <h1 class="hc-headerbar-title">消息</h1>
      <div class="hc-headerbar-menu"></div>
    </header>
    <section class="hc-page-view">
      <div class="hc-tab hc-tab-reserve hc-tab-stretch">
        <ul class="hc-tab-bar">
          <li class="hc-tab-bar-item hc-tab-bar-active">
            <span class="hc-tab-bar-icon"></span>
            <span class="hc-tab-bar-label">消息</span>
            <span class="hc-tab-bar-badge"></span>
          </li>
          <li class="hc-tab-bar-item">
            <span class="hc-tab-bar-icon"></span>
            <span class="hc-tab-bar-label">通讯录</span>
            <span class="hc-tab-bar-badge"></span>
          </li>
          <li class="hc-tab-bar-item">
            <span class="hc-tab-bar-icon"></span>
            <span class="hc-tab-bar-label">工作台</span>
            <span class="hc-tab-bar-badge"></span>
          </li>
          <li class="hc-tab-bar-item">
            <span class="hc-tab-bar-icon"></span>
            <span class="hc-tab-bar-label">我的</span>
            <span class="hc-tab-bar-badge"></span>
          </li>
        </ul>
        <div class="hc-tab-panel">
          <div class="hc-tab-wrap">
            <div class="hc-tab-item"></div>
            <div class="hc-tab-item"></div>
            <div class="hc-tab-item"></div>
            <div class="hc-tab-item"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>