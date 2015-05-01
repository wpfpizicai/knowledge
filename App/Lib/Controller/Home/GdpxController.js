module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var nodeExcel = require('excel-export');
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
        if(data.optionsRadios != "agree"){
          self.error("对不起，请先阅读服务条款，并选择同意！")
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
          var users = D('ActivityUser').order('atime ASC').page(self.get('page')).countSelect().then(function(data){
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
      self.display();
    },

    excelAction: function(){
      var self = this;
      var conf = {};
      return self.session('userinfo').then(function(value) {
        if (isEmpty(value)) {
          if (self.isAjax()) {
            return self.error(403);
          }else{
            return self.redirect("/login");
          }
        }else{
                conf.cols = [
        {
          caption : '姓名',
          type : 'string',
          width: 10
        },{
          caption : '身份证号码',
          type : 'string',
          width: 20
        },{
          caption : '性别',
          type : 'string',
          width: 5
        },{
          caption : '邮箱',
          type : 'string',
          width: 20
        },{
          caption : '手机号码',
          type : 'string',
          width: 13
        },{
          caption : '职业',
          type : 'string',
          width: 20
        },{
          caption : '地址',
          type : 'string',
          width: 30
        },{
          caption : '邮编',
          type : 'string',
          width: 10
        },{
          caption : '学历',
          type : 'string',
          width: 6
        },{
          caption : '学术成果',
          type : 'string',
          width: 30
        },{
          caption : '是否参加过高端培训',
          type : 'string',
          width: 10,
          beforeCellWrite : function(row,cell){
            if(!cell){
              return "未知"
            }else if(cell=="agree"){
              return "参加过"
            }else{
              return "未参加"
            }
          }
        },{
          caption : '英语水平',
          type : 'string',
          width: 30
        },{
          caption : '单位',
          type : 'string',
          width: 20
        },{
          caption : '职务',
          type : 'string',
          width: 20
        },{
          caption : '研究方向',
          type : 'string',
          width: 30
        },{
          caption : '工作经历',
          type : 'string',
          width: 30
        },{
          caption : '学校',
          type : 'string',
          width: 15
        },{
          caption : '年级',
          type : 'string',
          width: 7
        },{
          caption : '所学专业',
          type : 'string',
          width: 20
        },{
          caption : '是否参加座谈会',
          type : 'string',
          width: 10,
          beforeCellWrite : function(row,cell){
            if(cell =='agree'){
              return "参加"
            }else{
              return "不参加"
            }
          }
        },{
          caption : '学习经历',
          type : 'string',
          width: 30
        }
      ];
      D('ActivityUser').order('atime ASC').select().then(function(data){
        var arr = [];
        if(data){
          var _len = data.length;
          for (var i = 0; i < _len; i++) {
            var _row = data[i];
            arr.push([_row.username,_row.idcardnum,_row.sex,_row.email,_row.mobile,_row.career,_row.address,_row.zipcode,_row.education,_row.result,_row.attend_before,_row.english,_row.unit,_row.career_name,_row.research,_row.work_experience,_row.school,_row.s_class,_row.department,_row.ismeeting,_row.study]);
          }
          conf.rows = arr;
          var result = nodeExcel.execute(conf);
          self.header({
            'Content-Type' : 'application/vnd.openxmlformats',
            'Content-Disposition' : 'attachment; filename=Report.xlsx'
          })
          self.end(result,'binary')
        }
      })
        }
      });
    }
  };
})