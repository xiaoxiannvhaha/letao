/**
 * Created by Administrator on 2019/1/5 0005.
 */

$(function(){

  var currentpage=1;
  var pageSize=5;
  render();

  function render(){
    //发送ajax熏染
    $.ajax({
      url:"/user/queryUser",
      type:"get",
      dataType:"json",
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("userTpl",info);
        $("tbody").html(htmlStr);

        //分页初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentpage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage=page;
            render();
          }
        });
      }
    })
  }

  //切换模态框功能 ==>事件委托

  $("tbody").on("click",".btn",function(){
    $("#btnModal").modal("show");
    //获取当前用户id
    currentId=$(this).parent().data("id");
    //判断将用户修改成什么状态
    isDelete=$(this).hasClass("btn-danger")? 0:1;
  });

  //点击确定按钮发送ajax
  $("#sureBtn").on("click",function(){

    $.ajax({
      url:"/user/updateUser",
      type:"post",
      dataType:"json",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      success:function(info){
        if(info.success){
          $("#btnModal").modal('hide');
          render();
        }
      }
    })
  })

})


