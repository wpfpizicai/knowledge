/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function() {
    "use strict";
    return {
        indexAction: function() {
            var userInfo = this.userInfo;
            var self = this;
            var isLogin = false;

            if (!isEmpty(userInfo)) {
                isLogin = true;
            }

            self.assign({
                title : "管理-首页",
                'isLogin': isLogin
            });
            self.display();
        }
    };
});
