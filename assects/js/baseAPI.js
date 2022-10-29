/* 
每次调用 $.get() $.post() $.ajax()的时候
会先调用 ajaxPrefilter 这个函数
这个函数 可以拿到 我们给 Ajax 提供的 配置对象

*/
$.ajaxPrefilter(function(options){
    // 在发起真正的 Ajax 请求之前 统一拼接请求的根路径
    // options.url = 'http://www.liulongbin.top:3007'+options.url
    options.url = 'http://127.0.0.1:2022'+options.url
    console.log(options.url);

    // 优化：统一为有权限的接口 设置 headers 请求头
    if(options.url.indexOf('/my/')!==-1){  //如果没有找到返回-1 找到以后返回索引
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }

    // 全局挂载一个 complete 回调函数
    options.complete=function(res){
        // console.log(res);
        // // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message==='身份认证失败！'){
            localStorage.clear()
            location.href='/login.html'
        }
    } 
})