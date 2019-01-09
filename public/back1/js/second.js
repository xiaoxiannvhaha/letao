/**
 * Created by Administrator on 2019/1/6 0006.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("cateTpl", info);
        $("tbody").html(htmlStr);
        //分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  //2.按钮点击模态框显示
  $(".categoryBtn").on("click", function () {
    $("#categoryModal").modal("show");
    //发送ajax
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 1000
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("dropdownTpl", info);
        $(".dropdown-menu").html(htmlStr);
      }


    })
  })

  //3.点击a赋值功能

  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".dropdown-text").text(txt);

    //下拉菜单隐藏域赋值
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    //改变成功状态
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

  })


  //4.图片上传
  $("#fileupLoad").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      //console.log(data);
      $("#imgBox").attr("src", data.result.picAddr);
      //图片隐藏域赋值
      $('[name="brandLogo"]').val(data.result.picAddr);

      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");

    }
  });


  //5.表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          },

        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          },

        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传图片'
          }

        }
      }
    }
  })

  //6.注册表单验证成功事件
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      url:"/category/addSecondCategory",
      type:"post",
      dataType:"json",
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          $("#categoryModal").modal("hide");
          currentPage=1;
          render();
          //重置功能

          $("#form").data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择一级分类");
          $("#imgBox").attr("src","./images/none.png")
        }
      }
    })
  })

})



