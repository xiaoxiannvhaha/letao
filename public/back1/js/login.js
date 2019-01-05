/**
 * Created by Administrator on 2019/1/4 0004.
 */

//校验表单
$(function(){
 // 表单配置需求：
  //1.用户名不能为空 ，长度2-6位
  //2.密码不能为空，长度6-12

$("#form").bootstrapValidator({

  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  fields:{

    username:{
      validators:{

        notEmpty:{

          message:"用户名不能为空"
        },

        stringLength:{
          min:2,
          max:6,
          message:"用户名长度2-6位"

        },
        callback:{

            message:"用户不存在"
        }

      }
    },

    password:{

      validators:{

        notEmpty:{

          message:"密码不能为空"
        },

        stringLength:{
          min:6,
          max:12,
          message:"密码必须是6-12位"
        },

        callback:{

          message:"密码错误"
        }

      }
    }
  }
})
})


//表单验证成功事件
$(function () {

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(res){
        console.log(res);
        if(res.error===1000){

          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
          return;
        }
        if(res.error===1001){

          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          return;
        }
        if(res.success){
          location.href="index.html"
          return;
        }

      }
    })
  })

})


//重置功能
$(function(){

  $('[type="reset"]').click(function(){

    //console.log($("#form").data("bootstrapValidator"));
    $("#form").data("bootstrapValidator").resetForm();
  })

})

