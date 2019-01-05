/**
 * Created by Administrator on 2019/1/5 0005.
 */

//登录拦截功能

$.ajax({
  url:"/employee/checkRootLogin",
  type:"get",
  dataType:"json",
  success:function(res){
    if(res.success){
     alert("当前用户已登录")
    }
    if(res.error===400){
      location.href="login.html"
    }
  }

})