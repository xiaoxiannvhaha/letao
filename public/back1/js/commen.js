/**
 * Created by Administrator on 2019/1/5 0005.
 */

//进度条功能


  $(document).ajaxStart(function(){

    NProgress.start();

  })

  $(document).ajaxStop(function(){

    setInterval(function(){

      NProgress.done();
    },4000)


  })

//二级菜单功能
$(function(){

  $(".lt_aside .category").click(function(){
    $(this).next().stop().slideToggle();
  })

})

//菜单栏功能

$(function(){

  $(".lt_main .menu").click(function(){

    //alert (123);
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");

  })

})

//模态框功能
$(function(){
  $(".lt_main .logout").click(function(){
    $('#logoutModal').modal("show");
  })
  //退出按钮
  $("#logoutBtn").click(function(){

    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(res){
        //console.log(res);
        if(res.success){
          location.href="login.html"
        }
      }
    })
  })
})

