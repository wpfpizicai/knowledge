define(function(require,exports,module) {
    alifenxi.track('提交页面浏览');
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
      }
    });
    $('input[name="optionsRadios"]').on('click',function(e){
      var c_value = $('input[name="optionsRadios"]:checked').val();
      if(c_value == 'agree'){
        $('#submit_btn').removeAttr('disabled');
      }else{
        $('#submit_btn').attr('disabled',true);
      }
    })
    $('#submit_btn').on('click',function(e) {
      alifenxi.track('提交点击');
      var values = {};
      $.each($('#activity_form').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });
      if(!values['username']){
        $('input[name="username"]').parent().addClass('has-error')
      }
      else if(!values['email']){
        $('input[name="email"]').parent().addClass('has-error')
      }
      else if(!values['phone']){
        $('input[name="phone"]').parent().addClass('has-error')
      }else{
        $.post("/gdpx/apply",values,function(result){
          if(result.err == 0){
            alert('注册成功!')
          }
        },'json')
      }
    })
})