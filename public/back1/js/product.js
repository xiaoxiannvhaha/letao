/**
 * Created by Administrator on 2019/1/7 0007.
 */
$(function(){

  var currentPage=1;
  var pageSize=2;
  var picArr=[];
  render();
  function render(){
    $.ajax({
      url:"/product/queryProductDetailList",
      type:"get",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);

        var htmlStr=template("addTpl",info);
        $("tbody").html(htmlStr);
        //分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          size:"small",
          onPageClicked:function(event, originalEvent, type,page){
            currentPage=page;
            render();
          }
        });

      }
    })
  }

  //点击按钮显示模态框
  $(".addBtn").on("click",function(){
    $("#productModal").modal("show");
    //发送ajax请求二级分类数据
    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"get",
      dataType:"json",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("secondTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }

    })
  })

  //给a 注册事件赋值
  $(".dropdown-menu").on("click","a",function(){
   var txt= $(this).text();
    $(".dropdown-text").text(txt);
    var id=$(this).data("id");
    $('[name="categoryId"]').val(id);
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  })

  //多文件上传
  $("#fileupLoad").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log( data.result ); // 后台返回的结果对象
      var picObj = data.result; // 后台返回的图片对象

      // 往数组前面追加
      picArr.unshift( picObj );

      var picUrl = picObj.picAddr; // 返回的图片地址

      // 将图片添加到 imgBox 最前面
      $('#imgBox').prepend('<img style="width: 100px;height: 100px;" src="'+ picUrl +'" alt="">');

      if(picArr.length>3){
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }
      if(picArr.length==3){
        $("#form").data("bootstrapValidator").updateStatus("picArr", "VALID");

      }
    }
  });

  //配置表单校验
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
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //  xx-xx
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picArr: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }

  })

  //注册表单验证成功事件
  $("#form").on('success.form.bv', function(e){
    e.preventDefault();
    var manyStr=$("#form").serialize();
    manyStr += JSON.stringify(picArr);
    $.ajax({
      url:"/product/addProduct",
      type:"post",
      dataType:"json",
      data:manyStr,
      success:function(info){
        console.log(info);
        if(info.success){

          $("#productModal").modal("hide");
          currentPage=1;
          render();
          //重置
          $("#form").data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择二级分类");
          $("#imgBox img").remove();
        }
      }
    })
  });
})