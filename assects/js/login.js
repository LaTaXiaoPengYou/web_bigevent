$(function(){
    $('#link_reg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })

    $('#link_login').on('click',function(){
        $('.loginBox').show()
        $('.regBox').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    // 从 layui 中获取 layer 对象
    var layer = layui.layer
    // 自定义一个 pwd 校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
        repwd:function(value){
            var pwd = $('.regBox [name=password]').val()
            if(pwd !== value)
            {
                return '两次密码不一致！'
            }
        }
    })
    
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认提交行为
        e.preventDefault()
        // 提交ajax POST 请求
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('.regBox [name=username]').val(),
                password:$('.regBox [name=password]').val()
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                } 
                
                layer.msg('注册成功，请登录！');
                // 注册成功以后 模拟点击行为 跳转到登录页面
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){

                if(res.status !== 0 ){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功返回的token存到localStorage中
                localStorage.setItem('token',res.token)
                // console.log(res);
                // 登录成功以后 跳转到主页面
                location.href='/index.html'
            }
        })
    })
})