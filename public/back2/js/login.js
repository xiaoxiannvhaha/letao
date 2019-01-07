/**
 * Created by Administrator on 2019/1/6 0006.
 */

$(function(){

  //1.校验表单
  $("#form").bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
          //(1) 用户名不能为空, 长度为2-6位
          //(2) 密码不能为空, 长度为6-12位
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2-6之间'
          },
          callback: {
            message: '用户名不存在'
          }

        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6-12之间'
          },
          callback:{
            message: '密码错误'
          }
        }
      }
    }

  });

  //2.注册重置事件
  $(".resetBtn").on("click",function(){
    var validator = $("#form").data('bootstrapValidator');
    validator.resetForm();
  });

  //3.阻止submit，发送ajax请求
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      dataType:"json",
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="index.html";
          return;
        }
        if(info.error===1000){
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID", "callback");
          return;
        }
        if(info.error===1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID", "callback");
          return;
        }
      }
    })
  });
})