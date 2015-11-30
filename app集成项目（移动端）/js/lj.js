/**
 * Created by h.jiali2 on 2015/9/29.
 */
var doya = doya || {};
doya = {
    init: function () {
        this.slide_del();
        //this.autoTextarea(document.getElementById("text"));
    },
    //滑动删除
    slide_del: function () {
        var _list = $(".swipeLeft ul");
        var _slide_wrap = _list.find("li .wrap:not(.disable)");
        var _start_x = 0;
        var move = 0;
        var ml = 0;
        //手指触碰
        _slide_wrap.on("touchstart", function (event) {
            var touchpos = event.touches[0];
            _start_x = touchpos.clientX;
            _cur_marginLeft = parseInt($(this).css("margin-left"));
            //console.log("ml:"+_cur_marginLeft);
            //console.log("start-x:"+touchpos.clientX+"   start-y:"+touchpos.clientY);
        });

        //滑动触发
        _slide_wrap.on("touchmove",function (event) {
            var touchpos = event.touches[0];
            move = (touchpos.clientX -_start_x)/40;
            ml = _cur_marginLeft + move;
            if(ml < -3){
                ml = -3;
            }else if(ml > 0){
                ml = 0;
            }
            $(this).css("margin-left",ml+'rem');
            //console.log("move:"+ml);
            //console.log("x:"+touchpos.clientX+"  y:"+touchpos.clientY);

        });

        //手指松开
        _slide_wrap.on("touchend",function(event) {
            var touchpos = event.changedTouches[0];
            if(parseInt($(this).css("margin-left")) < -1.5){
                $(this).animate({marginLeft:"-3rem"},300);
            }else{
                $(this).animate({marginLeft:"0rem"},300);
            }
            //console.log("end-x:"+touchpos.clientX+"   end-y:"+touchpos.clientY);
        });
    },

};
$(function () {
   doya.init();
});