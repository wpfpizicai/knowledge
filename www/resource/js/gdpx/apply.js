define(function(require,exports,module) {
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
    function scroll (x){
      window.scroll && window.scroll(x,0);
    }
    alifenxi.track('提交页面浏览');
    if($.cookie('has_see_bmxz')){
      $('div.online-bm').show()
    }else{
      $('div.bmxz').show();
      $('#has_see_bmxz').on('click',function(e){
        scroll(0);
        $('div.bmxz').hide();
        $('div.online-bm').show();
        $.cookie('has_see_bmxz',1,{expires: new Date().getTime() + 365* 24 * 60 * 60 * 1000});
      })
    }
    $('input.form-control').on('focus',function(e){
      var that = this;
      $(that).parent().removeClass('has-error')
    });
    $('#s_career').on('click',function(e){
      var name = $(this).val();
      $('.people-wrap.row').addClass('hide');
      if(name == "教师"){
        $('.teacher-people.row').removeClass('hide');
      }else if(name == "金融机构从业人员"){
        $('.finace-people.row').removeClass('hide');
      }else if(name == "学生"){
        $('.student-people.row').removeClass('hide');
      }else if(name == "公务员"){
        $('.gov-people.row').removeClass('hide');
      }else if(name == "其他"){
        $('.else-people.row').removeClass('hide');
      }
    });
    var is_agree = false;
    $('input[name="optionsRadios"]').on('click',function(e){
      var c_value = $('input[name="optionsRadios"]:checked').val();
      if(c_value == 'agree'){
        is_agree = true;
        $('#submit_btn').attr('title','');
        $('#textarea_fwtk').parent().removeClass('has-error');
      }else{
        is_agree = false;
        $('#submit_btn').attr('title',"请先阅读服务条款！");
      }
    })
    $('#submit_btn').on('click',function(e) {
      if(!is_agree){
        $('#textarea_fwtk').parent().addClass('has-error');
        return;
      }
      alifenxi.track('提交点击');
      var values = {};
      $.each($('#activity_form').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });
      if(!values['username']){
        $('input[name="username"]').parent().addClass('has-error');
        var offset = $('input[name="username"]').parent().offset();
        scroll(offset.top, offset.left);
      }else if(!values['sex']){
        $('input[name="sex"]').parent().parent().addClass('has-error');
        var offset = $('input[name="sex"]').parent().parent().offset();
        scroll(offset.top);
      }else if(!values['idcardnum']){
        $('input[name="idcardnum"]').parent().addClass('has-error')
        var offset = $('input[name="idcardnum"]').parent().offset();
        scroll(offset.top);
      }else if(!values['email'] || !testType('email',values['email'])){
        $('input[name="email"]').parent().addClass('has-error');
        var offset = $('input[name="email"]').parent().offset();
        scroll(offset.top);
      }else if(!values['mobile'] || !testType('num',values['mobile'])){
        $('input[name="mobile"]').parent().addClass('has-error');
        var offset = $('input[name="mobile"]').parent().offset();
        scroll(offset.top);
      }else if(!values['career']){
        $('select[name="career"]').parent().addClass('has-error');
        var offset = $('input[name="career"]').parent().offset();
        scroll(offset.top);
      }else{
        $.post("/gdpx/apply",values,function(result){
          if(result.err == 0){
            alert('注册成功!')
          }
        },'json')
      }
    })
})