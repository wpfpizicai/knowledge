define(function(require,exports,module) {
  var id = $('#activity_form').attr('data-id'),
    status = $('#activity_form').attr('data-status');
  $('#pass_btn').on('click',function(e) {
    if(status == 1){
      alert("该学员已经授权通过，无需重新授权！");
      return;
    }
    $.post("/gdpx/pass",{id:id,status:1},function(result){
        if(result.errno == 0){
          alert('授权成功!')
        }
      },'json')
  });
  $('#not_pass_btn').on('click',function(e) {
    if(status == 2){
      alert("该学员已经是未通过状态，无需重新取消授权！");
      return;
    }
    $.post("/gdpx/pass",{id:id,status:2},function(result){
        if(result.errno == 0){
          alert('取消通过成功!')
        }
      },'json')
  })
})