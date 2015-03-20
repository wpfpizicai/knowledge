/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var self = this;
      this.assign({
        section : 'course',
        userInfo : self.userInfo,
        navLinks : navLinks,
        title : "课程"
      });
      this.display();
    },

    viewAction: function(){
      var id = this.get('id') | 0,
        self = this;
      this.assign({
        title: "课程" + id,
        navLinks : navLinks,
        userInfo : self.userInfo,
        section : 'course'
      });
      this.display();
    }
  };
})