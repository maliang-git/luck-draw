// 移動端兼容性问题处理 方法封装
(function($) {
    $.extend({
        //初始化
        methodInit: function() {
            this.swiperRoll();
            this.selectColorRest();
            this.keyboardSet();
            this.judgeTerminal();
            this.limitInput();
        },
        //初始化swiper插件，轮播图滚动
        swiperRoll: function() {
            var banerLength = $(".banner .swiper-slide").length;
            if (banerLength > 1) {
                new Swiper('.banner_swiper', {
                    autoplay: {
                        disableOnInteraction: false, // 鼠标滑动后继续自动播放
                        delay: 5000, //1秒切换一次
                    },
                    loop: true, // 循环模式选项
                    speed: 1000, //切换速度
                    pagination: {
                        el: '.banner_pagination',
                        clickable: true,
                    }
                });
            }
        },

        //select 第一个option字体颜色设置
        selectColorRest: function() {
            var unSelected = "#757575";
            var selected = "#333";
            $(function() {
                $("select").css("color", unSelected);
                $("option").css("color", selected);
                $("select").change(function() {
                    var selItem = $(this).val();
                    if (selItem == $(this).find('option:first').val()) {
                        $(this).css("color", unSelected);
                    } else {
                        $(this).css("color", selected);
                    }
                });
            });
        },

        //弹出软键盘遮住输入框
        keyboardSet: function() {
            $('input,textarea').on('focus', function() {
                var target = this;
                setTimeout(function() {
                    target.scrollIntoViewIfNeeded();
                    //target.scrollIntoView(true);
                }, 200);
            });
        },

        //判断是android终端还是ios终端 
        judgeTerminal: function() {
            var m = navigator.userAgent;
            var isAndroid = m.indexOf('Android') > -1 || m.indexOf('Adr') > -1; //android终端
            var isIos = !!m.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端       
            var timer;
            if (isIos) {
                // ios 弹出与收起软键盘执行事件
                document.body.addEventListener('focusin', () => { //软键盘弹起事件
                    $("footer").hide();
                })
                document.body.addEventListener('focusout', () => { //软键盘关闭事件
                    $("footer").show();

                    // 解決ios端用微信打开页面，收起软键盘后，底部出现空白问题
                    setTimeout(() => {
                        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                    }, 100);
                })
            }
            if (isAndroid) {
                // android 弹出与收起软键盘执行事件
                var innerHeight = window.innerHeight;
                window.addEventListener('resize', () => {
                    var newInnerHeight = window.innerHeight;
                    if (innerHeight > newInnerHeight) {
                        // 键盘弹出事件处理
                        $("footer").hide();
                    } else {
                        // 键盘收起事件处理
                        $("footer").show();
                    }
                });
            }
        },

        //限制输入框输入特殊表情
        limitInput: function() {
            $('input,textarea').on('input', function() {
                var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                var org_val = $(this).val();
                if (regStr.test(org_val)) {
                    $(this).val(org_val.replace(regStr, ""));
                }
            });
        }

    });
})(jQuery);

$.methodInit();