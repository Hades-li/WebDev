/**
 * Created by ZLY on 2015/7/9.
 */
define(['jquery','topTools','drag'],
    function( $,t,d){

    return    function analysis(data){
            var col = data.col
                ,layout = data.layout
                ,i = 0
                ,j = 0 ;

            //模块解析
            function draw_grid(arr){
                var inner;
                var div = null;

                inner = d.selWidget(arr).getEl();
                div = $("<div class='module' module_type='"+ arr +"'></div>" );
                div.html(inner);
                //console.log(div);
                return div;
            }

            //解析数组
            function ana_arr(arr){
                var len = arr.length;    //数组长度
                var tmpl;
                for(i =0 ;i<len; i++){
                    //
                    if(arr[i].length==1){

                        tmpl = draw_grid(arr[i][0].module_type); //传入数组第一个值
                        //console.log(tmpl);
                        $(".editor-wrap").eq(i).append(tmpl)  ;
                        //
                        d.getWidget(tmpl).init();
                    } else if(arr[i].length>1){
                        var l = arr[i].length ;
                        for (j =0 ;j<l; j++){
                            tmpl = draw_grid(arr[i][j].module_type); //传入数组第j个值
                            $(".editor-wrap").eq(i).append(tmpl);
                            //
                            d.getWidget(tmpl).init();

                        }
                    }

                }
                d.moduleWrapShow_hide();
            }

            t.selectLayout(col,function(){ana_arr(layout)});



        };

    }
);
