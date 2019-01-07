/**
 * Created by Administrator on 2019/1/6 0006.
 */
$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"get",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("cateTpl",info);
        $("tbody").html(htmlStr);
        //分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();
          }
        });
      }
    })
  }

  //按钮点击模态框显示
  $(".categoryBtn").on("click",function(){
    $("#categoryModal").modal("show");
    //发送ajax
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      data:{
        page:1,
        pageSize:1000
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }


    })
  })

  //赋值功能

  $(".dropdown-menu").on("click","a",function(){
    var txt=$(this).text();
    $(".dropdown-text").text(txt);
  })


  //图片上传
  $("#fileupLoad").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      $("#imgBox").attr("src",data.result.picAddr);
    }
  });
  })
