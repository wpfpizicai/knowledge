/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      //render View/Home/index_index.html file
      var users = D('user').select();
      this.assign({
        title : "首页",
        users : users
      })
      this.display();
    }
  };
});