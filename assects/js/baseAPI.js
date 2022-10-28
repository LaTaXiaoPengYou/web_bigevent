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
})