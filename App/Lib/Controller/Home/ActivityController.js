module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var self = this;
      self.assign({
        section : 'activity',
        userInfo : self.userInfo,
        navLinks : navLinks,
        title : "2015中国金融高端培训 中国金融培训中心"
      })
      self.display();
    },

    applyAction: function(){
      var self = this;
      if(self.isPost()){
        var data = self.post();
        if(!data.atime){
          data.atime = getDateTime()
        }
        return D('ActivityUser').add(data).then(function(data){
          self.end({
            err :0,
            id :data.id
          });
          //self.redirect('/activity/apply');
        });

      }else{
        self.assign({
          section : 'activity',
          userInfo : self.userInfo,
          navLinks : navLinks,
          title : "中国金融高端培训（2015） 在线报名"
        })
        self.display();
      }
    },

    seeAction: function(){
      var self = this;
      var users = D('ActivityUser').page(this.get('page')).countSelect().then(function(data){
        data.data = data.data.map(function(item){
          item.stime = getDateTime(item.atime);
          return item;
        })
        self.assign({
          section : 'activity',
            userInfo : self.userInfo,
            navLinks : navLinks,
            title : "活动查看",
            users : data.data,
            pagerData : data
        });
        return self.display()
      });
    }
  };
})