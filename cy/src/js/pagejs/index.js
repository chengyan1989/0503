require(["jquery", "render"], function($, render) {
    console.log(render.render);
    //页脚的Tab切换
    var _span = $("footer").find("span");
    var page = $("section").find(".page");
    _span.on("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        page.eq(index).show().siblings().hide();
    });
    //发送数据请求数据
    $.ajax({
        url: "/index/page1/header",
        success: function(data) {
            var data = JSON.parse(data);
            render.render($("#page1-header-list-tpl"), data, $(".page1-header-list"))
        },
        error: function(error) {
            console.warn(error);
        }
    })
})