/**
 * Created by ZLY on 2015/6/30.
 */
define(['jquery'],function($){
    var data = {} ;
    //几列
    data.col = "0";
    //外部布局
    function layout(){
        var $col = $(".editor-wrap"),//列布局
            len = $col.length,      //列数
            module_len = [],        //列包含的模块数量数组   [2,3...]
            module_index = [];       //方法具体的返回
        var m_len;
        var inner_obj = {};  //数组内模块对象
        /*var i=0;
          var j=0;
        for(i = 0;i<len; i++){


            module_len[i] = $col.eq(i).find(".module").length;

            m_len = module_len[i];  //每个列模块的长度

            console.log( m_len)


            for(j = 0;j<m_len; j++){
                console.log(i)
                /!*module_index[i].push(
                    $col[i].find(".module").eq(j).attr("module_type")
                )*!/
            }
        }*/
        $col.each(function(i){
            module_len[i] = $(this).find(".module").length;

            m_len = module_len[i];
            module_index[i] =[];

            if(m_len>0){

                $(this).find(".module").each(function(j){

                    inner_obj.module_type = $(this).attr("module_type");
                    module_index[i].push( inner_obj );
                })

            }
        });
        return module_index;

    }

    //启动
    $("body").on("click",".tabsHead .saveBtn",function(){
        data.layout = layout();

        //console.log(data.layout);
        if($(".body").attr("layout")){
            data.col = $(".body").attr("layout");
        }
    });


    return data;
});
