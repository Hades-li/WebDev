/**
 * Created by h.jiali2 on 2015/7/31.
 */
define(['jquery'],
    function ($) {
        //加载动画
        var load_dom = $(
            "<div class=\"load-wrap\">"+
            "    <div>"+
            "        <img src=\"images/loading.gif\" alt=\"读取....\"/>"+
            "        <p>加载中...</p>"+
            "    </div>"+
            "</div>"
        );

        var load_err = $(
            "<div class=\"load-err\">"+
            "    <div>"+
            "        <p>点击刷新，重新加载</p>"+
            "        <a href=\"javascript:\" class=\"normal-btn btn-1 refresh-btn\">刷新</a>"+
            "    </div>"+
            "</div>"
        );
        var loadingAnimation = function ($el,isActive) {
            if(isActive){
                $el.append(load_dom.clone());
            }else{
                $el.find(".load-wrap").remove();
            }

        };

        var loadErr = function ($el,refreshCallback) {
            var load = $el.find(".load-wrap");
            var loadError = load_err.clone();
            if(load){
                load.remove();
            }
            $el.append(loadError);
            loadError.find(".refresh-btn").click(function () {
                if(refreshCallback){
                    refreshCallback();
                }
                loadError.remove();
            })
        };
        return{
            loadingAnimation:loadingAnimation,
            loadErr:loadErr
        }
    }
);
