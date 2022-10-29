// 入口函数
$(function () {
    getUserInfo();

    var layer = layui.layer
    // 退出登录
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 登录成功以后 返回到 login 页面路径 ''
            location.href='/login.html'
            // 清空localStorage
            localStorage.clear()
            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})
// 登录成功以后 获取用户信息 并 渲染
function getUserInfo() {
    // console.log(localStorage.getItem('token'));
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // baseAPI 优化 为有权限的接口 统一设置了 headers
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token')||''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染头像
            renderAvatar(res.data)
        },

        //不论 成功 还是 失败 最终都会 调用 complete 回调函数
        // complete:function(res){
        //     console.log(res);
        //     // // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message==='身份认证失败！'){
        //         localStorage.clear()
        //         location.href='/login.html'
        //     }
        // } 
        // complete 已做优化 在 baseAPI 中全局挂载
    })
}
function renderAvatar(user) {
    // 渲染用户名 先用昵称 没有 昵称再用 用户名
    var name = user.nickname || user.username
    $('.layui-logo').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像  起初 img span 都是隐藏
    if (user.user_pic !== '') {
        // 如果头像不为空 则显示img
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 若头像为空  显示 span 并且用name的首字母或汉字做头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}

