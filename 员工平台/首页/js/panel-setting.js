/**
 * Created by ZLY on 2015/6/30.
 */
define(['jquery','underscore'],function($, _){

    //配置信息
    var opt = {
        "base-item":{show:false,item_id : ".base-item"},
        "artlist-item":{show:true,item_id : ".artlist-item"}
    };
    //解析函数
    function handle(opt){
        for(var key in opt){
            //console.log(opt[key]);
            if(opt[key].show != true ){
                $(opt[key].item_id).hide();
            }
        }
    }
    return{
        opt:opt,
        handle : handle

    }
});

