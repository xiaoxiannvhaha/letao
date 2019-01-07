/**
 * Created by Administrator on 2019/1/6 0006.
 */
$(function(){

  var currentPage=1;
  var pageSize=5;
  render();

  function render(){
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("firstTpl",info);
        $("tbody").html(htmlStr);

        //分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            //熏染
            render();
          }
        })
      }
    })

  }

//模态框

  $(".btn-default").on("click",function(){
    $("#addModal").modal("show");
  })

  //验证表单
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      }
    }

  });

  //注册表单校验成功事件
 $("#form").on("success.form.bv",function(e){
   e.preventDefault();
   $.ajax({
     url:"/category/addTopCategory",
     type:"post",
     dataType:"json",
     data:$("#form").serialize(),
     success:function(info){
       console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          render();
        }
      }
   })
 })
})
