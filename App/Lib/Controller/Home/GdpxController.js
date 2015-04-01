module.exports = Controller("Home/BaseController", function(){
  "use strict";
  function checkstate(){

  };
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
      return self.session('userinfo').then(function(value) {
        if (isEmpty(value)) {
          if (self.isAjax()) {
            return self.error(403);
          }else{
            return self.redirect("/login");
          }
        }else{
          var users = D('ActivityUser').page(self.get('page')).countSelect().then(function(data){
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
      });
    },

    itemAction: function(){
      var self = this;
      return self.session('userinfo').then(function(value) {
        if (isEmpty(value)) {
          if (self.isAjax()) {
            return self.error(403);
          }else{
            return self.redirect("/login");
          }
        }else{
          var id = self.get('id');
          if(!id){
            return self.redirect("/gdpx/see")
          }
          var users = D('ActivityUser').where({id : id}).find().then(function(data) {
            data.stime = getDateTime(data.atime);
            self.assign({
              section : 'activity',
                userInfo : self.userInfo,
                navLinks : navLinks,
                title : "用户-"+ data.username,
                user : data
            });
            return self.display()
          });
        }
      });
    },

    passAction: function () {
      var self = this;
      return self.session('userinfo').then(function(value) {
        if (isEmpty(value)) {
          if (self.isAjax()) {
            return self.error(403);
          }else{
            return self.redirect("/login");
          }
        }else{
          if(self.isPost()){
            var post_data = self.post();
            var users = D('ActivityUser').where({id : post_data.id}).update({
              status : post_data.status
            }).then(function(data) {
              self.success(data)
            },function(err){
              self.error()
            })
          }
        }
      });
    },

    searchAction: function(){
      var self = this;
      if(self.isPost()){
        var post_data = self.post();
        var users = D('ActivityUser').where(post_data).field('username,email,mobile,status').find().then(function(data) {
          return self.success(data)
        },function(err){
           return self.error()
        })
      }else{
        self.assign({
          section : 'activity',
          userInfo : self.userInfo,
          navLinks : navLinks,
          title : "用户查询"
        });
        return self.display()
      }
    },

    scheduleAction: function(){
      var self = this;
      self.assign({
        section : 'activity',
        userInfo : self.userInfo,
        navLinks : navLinks,
        title : "日程安排-中国金融高端培训（2015）"
      })
    }

  };
})