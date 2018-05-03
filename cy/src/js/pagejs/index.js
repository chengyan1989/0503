require(["jquery", "handlebars", "render", "iscroll", "swiper"], function($, Handlebars, render, IScroll, Swiper) {
    //搜索页面的本地存储
    var storage = window.localStorage;
    var searchArr = JSON.parse(storage.getItem("search")) || [];
    $("#searchBtn").on("click", function() {
        var val = $("#searchText").val();
        if (!val) {
            $(".page-2-search-log").html("您搜所的内容为空，没有搜索记录")
            $(".page-2-search-log").css("color", "red");
        } else {
            searchArr.push(val);
            storage.setItem("search", JSON.stringify(searchArr));
            getItem();
        }
    });
    //初始化渲染搜素记录
    function getItem() {
        var ItemTpl = $("#seachLog").html();
        Handlebars.registerHelper("add", function(ind) {
            return ind + 1;
        });
        var template = Handlebars.compile(ItemTpl);
        var html = template(searchArr)
        $(".page-2-search-log-list").html(html);
    }
    getItem();
    //删除记录的按钮事件
    $(".close").on("click", function() {
        alert(1);
        var ind = $(this).parent().index();
        var li = $(this).parent();
        li.remove();
        var text = searchArr.splice(ind, 1);
        console.log(text);
        // storage.removeItem("search");
        // console.log(searchArr);
    });

    // 页脚实现的点击进行Tab切换
    function initBigSwiper() {
        //页脚点击
        var _dl = $("footer").find("dl");
        _dl.on("click", function() {
            change($(this).index());
        });
    };
    initBigSwiper();
    //页脚的样式变化
    function change(ind) {
        var _dl = $("footer").find("dl");
        _dl.eq(ind).addClass("active").siblings().removeClass("active");
        $(".page").eq(ind).show().siblings().hide();
    }
    //实例横向滚动条
    var myScroll;

    function iscroll() {
        //计算li的宽度
        var li = $(".header-nav-list").find("li");
        var liWidth = 0;
        li.each(function(i, v) {
            liWidth += $(this).outerWidth(true);
        })

        $(".header-nav-list").css("width", liWidth);

        //实例化滚动条
        myScroll = new IScroll(".header-nav", {
            scrollX: true, //开启横向的滚动条
            scrollY: false //关闭纵向的滚动条
        });

    }
    //点击到中间
    function isChange(inde) {
        var li = $(".header-nav-list").find("li");
        myScroll.scrollToElement(li[inde], 1000, true, 0);
    }



    //请求五元包邮页面的头部列表
    function getHeaderData() {
        $.ajax({
            url: "/index",
            success: function(data) {
                //导航栏请求数据
                var data = JSON.parse(data);
                data.forEach(function(file) {
                    var li = `<li data-id="${file.id}">${file.tit}</li>`;
                    $(".header-nav-list").append(li);
                });
                iscroll();
                fiveContent();
            },
            error: function(error) {
                console.warn(error);
            }
        })
    };
    getHeaderData();

    //请求五元包邮列表的详情
    function fiveContent() {
        var _li = $(".header-nav-list").find("li");
        _li.eq(0).addClass("red");

        init(_li); //调用初始化推荐的数据

        _li.on("click", function() {
            var ind = $(this).index();
            isChange(ind);
            $(this).addClass("red").siblings().removeClass("red");
            var id = $(this).attr("data-id");

            $.ajax({
                url: "/index/list",
                data: {
                    id: id
                },
                success: function(data) {
                    var data = JSON.parse(data);
                    render.render($("#shopList"), data, $(".shoping-list"));
                    goosDetail(); //商品详情的点击
                },
                error: function(error) {
                    console.warn(error);
                }
            })
        });
    }


    //进入五元包邮 然后初始化推荐的数据
    function init(_li) {
        var id = _li.eq(0).attr("data-id"); // 初始化1

        $.ajax({
            url: "/index/list",
            data: {
                id: id
            },
            success: function(data) {
                var data = JSON.parse(data);
                render.render($("#shopList"), data, $(".shoping-list"));
                goosDetail(); //商品详情的点击
            },
            error: function(error) {
                console.warn(error);
            }
        })
    }

    //每一个商品的详情页面点击
    function goosDetail() {
        var _li = $(".shoping-list").find("li");
        _li.on("click", function() {

            var id = $(this).attr("data-id");
            console.log(id);
            // $.ajax({
            //     url: "/index/list/goos",
            //     data: {
            //         id: id
            //     },
            //     success: function(data) {
            //         var data = JSON.parse(data);

            //     },
            //     error: function(error) {
            //         console.warn(error);
            //     }
            // })
        });
    }
})