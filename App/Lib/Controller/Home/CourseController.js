/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      this.assign({
        section : 'course',
        navLinks : navLinks,
        title : "课程"
      });
      this.display();
    },

    viewAction: function(){
      var id = this.get('id') | 0;
      this.assign({
        title: "课程" + id,
        navLinks : navLinks,
        section : 'course'
      });
      this.display();
    }
  };
})