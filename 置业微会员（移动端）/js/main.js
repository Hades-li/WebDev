/**
 * Created by ZLY on 2015/2/4.
 */
<!--设置页面的根字体大小-->
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
;(function(w,$){
    var py = py || {};
    py={
        //信息弹窗
        toast: function (str,callback) {
            var myStyle = "background-color:rgba(0,0,0,0.7);color:#fff;width:92%;font-size:16px;";
            layer.open({
                content:str,
                time:3,
                style:myStyle,
                end:callback
            })
        },
        //报错信息弹窗
        toast_error: function (str,callback) {
            var myStyle = "background-color:rgba(255,255,255,0.9);color:#ff7474;width:92%;font-size:16px;";
            layer.open({
                content:str,
                time:3,
                style:myStyle,
                end:callback
            })
        } ,
        yzm :function(){
            //获取验证码倒计时
            $('.btn-get-code').click(function () {
                var count = 60;
                //一开始就运行，消除延迟
                CountDown();

                var countdown = setInterval(CountDown, 1000);
                function CountDown() {
                    $(".btn-get-code").hide();
                    $(".btn-get-code-second").text("("+count + "s"+")");
                    $(".btn-get-code-second").show();
                    if (count == 0) {
                        $(".btn-get-code").show();
                        $(".btn-get-code-second").hide();
                        clearInterval(countdown);
                    }
                    count--;
                }

                //显示验证码输入框
                //$(this).parent().next().show();
            });
        },
        more: function () {
            $('.more-wrap').click(function () {
                $('.m_hide').removeClass("m_hide");
                $(this).hide();
            })
        },
        
        yzshow: function (curInput) {
            var str = $.trim($(curInput).val());
            if(str != $(curInput).attr('placeholder') && str.length > 0){
                $(curInput).next('.verify').removeClass('hide');
            }else{
                $(curInput).next('.verify').addClass('hide');
            }
        }
    };
    w.py = py;
    $(function(){
        py.more();
    });
})(window,Zepto||jQuery);
