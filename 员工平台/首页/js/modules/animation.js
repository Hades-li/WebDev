/**
 * Created by h.jiali2 on 2015/7/31.
 */
define(['jquery'],
    function ($) {
        //加载动画
        var load_dom = $("<div class='load_wrap'>" +
        "<img width='60' height='64' src='images/loading.gif' alt='正在加载...'>"+
        "</div>");
        var loadingAnimation = function ($el,isActive) {
            if(isActive){
                $el.append(load_dom.clone());
                $el.css("position","relative");
            }else{
                $el.find(".load_wrap").remove();
                $el.css("position","auto");
            }
        };
        return{
            loadingAnimation:loadingAnimation
        }
    }
);
