#### tab标签页
分隔内容上有关联但属于不同类别的数据集合。
###### 基础用法
<div class="code-pre">
  <div class="hc-tab" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
    <ul class="hc-tab-bar" ctf="hc_tabulbox">
      <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
    </ul>
    <div class="hc-tab-panel">
      <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第一页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
            第二页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
            第三页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第四页
        </div>
      </div>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-tab" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
  <ul class="hc-tab-bar" ctf="hc_tabulbox">
    <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
  </ul>
  <div class="hc-tab-panel">
    <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第一页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
          第二页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
          第三页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第四页
      </div>
    </div>
  </div>
</div>
```
###### 自适应
<div class="code-pre">
  <div class="hc-tab hc-tab-stretch" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
    <ul class="hc-tab-bar" ctf="hc_tabulbox">
      <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
    </ul>
    <div class="hc-tab-panel">
      <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第一页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
            第二页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
            第三页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第四页
        </div>
      </div>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-tab hc-tab-stretch" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
  <ul class="hc-tab-bar" ctf="hc_tabulbox">
    <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
  </ul>
  <div class="hc-tab-panel">
    <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第一页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
          第二页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
          第三页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第四页
      </div>
    </div>
  </div>
</div>
```
###### tab在下面
<div class="code-pre">
  <div class="hc-tab hc-tab-stretch hc-tab-reserve" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
    <ul class="hc-tab-bar" ctf="hc_tabulbox">
      <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
    </ul>
    <div class="hc-tab-panel">
      <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第一页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
            第二页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
            第三页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第四页
        </div>
      </div>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-tab hc-tab-stretch hc-tab-reserve" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
  <ul class="hc-tab-bar" ctf="hc_tabulbox">
    <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
  </ul>
  <div class="hc-tab-panel">
    <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第一页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
          第二页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
          第三页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第四页
      </div>
    </div>
  </div>
</div>
```
###### tab在左边
<div class="code-pre">
  <div class="hc-tab hc-tab-horizontal" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
    <ul class="hc-tab-bar" ctf="hc_tabulbox">
      <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
      <li class="hc-tab-bar-item" ctf="hc_tabitem">
        <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
        <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
        <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
      </li>
    </ul>
    <div class="hc-tab-panel">
      <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第一页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
            第二页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
            第三页
        </div>
        <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
            第四页
        </div>
      </div>
    </div>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-tab hc-tab-horizontal" ct="hc_tab"  data-options='{"isslide":"1","reload":"1"}'>
  <ul class="hc-tab-bar" ctf="hc_tabulbox">
    <li class="hc-tab-bar-item hc-tab-bar-active" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">全部</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">已读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
    <li class="hc-tab-bar-item" ctf="hc_tabitem">
      <span class="hc-tab-bar-icon" ctf="hc_tabicon"></span>
      <span class="hc-tab-bar-label" ctf="hc_tablabel">未读1</span>
      <span class="hc-tab-bar-badge" ctf="hc_tabbadge"></span>
    </li>
  </ul>
  <div class="hc-tab-panel">
    <div class="hc-tab-wrap" ctf="hc_tabcontentbox">
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第一页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_456">
          第二页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_789">
          第三页
      </div>
      <div class="hc-tab-item" ctf="hc_contentitem" st="DIV_123">
          第四页
      </div>
    </div>
  </div>
</div>
```