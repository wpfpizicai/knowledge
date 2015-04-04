define(function(require,exports,module) {
  alifenxi.track('状态查询页面浏览');
  function testType(type, value) {
    //正则表达式
    var regular = {};
    //域名
    //regular['domain']=/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-zA-Z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-zA-Z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    regular['domain'] = new RegExp(strRegex);
    //二级域名
    regular['subDomain'] = /([0-9a-zA-Z][0-9a-z-]{0,61})?[0-9a-zA-Z]\./;
    //正整数
    regular['num'] = /^[1-9]\d*$/;
    //中文 英文 数字
    regular['text'] = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[\w])*$/;
    regular['puretxt'] = /^[\u4e00-\u9fa5 a-zA-Z0-9]+$/;
    //邮箱
    regular['email'] = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    regular['txt'] = /^[\u4e00-\u9fa5 ,\.;\:\"\'a-zA-Z0-9]+$/;
    regular['truDomain'] = new RegExp(/^((https|http|ftp|rtsp|mms)?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/);
    return regular[type].test(value);
  };
    $('#search_btn').on('click',function(e) {
      alifenxi.track('搜索按钮点击');
      var input_data = $('#search_input').val();
      var data = {};
      var status = ['正在审核中...','恭喜您通过，请注意查收邮箱！','对不起，由于人数限制，您未通过，感谢您的持续关注！'];
      if(testType('email',input_data)){
        data.email = input_data;
      }else if(testType('num',input_data)){
        data.mobile = input_data;
      }else{
        alert("请输入正确的手机号码或者邮箱地址！")
        $('#search_input').focus();
        return;
      }
      $.post('/gdpx/search',data,function(result){
        if(result.errno == 0){
          alert(status[result.data.status - 0])
        }else{
          alert(result.errmsg)
        }
      })

    })
})