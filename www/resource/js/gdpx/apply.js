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
    var s_time = new Date().getTime();
    function scroll (x){
      x = (x < 0 ? 0 : x)
      window.scroll && window.scroll(0,x);
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
        $.cookie('has_see_bmxz',1,{expires: 365});
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
    });
    var cansubmit = true;
    function checkScroll(name,label){
      if(!label){
        label = 'input'
      };
      var selector = label + '[name="' + name + '"]';
      cansubmit = false;
      $(selector).parent().addClass('has-error');
      var offset = $(selector).parent().offset();
      scroll(offset.top - 71);
      alifenxi.track('提交出错',{
        err_type : name
      });
    }
    $('#submit_btn').on('click',function(e) {
      cansubmit = true;
      $('.has-error','#activity_form').removeClass('has-error')
      if(!is_agree){
        $('#textarea_fwtk').parent().addClass('has-error');
        alifenxi.track('提交出错',{
          err_type : 'fwtk'
        })
        return;
      }

      alifenxi.track('提交点击');
      var values = {};

      $.each($('#activity_form').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });
      if(!values['username']){
        checkScroll('username');
      }else if(!values['sex']){
        cansubmit = false;
        $('input[name="sex"]').parent().parent().addClass('has-error');
        var offset = $('input[name="sex"]').parent().parent().offset();
        scroll(offset.top - 71);
        alifenxi.track('提交出错',{
          err_type: 'sex'
        })
      }else if(!values['idcardnum']){
        checkScroll('idcardnum');
      }else if(!values['email'] || !testType('email',values['email'])){
        checkScroll('email');
      }else if(!values['mobile'] || !testType('num',values['mobile'])){
        checkScroll('mobile');
      }else if(!values['career']){
        checkScroll('career', 'select');
      }else if(!values['address']){
        checkScroll('address');
      }else if(!values['zipcode']){
        checkScroll('zipcode');
      }else if(!values['education']){
        checkScroll('education', 'select');
      }else if(!values['attend_before']){
        cansubmit = false;
        $('input[name="attend_before"]').parent().parent().addClass('has-error');
        var offset = $('input[name="attend_before"]').parent().parent().offset();
        scroll(offset.top - 71);
        alifenxi.track('提交出错',{
          err_type : "attend_before"
        })
      }else if(!values['result']){
        checkScroll('result','textarea');
      }
      if(cansubmit){
        if(values['career'] == "公务员" || values['career'] == "金融机构从业人员" || values['career'] == "其他"){
          values['unit'] = $('input[name="unit"]','.finace-people.row').val();
          values['career_name'] = $('input[name="career_name"]','.finace-people.row').val();
          values['english'] = $('input[name="english"]','.finace-people.row').val();
          values['work_experience'] = $('textarea[name="work_experience"]','.finace-people.row').val();
          if(!values['unit']){
            checkScroll('unit');
          }else if(!values['career_name']){
            checkScroll('career_name');
          }else if(!values['english']){
            checkScroll('english');
          }else if(!values['work_experience']){
            checkScroll('work_experience','textarea');
          }
        }else if(values['career'] == "教师"){
          values['unit'] = $('input[name="unit"]','.teacher-people.row').val();
          values['career_name'] = $('input[name="career_name"]','.teacher-people.row').val();
          values['english'] = $('input[name="english"]','.teacher-people.row').val();
          if(!values['unit']){
            checkScroll('unit');
          }else if(!values['career_name']){
            checkScroll('career_name');
          }else if(!values['english']){
            checkScroll('english');
          }else if(!values['research']){
            checkScroll('research','textarea');
          }
        }else if(values['career'] == "学生"){
          if(!values['school']){
            checkScroll('school');
          }else if(!values['s_class']){
            checkScroll('s_class','select');
          }else if(!values['department']){
            checkScroll('department');
          }else if(!values['english']){
            checkScroll('english');
          }else if(!values['study']){
            checkScroll('study','textarea');
          }
        }
      }

      cansubmit && $.post("/gdpx/apply",values,function(result){
        if(result.err == 0){
          alifenxi.track('注册成功',{
            process_time : Math.floor((new Date().getTime() - s_time)/1000)
          })
          alert('注册成功!')
        }
      },'json')
    })
})