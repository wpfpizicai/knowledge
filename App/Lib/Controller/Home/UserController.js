/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    signinAction: function(){
      var self = this;
      //页面post
      if (self.isPost()) {
          //用户登录成功写入Session
          var email = self.post('email'); //获取post过来的用户名
          var pwd = self.post('password'); //获取post过来的密码
          if(pwd == "admin"){
            return self.session('userInfo', {
              name : 'admin',
              pwd : pwd,
              email : email
            })
          }else{
            return self.error(403, '用户名或者密码不正确');
          }

      } else {
        //页面加载
        return return self.redirect('/');
      }
    },

    logoutAction: function() {
      var self = this;
      self.session('userInfo', '');
      self.redirect('/');
    },

    signupAction: function(){

    },

    checkemailAction: function(){

    }
  };
})