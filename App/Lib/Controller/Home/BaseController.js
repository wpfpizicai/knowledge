/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]}
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){
      var self = this;
      self.super("init", http);
      if (self.http.action === 'login') {
        return;
      }

      return self.session('userInfo').then(function(userInfo) {
        //用户信息为空
        if (isEmpty(userInfo)) {
          //ajax访问返回一个json的错误信息
          if (self.isAjax()) {
              return self.error(403);
          } else {
              //跳转到登录页
              return self.redirect('/');
          }
        } else {
          //用户已经登录
          self.userInfo = userInfo;
        }
      });
    }
  }
})