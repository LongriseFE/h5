#### form表单
表单分成两种：一种是有下划线，一种没有下划线分隔！
###### 基础用法
默认基础用法带有下划线分隔！
<div class="code-pre">
  <div class="hc-form">
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:5em;">紧急程度</dt>
      <dd class="hc-form-value">
        <div class="hc-form-group" ct="hc_radio" md="buistype" bt="radio">
          <div class="hc-form-radio hc-primary hc-form-radio-active" ctf="hc_radioitem">
            <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="1" checked="true">
            <span class="hc-form-frame" ctf="hc_radiocore">
              <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
            </span>
            <label class="hc-form-label" ctf="hc_radiolabel">一般</label>
          </div>
          <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
            <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="2">
            <span class="hc-form-frame" ctf="hc_radiocore">
              <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
            </span>
            <label class="hc-form-label" ctf="hc_radiolabel">紧急</label>
          </div>
          <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
            <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="3">
            <span class="hc-form-frame" ctf="hc_radiocore">
              <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
            </span>
            <label class="hc-form-label" ctf="hc_radiolabel">加急</label>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:5em;">文件标题</dt>
      <dd class="hc-form-value">
        <div class="hc-form-input-light">
          <input type="text" class="hc-form-core" ctef="hc_input" placeholder="请填写文件标题！" md="listtitle" bt="text" ht="input">
        </div>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:5em;">是否收文</dt>
      <dd class="hc-form-value">
        <div class="hc-form-switch hc-primary hc-form-switch-active" values='["1","2"]' ct="hc_switch" md="fileflag" bt="switch">
          <input class="hc-form-core" type="checkbox" name="r11" ctf="hc_switchinput" checked="true">
          <label class="hc-form-label" ctf="hc_switchlabel"></label>
          <span class="hc-form-frame" ctf="hc_switchframe"></span>
        </div>
      </dd>
    </dl>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form">
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:5em;">紧急程度</dt>
    <dd class="hc-form-value">
      <div class="hc-form-group" ct="hc_radio" md="buistype" bt="radio">
        <div class="hc-form-radio hc-primary hc-form-radio-active" ctf="hc_radioitem">
          <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="1" checked="true">
          <span class="hc-form-frame" ctf="hc_radiocore">
            <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
          </span>
          <label class="hc-form-label" ctf="hc_radiolabel">一般</label>
        </div>
        <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
          <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="2">
          <span class="hc-form-frame" ctf="hc_radiocore">
            <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
          </span>
          <label class="hc-form-label" ctf="hc_radiolabel">紧急</label>
        </div>
        <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
          <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="3">
          <span class="hc-form-frame" ctf="hc_radiocore">
            <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
          </span>
          <label class="hc-form-label" ctf="hc_radiolabel">加急</label>
        </div>
      </div>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:5em;">文件标题</dt>
    <dd class="hc-form-value">
      <div class="hc-form-input-light">
        <input type="text" class="hc-form-core" ctef="hc_input" placeholder="请填写文件标题！" md="listtitle" bt="text" ht="input">
      </div>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:5em;">是否收文</dt>
    <dd class="hc-form-value">
      <div class="hc-form-switch hc-primary hc-form-switch-active" values='["1","2"]' ct="hc_switch" md="fileflag" bt="switch">
        <input class="hc-form-core" type="checkbox" name="r11" ctf="hc_switchinput" checked="true">
        <label class="hc-form-label" ctf="hc_switchlabel"></label>
        <span class="hc-form-frame" ctf="hc_switchframe"></span>
      </div>
    </dd>
  </dl>
</div>
```
###### 无边框
只需要将`hc-form`改成`hc-form-light`
<div class="code-pre">
  <div class="hc-form-light">
    <dl class="hc-form-item">
      <dd class="hc-form-value">
        <label class="hc-h4">
          <span class="hc-title-label" bt="text" md="title" ht="title">深圳市党政机关会议通知</span>
        </label>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">紧急程度：</dt>
      <dd class="hc-form-value">
        <p class="hc-form-value-label" bt="text" md="sptype" ht="label" code="laambusihandletype">紧急</p>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">会议名称：</dt>
      <dd class="hc-form-value">
        <p class="hc-form-value-label" bt="text" md="content" ht="label">第一届海峡两岸学生棒球联赛总决赛属地 支持工作总结大会会议通知</p>
      </dd>
    </dl>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-light">
  <dl class="hc-form-item">
    <dd class="hc-form-value">
      <label class="hc-h4">
        <span class="hc-title-label" bt="text" md="title" ht="title">深圳市党政机关会议通知</span>
      </label>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">紧急程度：</dt>
    <dd class="hc-form-value">
      <p class="hc-form-value-label" bt="text" md="sptype" ht="label" code="laambusihandletype">紧急</p>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">会议名称：</dt>
    <dd class="hc-form-value">
      <p class="hc-form-value-label" bt="text" md="content" ht="label">第一届海峡两岸学生棒球联赛总决赛属地 支持工作总结大会会议通知</p>
    </dd>
  </dl>
</div>
```
###### 组合布局
<div class="code-pre">
  <div class="hc-form-light">
    <dl class="hc-form-item">
      <dd class="hc-form-value">
        <label class="hc-h4">
          <span class="hc-title-label" bt="text" md="title" ht="title">深圳市党政机关会议通知</span>
        </label>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">紧急程度</dt>
      <dd class="hc-form-value">
        <p class="hc-form-value-label" bt="text" md="sptype" ht="label" code="laambusihandletype">紧急</p>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">会议名称</dt>
      <dd class="hc-form-value">
        <p class="hc-form-value-label" bt="text" md="content" ht="label">第一届海峡两岸学生棒球联赛总决赛属地 支持工作总结大会会议通知</p>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">紧急程度</dt>
      <dd class="hc-form-value">
        <div class="hc-form-group" ct="hc_radio" md="buistype" bt="radio">
          <div class="hc-form-radio hc-primary hc-form-radio-active" ctf="hc_radioitem">
            <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="1" checked="true">
            <span class="hc-form-frame" ctf="hc_radiocore">
              <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
            </span>
            <label class="hc-form-label" ctf="hc_radiolabel">一般</label>
          </div>
          <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
            <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="2">
            <span class="hc-form-frame" ctf="hc_radiocore">
              <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
            </span>
            <label class="hc-form-label" ctf="hc_radiolabel">紧急</label>
          </div>
          <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
            <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="3">
            <span class="hc-form-frame" ctf="hc_radiocore">
              <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
            </span>
            <label class="hc-form-label" ctf="hc_radiolabel">加急</label>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">文件标题</dt>
      <dd class="hc-form-value">
        <div class="hc-form-input-light">
          <input type="text" class="hc-form-core" ctef="hc_input" placeholder="请填写文件标题！" md="listtitle" bt="text" ht="input">
        </div>
      </dd>
    </dl>
    <dl class="hc-form-item">
      <dt class="hc-form-label" style="width:6em;">是否收文</dt>
      <dd class="hc-form-value">
        <div class="hc-form-switch hc-primary hc-form-switch-active" values='["1","2"]' ct="hc_switch" md="fileflag" bt="switch">
          <input class="hc-form-core" type="checkbox" name="r11" ctf="hc_switchinput" checked="true">
          <label class="hc-form-label" ctf="hc_switchlabel"></label>
          <span class="hc-form-frame" ctf="hc_switchframe"></span>
        </div>
      </dd>
    </dl>
  </div>
</div>
<p class="source">显示代码</p>

``` html
<div class="hc-form-light">
  <dl class="hc-form-item">
    <dd class="hc-form-value">
      <label class="hc-h4">
        <span class="hc-title-label" bt="text" md="title" ht="title">深圳市党政机关会议通知</span>
      </label>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">紧急程度：</dt>
    <dd class="hc-form-value">
      <p class="hc-form-value-label" bt="text" md="sptype" ht="label" code="laambusihandletype">紧急</p>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">会议名称：</dt>
    <dd class="hc-form-value">
      <p class="hc-form-value-label" bt="text" md="content" ht="label">第一届海峡两岸学生棒球联赛总决赛属地 支持工作总结大会会议通知</p>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">紧急程度</dt>
    <dd class="hc-form-value">
      <div class="hc-form-group" ct="hc_radio" md="buistype" bt="radio">
        <div class="hc-form-radio hc-primary hc-form-radio-active" ctf="hc_radioitem">
          <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="1" checked="true">
          <span class="hc-form-frame" ctf="hc_radiocore">
            <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
          </span>
          <label class="hc-form-label" ctf="hc_radiolabel">一般</label>
        </div>
        <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
          <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="2">
          <span class="hc-form-frame" ctf="hc_radiocore">
            <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
          </span>
          <label class="hc-form-label" ctf="hc_radiolabel">紧急</label>
        </div>
        <div class="hc-form-radio hc-primary" ctf="hc_radioitem">
          <input class="hc-form-core" type="radio" name="r11" ctf="hc_radioinput" value="3">
          <span class="hc-form-frame" ctf="hc_radiocore">
            <i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>
          </span>
          <label class="hc-form-label" ctf="hc_radiolabel">加急</label>
        </div>
      </div>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">文件标题</dt>
    <dd class="hc-form-value">
      <div class="hc-form-input-light">
        <input type="text" class="hc-form-core" ctef="hc_input" placeholder="请填写文件标题！" md="listtitle" bt="text" ht="input">
      </div>
    </dd>
  </dl>
  <dl class="hc-form-item">
    <dt class="hc-form-label" style="width:6em;">是否收文</dt>
    <dd class="hc-form-value">
      <div class="hc-form-switch hc-primary hc-form-switch-active" values='["1","2"]' ct="hc_switch" md="fileflag" bt="switch">
        <input class="hc-form-core" type="checkbox" name="r11" ctf="hc_switchinput" checked="true">
        <label class="hc-form-label" ctf="hc_switchlabel"></label>
        <span class="hc-form-frame" ctf="hc_switchframe"></span>
      </div>
    </dd>
  </dl>
</div>
```