/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var courses = [{name:"创造力提升",id:"creativedad",detail:"",source:"UNAM",time:"永久开放",img:"1.jpg"},{name:"跨领域医疗信息学",id:"creativedad",detail:"",source:"Minnesota",time:"永久开放",img:"2.png"},{name:"微观经济学",id:"creativedad",detail:"",source:"Illinois",time:"Dec 22nd",img:"3.jpg"},{name:"遗传学与进化概论",id:"creativedad",detail:"",source:"Duke",time:"Jan 1st",img:"4.jpg"},{name:"探索性数据分析",id:"creativedad",detail:"",source:"约翰霍普金斯大学",time:"3月 2日",img:"5.jpg"},{name:"统计推断",id:"creativedad",detail:"",source:"斯坦福大学",time:"永久开放",img:"6.jpg"}];
  return {
    indexAction: function(){
      //render View/Home/index_index.html file
      //var users = D('user').select();
      this.assign({
        title : "首页",
        courses:courses,
        section : 'home'
      })
      this.display();
    }
  };
});