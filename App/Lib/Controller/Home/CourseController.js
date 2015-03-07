/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      this.display({
        section : 'course',
        navLinks : navLinks,
        title : "课程"
      });
    }
  };
})