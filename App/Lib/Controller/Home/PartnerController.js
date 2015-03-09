/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      this.assign({
        title : "合作伙伴"，
        navLinks : navLinks
      })
      this.display();
    }
  };
})