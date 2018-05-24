#### list列表
`list`在手机模式下看，效果更佳！
<div class="code-pre">
  <ul class="hc-list" ct="hc_list" ut="list" pageSize="7" autosize="0" rowheight="">
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover">
          <button class="hc-button-circle hc-button-small" ctfe="hc_listclick">
            <span class="hc-button-label" ctfe="hc_listclick" bt="text" md="buistype" codev='[{id:"1",cn:"hc-button-primary",text:"一般"},{id:"2",cn:"hc-button-warning",text:"紧急"},{id:"3",cn:"hc-button-danger",text:"加急"}]'>一般</span>
          </button>
        </div>
        <div class="hc-list-content">
          <h2 class="hc-list-name">
            <span class="hc-list-name-label" md="listtitle" bt="text" ctfe="hc_listclick">防沉迷机制真的能帮我们摆脱手机依赖吗？</span>
            <span class="hc-list-name-handle hc-color-primary" ctf="hc_listoperation">
              <i class="hc-iconfont hc-icon-viewgallery" ctf="hc_listoperation"></i>
            </span>
          </h2>
          <ul class="hc-list-tail">
            <li class="hc-list-tail-col" ctfe="hc_listclick">
              <i class="hc-tag-line hc-tag-danger" ctfe="hc_listclick" bt="text" md="datastate" codev='[{id:"1",cn:"hc-tag-danger",text:"未阅"},{id:"2",cn:"hc-tag-danger",text:"已阅"}]'>已阅</i>
            </li>
            <li class="hc-list-tail-col" ctfe="hc_listclick">
              <span class="hc-list-tail-item" ctfe="hc_listclick" bt="text" md="category"></span>
              <span class="hc-list-tail-item" ctfe="hc_listclick" bt="text" md="listtime"></span>
            </li>
          </ul>
        </div>
        <div class="hc-list-handle" ctf="hc_listhandle">
          <div class="hc-button-circle hc-button-primary hc-button-medium" ctf="hc_listoperationbutton" ctfe="hc_listclick" utf="view">
            <span class="hc-button-icon" ctfe="hc_listclick"></span>
            <span class="hc-button-label" ctfe="hc_listclick">查看</span>
          </div>
          <div class="hc-button-circle hc-button-warning hc-button-medium" ctf="hc_listoperationbutton" ctfe="hc_listclick" utf="update">
            <span class="hc-button-icon" ctfe="hc_listclick"></span>
            <span class="hc-button-label" ctfe="hc_listclick">编辑</span>
          </div>
          <div class="hc-button-circle hc-button-danger hc-button-medium" ctf="hc_listoperationbutton" ctfe="hc_listclick" utf="delete">
            <span class="hc-button-icon" ctfe="hc_listclick"></span>
            <span class="hc-button-label" ctfe="hc_listclick">删除</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-list" ct="hc_list" ut="list" pageSize="7" autosize="0" rowheight="">
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover">
        <button class="hc-button-circle hc-button-small" ctfe="hc_listclick">
          <span class="hc-button-label" ctfe="hc_listclick" bt="text" md="buistype" codev='[{id:"1",cn:"hc-button-primary",text:"一般"},{id:"2",cn:"hc-button-warning",text:"紧急"},{id:"3",cn:"hc-button-danger",text:"加急"}]'>一般</span>
        </button>
      </div>
      <div class="hc-list-content">
        <h2 class="hc-list-name">
          <span class="hc-list-name-label" md="listtitle" bt="text" ctfe="hc_listclick">防沉迷机制真的能帮我们摆脱手机依赖吗？</span>
          <span class="hc-list-name-handle hc-color-primary" ctf="hc_listoperation">
            <i class="hc-iconfont hc-icon-viewgallery" ctf="hc_listoperation"></i>
          </span>
        </h2>
        <ul class="hc-list-tail">
          <li class="hc-list-tail-col" ctfe="hc_listclick">
            <i class="hc-tag-line hc-tag-danger" ctfe="hc_listclick" bt="text" md="datastate" codev='[{id:"1",cn:"hc-tag-danger",text:"未阅"},{id:"2",cn:"hc-tag-danger",text:"已阅"}]'>已阅</i>
          </li>
          <li class="hc-list-tail-col" ctfe="hc_listclick">
            <span class="hc-list-tail-item" ctfe="hc_listclick" bt="text" md="category"></span>
            <span class="hc-list-tail-item" ctfe="hc_listclick" bt="text" md="listtime"></span>
          </li>
        </ul>
      </div>
      <div class="hc-list-handle" ctf="hc_listhandle">
        <div class="hc-button-circle hc-button-primary hc-button-medium" ctf="hc_listoperationbutton" ctfe="hc_listclick" utf="view">
          <span class="hc-button-icon" ctfe="hc_listclick"></span>
          <span class="hc-button-label" ctfe="hc_listclick">查看</span>
        </div>
        <div class="hc-button-circle hc-button-warning hc-button-medium" ctf="hc_listoperationbutton" ctfe="hc_listclick" utf="update">
          <span class="hc-button-icon" ctfe="hc_listclick"></span>
          <span class="hc-button-label" ctfe="hc_listclick">编辑</span>
        </div>
        <div class="hc-button-circle hc-button-danger hc-button-medium" ctf="hc_listoperationbutton" ctfe="hc_listclick" utf="delete">
          <span class="hc-button-icon" ctfe="hc_listclick"></span>
          <span class="hc-button-label" ctfe="hc_listclick">删除</span>
        </div>
      </div>
    </div>
  </li>
</ul>
```
###### 序号列表
<div class="code-pre">
  <ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover">
          <span class="hc-badge" ctf="hc_listnum">1</span>
        </div>
        <div class="hc-list-content" ctfe="hc_listclick">
          <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">科技自媒体平台“差评”获3000万元A轮融资，腾讯领投</span>
          </h2>
        </div>
        <div class="hc-list-append">
          <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime"></span>
        </div>
      </div>
    </li>
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover">
          <span class="hc-badge" ctf="hc_listnum">2</span>
        </div>
        <div class="hc-list-content" ctfe="hc_listclick">
          <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">科技自媒体平台“差评”获3000万元A轮融资，腾讯领投</span>
          </h2>
        </div>
        <div class="hc-list-append">
          <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime"></span>
        </div>
      </div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover">
        <span class="hc-badge" ctf="hc_listnum">1</span>
      </div>
      <div class="hc-list-content" ctfe="hc_listclick">
        <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">科技自媒体平台“差评”获3000万元A轮融资，腾讯领投</span>
        </h2>
      </div>
      <div class="hc-list-append">
        <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime"></span>
      </div>
    </div>
  </li>
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover">
        <span class="hc-badge" ctf="hc_listnum">2</span>
      </div>
      <div class="hc-list-content" ctfe="hc_listclick">
        <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">科技自媒体平台“差评”获3000万元A轮融资，腾讯领投</span>
        </h2>
      </div>
      <div class="hc-list-append">
        <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime"></span>
      </div>
    </div>
  </li>
</ul>
```
###### 详细内容列表
<div class="code-pre">
  <ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover"></div>
        <div class="hc-list-content">
          <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
          </h2>
          <ul class="hc-list-time hc-row">
            <li class="hc-col"><span class="hc-iconfont hc-icon-time"></span><span bt="text" md="listtime">15:30</span></li>
            <li class="hc-col"><span class="hc-iconfont hc-icon-task-management"></span><span bt="text" md="listfenz">35分钟</span></li>
          </ul>
          <ul class="hc-list-text hc-row">
            <li class="hc-col hc-col-24">会议地址：<span  bt="text" md="hydz">东边会议室</span></li>
            <li class="hc-col hc-col-24">参与人员：
              <span bt="text" md="cyry">张敬平</span>
              <span bt="text" md="cyry">易振华</span>
              <span bt="text" md="cyry">袁小欢</span>
              <span bt="text" md="cyry">王劲宇</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover"></div>
        <div class="hc-list-content">
          <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
          </h2>
          <ul class="hc-list-time hc-row">
            <li class="hc-col"><span class="hc-iconfont hc-icon-time"></span><span bt="text" md="listtime">15:30</span></li>
            <li class="hc-col"><span class="hc-iconfont hc-icon-task-management"></span><span bt="text" md="listfenz">35分钟</span></li>
          </ul>
          <ul class="hc-list-text hc-row">
            <li class="hc-col hc-col-24">会议地址：<span  bt="text" md="hydz">东边会议室</span></li>
            <li class="hc-col hc-col-24">参与人员：
              <span bt="text" md="cyry">张敬平</span>
              <span bt="text" md="cyry">易振华</span>
              <span bt="text" md="cyry">袁小欢</span>
              <span bt="text" md="cyry">王劲宇</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover"></div>
      <div class="hc-list-content">
        <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
        </h2>
        <ul class="hc-list-time hc-row">
          <li class="hc-col"><span class="hc-iconfont hc-icon-time"></span><span bt="text" md="listtime">15:30</span></li>
          <li class="hc-col"><span class="hc-iconfont hc-icon-task-management"></span><span bt="text" md="listfenz">35分钟</span></li>
        </ul>
        <ul class="hc-list-text hc-row">
          <li class="hc-col hc-col-24">会议地址：<span  bt="text" md="hydz">东边会议室</span></li>
          <li class="hc-col hc-col-24">参与人员：
            <span bt="text" md="cyry">张敬平</span>
            <span bt="text" md="cyry">易振华</span>
            <span bt="text" md="cyry">袁小欢</span>
            <span bt="text" md="cyry">王劲宇</span>
          </li>
        </ul>
      </div>
    </div>
  </li>
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover"></div>
      <div class="hc-list-content">
        <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
        </h2>
        <ul class="hc-list-time hc-row">
          <li class="hc-col"><span class="hc-iconfont hc-icon-time"></span><span bt="text" md="listtime">15:30</span></li>
          <li class="hc-col"><span class="hc-iconfont hc-icon-task-management"></span><span bt="text" md="listfenz">35分钟</span></li>
        </ul>
        <ul class="hc-list-text hc-row">
          <li class="hc-col hc-col-24">会议地址：<span  bt="text" md="hydz">东边会议室</span></li>
          <li class="hc-col hc-col-24">参与人员：
            <span bt="text" md="cyry">张敬平</span>
            <span bt="text" md="cyry">易振华</span>
            <span bt="text" md="cyry">袁小欢</span>
            <span bt="text" md="cyry">王劲宇</span>
          </li>
        </ul>
      </div>
    </div>
  </li>
</ul>
```

###### 前面图片列表
<div class="code-pre">
  <ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover">
          <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=3a64b951a0d74b7952d280ce49a5fcc0&src=http://www.momo35.com/uploadfiles/files/2017/05/12/images/20170512142520187.jpg" ctfe="hc_listclick" bt="img" md="imgpath"/>
        </div>
        <div class="hc-list-content">
          <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
          </h2>
          <ul class="hc-list-tail">
            <li>
              <span class="hc-tag-line hc-tag-success" bt="text" md="buistype" codev='[{id:"1",cn:"hc-tag-danger",text:"未阅"},{id:"2",cn:"hc-tag-danger",text:"已阅"}]'>已阅</span>
            </li>
            <li>
              <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime">2018-06-05 15：30</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-cover">
          <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=3a64b951a0d74b7952d280ce49a5fcc0&src=http://www.momo35.com/uploadfiles/files/2017/05/12/images/20170512142520187.jpg" ctfe="hc_listclick" bt="img" md="imgpath"/>
        </div>
        <div class="hc-list-content">
          <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
          </h2>
          <ul class="hc-list-tail">
            <li>
              <span class="hc-tag-line hc-tag-success" bt="text" md="buistype" codev='[{id:"1",cn:"hc-tag-danger",text:"未阅"},{id:"2",cn:"hc-tag-danger",text:"已阅"}]'>已阅</span>
            </li>
            <li>
              <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime">2018-06-05 15：30</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover">
        <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=3a64b951a0d74b7952d280ce49a5fcc0&src=http://www.momo35.com/uploadfiles/files/2017/05/12/images/20170512142520187.jpg" ctfe="hc_listclick" bt="img" md="imgpath"/>
      </div>
      <div class="hc-list-content">
        <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
        </h2>
        <ul class="hc-list-tail">
          <li>
            <span class="hc-tag-line hc-tag-success" bt="text" md="buistype" codev='[{id:"1",cn:"hc-tag-danger",text:"未阅"},{id:"2",cn:"hc-tag-danger",text:"已阅"}]'>已阅</span>
          </li>
          <li>
            <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime">2018-06-05 15：30</span>
          </li>
        </ul>
      </div>
    </div>
  </li>
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-cover">
        <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=3a64b951a0d74b7952d280ce49a5fcc0&src=http://www.momo35.com/uploadfiles/files/2017/05/12/images/20170512142520187.jpg" ctfe="hc_listclick" bt="img" md="imgpath"/>
      </div>
      <div class="hc-list-content">
        <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
        </h2>
        <ul class="hc-list-tail">
          <li>
            <span class="hc-tag-line hc-tag-success" bt="text" md="buistype" codev='[{id:"1",cn:"hc-tag-danger",text:"未阅"},{id:"2",cn:"hc-tag-danger",text:"已阅"}]'>已阅</span>
          </li>
          <li>
            <span class="hc-list-date" ctfe="hc_listclick" bt="text" md="listtime">2018-06-05 15：30</span>
          </li>
        </ul>
      </div>
    </div>
  </li>
</ul>
```
###### 上面图标
<div class="code-pre">
  <ul class="hc-list-multi" ct="hc_list" ut="list4" pageSize="7" autosize="0" rowheight="">
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-content">
          <div class="hc-list-cover">
            <img ctfe="hc_listclick" bt="img" md="imgpath" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=a70b33fc94bf27b37c31dda9c2b41acc&src=http://www.xinjiadiy.com/images/article_img/tuwen/20170509/6576.jpg">
          </div>
          <h2 class="hc-list-name"  ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
          </h2>
        </div>
      </div>
    </li>
    <li class="hc-list-item" ctf="hc_listitem">
      <div class="hc-list-container">
        <div class="hc-list-content">
          <div class="hc-list-cover">
            <img ctfe="hc_listclick" bt="img" md="imgpath" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=a70b33fc94bf27b37c31dda9c2b41acc&src=http://www.xinjiadiy.com/images/article_img/tuwen/20170509/6576.jpg">
          </div>
          <h2 class="hc-list-name"  ctfe="hc_listclick" bt="text" md="listtitle">
            <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
          </h2>
        </div>
      </div>
    </li>
  </ul>
</div>
<p class="source">显示代码</p>

``` html
<ul class="hc-list-multi" ct="hc_list" ut="list4" pageSize="7" autosize="0" rowheight="">
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-content">
        <div class="hc-list-cover">
          <img ctfe="hc_listclick" bt="img" md="imgpath" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=a70b33fc94bf27b37c31dda9c2b41acc&src=http://www.xinjiadiy.com/images/article_img/tuwen/20170509/6576.jpg">
        </div>
        <h2 class="hc-list-name"  ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
        </h2>
      </div>
    </div>
  </li>
  <li class="hc-list-item" ctf="hc_listitem">
    <div class="hc-list-container">
      <div class="hc-list-content">
        <div class="hc-list-cover">
          <img ctfe="hc_listclick" bt="img" md="imgpath" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=a70b33fc94bf27b37c31dda9c2b41acc&src=http://www.xinjiadiy.com/images/article_img/tuwen/20170509/6576.jpg">
        </div>
        <h2 class="hc-list-name"  ctfe="hc_listclick" bt="text" md="listtitle">
          <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
        </h2>
      </div>
    </div>
  </li>
</ul>
```
###### 大图片列表
<div class="code-pre">
  <ul class="hc-list" ct="hc_list" pageSize="7" autosize="0" rowheight="">
    <li class="hc-list-item" ctf="hc_listitem">
        <div class="hc-list-container">
          <div class="hc-list-content">
            <div class="hc-list-cover">
              <img ctfe="hc_listclick" bt="img" md="imgpath" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527130628&di=a70b33fc94bf27b37c31dda9c2b41acc&src=http://www.xinjiadiy.com/images/article_img/tuwen/20170509/6576.jpg">
            </div>
            <h2 class="hc-list-name" ctfe="hc_listclick" bt="text" md="listtitle">
              <span class="hc-list-name-label">会议活动 - 中国股权投资权威门户:股权投资相关会议活动</span>
            </h2>
          </div>
        </div>
      </li>
  </ul>
</div>
<p class="source">显示代码</p>