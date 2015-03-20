/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function() {
  "use strict";
  return {
    loginAction: function() {
      var self = this;
      if(self.isPost()){
        var name = self.post('email').trim(),
          pwd = self.post("pwd").trim();
        if (name == C('admin_username') && pwd == C('admin_password')) {
          self.session("login", name);
          self.success();
        }else{
          self.error(1, "用户名或者密码错误");
        }
      }else{
        this.display()
      }
    },
    logoutAction: function(){
      var self = this;
      self.session("login","");
      self.redirect("/login");
    },
    indexAction: function(){
      var self = this;
      self.redirect('/')
    }
  };
});
