define(function(require, exports, moudle) {
  require('css/login.css');
  var status = "";
  $('#signin_btn').on('click',function(e){
    status = 'signin';
    draw(status);
  });

  $('#signup_btn').on('click',function(e){
    status = "signup";
    draw(status);
  });

  function signupTpl(){
    /*
    <div id="signup" class="rl-modal ">
      <div class="rl-modal-header">
        <button type="button" class="rl-close" data-dismiss="modal" aria-hidden="true"></button>
        <h1>
        <span data-fromto="signup:signin">登录</span>
        <span class="active-title">注册</span>
        </h1>
      </div>
      <div class="rl-modal-body">
        <form id="signup-form">
        <div class="rlf-group">
          <input  type="text" name="email" data-validate="email" class="ipt ipt-email" autocomplete="off" placeholder="请输入登录邮箱"/>
          <p class="rlf-tip-wrap"><span style="display:none">邮箱将作为您主要的身份识别，请输入您有效的邮箱</span></p>
          <input style="display:none;">
        </div>
        <div class="rlf-group">
          <input  type="password" name="password" data-validate="password" class="ipt ipt-pwd" placeholder="请输入密码"/>
          <p class="rlf-tip-wrap"><span style="display:none">请输入6-16位密码，区分大小写，不能使用空格</span></p>
        </div>
        <div class="rlf-group">
          <input  type="password" name="cfmpwd" class="ipt ipt-pwd" placeholder="请再次输入密码"/>
          <p class="rlf-tip-wrap"><span style="display:none">请再次输入密码</span></p>
        </div>
        <div class="rlf-group">
          <input  type="text" name="nick" data-validate="nick" class="ipt ipt-nick" placeholder="请输入用户昵称"/>
          <p class="rlf-tip-wrap"><span style="display:none">请输入昵称，2-18位中英文、数字或下划线！</span></p>
        </div>
        <div class="rlf-group clearfix">
          <p class="rlf-tip-wrap rlf-g-tip" id="signup-globle-error"></p>
          <input  type="button" id="signup-btn" value="注册" hidefocus="true" class="btn-red btn-full r"/>
        </div>
        </form>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
    */
  };

  function signinTpl(){
    /*
    <div id="signin" class="rl-modal">
      <div class="rl-modal-header">
        <h1>
        <span class="active-title">登录</span>
        <span data-fromto="signin:signup">注册</span>
        </h1>
        <button type="button" class="rl-close" data-dismiss="modal" hidefocus="true" aria-hidden="true"></button>
      </div>
      <div class="rl-modal-body">
        <div class="clearfix">
        <div class="l-left-wrap l">
          <form id="signup-form" autocomplete="off">
            <div class="rlf-group">
              <input  type="text" name="email" data-validate="email" autocomplete="off" class="ipt ipt-email" placeholder="请输入登录邮箱"/>
              <p class="rlf-tip-wrap"></p>
              <input style="display:none;">
            </div>
            <div class="rlf-group">
              <input  type="password" name="password" autocomplete="off" class="ipt ipt-pwd" placeholder="请输入密码"/>
              <p class="rlf-tip-wrap"></p>
            </div>
            <div class="rlf-group rlf-appendix clearfix">
              <label for="auto-signin" class="l" hidefocus="true"><input type="checkbox" checked="checked" id="auto-signin">自动登录</label>
              <a href="/user/newforgot" class="rlf-forget r" target="_blank" hidefocus="true">忘记密码 </a>
            </div>
            <div class="rlf-group clearfix">
              <p class="rlf-tip-wrap " id="signin-globle-error"></p>
              <input  type="button" id="signin-btn" value="登录" hidefocus="true" class="btn-red btn-full"/>
            </div>
            </form>
        </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
    */
  };

  var tpl = {
    signup:signupTpl,
    signin:signinTpl
  };

  function getTpl(m){
    var r=/\/\*([\S\s]*?)\*\//m,
      m=r.exec(tpl[m].toString());
    return m&&m[1]||m;
  };

  function draw(m){
    $(document.body).append(getTpl(m))
  };

  function hide(){

  };

  function show(){

  };

})




