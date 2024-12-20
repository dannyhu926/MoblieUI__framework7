/* AB模版网 做最好的织梦整站模板下载网站 Www.AdminBuy.Cn */
/* QQ：9490489 */
/* 仿站：Fang.AdminBuy.Cn */
/* 素材：Sc.AdminBuy.Cn */
/* js特效：Js.AdminBuy.Cn */

quotes = [
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
];

data1 = [
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
];

data2 = [
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
];

data3 = [
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
    "张三138****0888",
    "李四139****1040",
    "王五138****6460",
    "赵六139****1040",
    "狗蛋138****6460",
];
$(function () {
    // 声明变量
    const start = document.getElementById("startMusic");
    const end = document.getElementById("endMusic");
    var time;

    // 文字滚动显示姓名
    function showAuto() {
        $("ul li").each(function () {
            var arr = [];
            for (var i = 0; i < quotes.length; i++) {
                var a = parseInt(Math.random() * quotes.length);
                if (arr.indexOf(a) == -1) {
                    arr.push(a);
                    $(this).text(quotes[a]);
                } else {
                    i--;
                    continue;
                }
            }
        });
    }

    function queding(num) {
        $("ul").empty();
        for (var i = 0; i < num.length; i++) {
            $("ul").append("<li>" + num[i] + "</li>");
        }
    }

    // 点击抽奖按钮函数
    function lottery() {
        // 判断按钮状态
        if ($(".draw_prize").text() !== "结束抽奖") {
            if ($(".draw_prize").text() === "查看中奖结果") {
                window.location.href = "return.html";
            } else {
                // 滚动条返回顶部（有问题），并修改按钮文本
                $(".users").animate({scrollTop: 0}, 1);
                $(".draw_prize").text("结束抽奖");
                // 开始抽奖音乐开始，中奖音乐暂停
                start.play();
                end.pause();
                // 判断抽奖的状态
                switch ($("h3").attr("class")) {
                    case "1":
                        $("h3").text("一等奖(50名)");
                        break;
                    case "2":
                        $("h3").text("二等奖(100名)");
                        break;
                    case "0":
                        $("h3").text("三等奖(150名)");
                        break;
                }
                // 定时轮番滚动
                time = setInterval(showAuto, 1);
            }
        } else {
            // 中奖音乐开始
            end.play();
            // 开始抽奖音乐结束
            start.pause();
            // 判断抽奖的状态
            switch ($("h3").attr("class")) {
                case "1":
                    queding(data1);
                    $(".draw_prize").text("开始抽取二等奖");
                    $("h3").attr("class", "2");
                    break;
                case "2":
                    queding(data2);
                    $(".draw_prize").text("开始抽取三等奖");
                    $("h3").attr("class", "0");
                    break;
                case "0":
                    queding(data3);
                    $(".draw_prize").text("查看中奖结果");
                    $("h3").attr("class", "3");
                    break;
            }
            // 移除动画
            window.clearInterval(time);
            // 滚动条返回顶部（有问题）
            $("ul").animate({scrollTop: 0}, 1);
        }
    }

    function no_click() {
        $(".draw_prize").attr("id", "no");
    }

    function yes_click() {
        $(".draw_prize").attr("id", "yes");
    }


    $(".draw_prize").click(function () {
        lottery();
    });

    // 空格触发事件
    $(document).keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if ($("#yes").length > 0 && keycode === 32) {
            // 防触误操作
            // $(".draw_prize").attr("id", "no");
            lottery();
            // window.setTimeout(yes_click(), 10000);
        } else {
            return false;
        }
    });
});
