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
    }
  };
})