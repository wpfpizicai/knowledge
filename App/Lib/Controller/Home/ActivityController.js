module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var self = this;

      self.display();
    },

    applyAction: function(){
      var self = this;
      if(self.isPost()){
        var data = self.post();
        if(!data.atime){
          data.atime = getDateTime()
        }
        return D('ActivityUser').add(data);
      }else{
        self.assign({
          section : 'activity',
          userInfo : self.userInfo,
          navLinks : navLinks,
          title : "活动报名"
        })
        self.display();
      }
    },

    seeAction: function(){
      var self = this;
      var users = D('ActivityUser').select().then(function(users){
        users = users.map(function(item){
          item.stime = getDateTime(item.atime);
          return item;
        })
        self.assign({
          section : 'activity',
            userInfo : self.userInfo,
            navLinks : navLinks,
            title : "活动查看",
            users : users
        });
        return self.display()
      });
    }
  };
})