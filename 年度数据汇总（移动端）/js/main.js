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
        //todo
        //顶部按钮切换数值面板
    };
    var ec = ec || {};
    ec = {
        //柱状图配置信息
        bar_option:{
            backgroundColor:'#fff',
            title:{
                x:24,
                y:4,
                textStyle:{
                    color:'#eb6100',
                    fontSize: 12
                }
            },
            grid:{
                x:"30",
                y:"30",
                x2:"5",
                y2:"76",
                borderWidth:"0"
            },
            xAxis:[
                {
                    "axisLine" : {
                        "show": true,
                        "lineStyle": {
                            "color": "#b4b4b4",
                            "type": "solid",
                            "width": 1
                        }
                    },
                    splitLine : {
                        show:false
                    },
                    axisTick : {    // 轴标记
                        show:false
                    },
                    axisLabel:{
                        interval:"0",
                        margin:4,
                        formatter: function (value){
                            return value.replace(/(.{1})/g,"$1\n");
                        }
                    }
                }
            ],
            yAxis : [
                {
                    "axisLine" : {
                        "show": true,
                        "lineStyle": {
                            "color": "#b4b4b4",
                            "type": "solid",
                            "width": 1
                        }
                    },
                    splitLine : {
                        show:false
                    },
                    axisTick : {    // 轴标记
                        show:false
                    },
                    splitArea : {
                        show: true,
                        areaStyle:{
                            color:['rgba(255,255,255,1)','rgba(251,249,244,1)']
                        }
                    },

                    type : 'value'
                }
            ],
            series : [
                {
                    "type":"bar",
                    //barWidth:40,
                    label: {
                        show: false
                        /*formatter: function (params) {
                         var num = Number(params.value/10000);
                         return parseFloat(num.toFixed(2)) + "万";
                         }*/
                    },
                    itemStyle: {
                        normal: {
                            color:'#eb6100'
                        }
                    }
                }
            ]
        },
        //饼图配置信息
        pie_option: {
            backgroundColor:'#fff',
            /*tooltip : {
                show:false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },*/
            legend: {
                orient : 'vertical',
                x : 14,
                y : 15
            },
            series : [
                {
                    type:'pie',
                    radius :['33%','65%'],
                    center: ['50%', '53%'],
                    avoidLabelOverlap: false,
                    label : {
                        normal:{
                            show:false,
                            position: 'center',
                            formatter: function (params) {
                                return (params.percent - 0).toFixed(0) + '%';
                            }
                        },
                        emphasis:{
                            show: true,
                            textStyle: {
                                fontSize: '34'
                            }
                        }
                    },
                    labelLine : {
                        show : false
                    },
                    itemStyle : {
                        normal : {
                            color:function(params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#eb6100','#2ebbe6','#8957a1','#8fc31f','#eb6877','#00479d'
                                ];
                                switch (params.dataIndex){
                                    case 0:
                                        return colorList[0];
                                        break;
                                    case 1:
                                        return colorList[1];
                                        break;
                                    case 2:
                                        return colorList[2];
                                        break;
                                    case 3:
                                        return colorList[3];
                                        break;
                                    case 4:
                                        return colorList[4];
                                        break;
                                    case 5:
                                        return colorList[5];
                                        break;
                                    default:
                                        return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                                        break;

                                }
                            }
                        }
                        /*emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold',
                                    fontFamily:'Microsoft Yahei'
                                },
                                formatter: function (params) {
                                    return (params.percent - 0).toFixed(0) + '%';
                                }

                            }
                        }*/
                    }
                }
            ]
        },

        //饼图2配置信息
        pie_option_2:{
            /*tooltip : {
                show:false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },*/
            legend: {
                orient : 'vertical',
                x : 'left'
                //y:25
            },
            series : [
                {
                    type:'pie',
                    radius :['36%','73%'],
                    center: ['60%', '61%'],
                    avoidLabelOverlap: false,
                    label : {
                        normal:{
                            show:false,
                            position: 'center',
                            formatter: function (params) {
                                return (params.percent - 0).toFixed(0) + '%';
                            }
                        },
                        emphasis:{
                            show: true,
                            textStyle: {
                                fontSize: '22'
                            }
                        }
                    },
                    labelLine : {
                        show : false
                    },
                    itemStyle : {
                        normal : {
                            color:function(params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#eb6100','#2ebbe6','#8957a1','#8fc31f','#eb6877','#00479d'
                                ];
                                switch (params.dataIndex){
                                    case 0:
                                        return colorList[0];
                                        break;
                                    case 1:
                                        return colorList[1];
                                        break;
                                    case 2:
                                        return colorList[2];
                                        break;
                                    case 3:
                                        return colorList[3];
                                        break;
                                    case 4:
                                        return colorList[4];
                                        break;
                                    case 5:
                                        return colorList[5];
                                        break;
                                    default:
                                        return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                                        break;
                                }
                            }
                        }
                    }
                }
            ]
        },
    /**
         *
         * @param option 数据信息
         * @param targetDom 用于渲染的dom。
         * @param type 采用那种图形类型，‘bar’，‘pie’，‘pie-2’
         * return  echart标准对象
         */
        createChart: function (option,targetDom,type) {
            var targetOp = {};
            switch (type){
                case "bar":
                    $.extend(true,targetOp,this.bar_option,option);
                    break;
                case "pie":
                    $.extend(true,targetOp,this.pie_option,option);
                    break;
                case "pie-2":
                    $.extend(true,targetOp,this.pie_option_2,option);
                    break;
            }
            var chart = echarts.init(targetDom);
            chart.setOption(targetOp);
            return chart;
        },
        //
        setChart: function () {

        }
    };
    w.py = py;
    w.ec = ec;
    $(function(){
        //todo

    });
})(window,Zepto||jQuery);

//tab切换
;(function($,window,document){
    var Tab = function(elem,options){
        this.elem = elem;
        this.$elem= $(elem);
        this.options=options;
    };
    Tab.prototype={
        def:{
            handler: ".tab-btn a",
            content: ".tab-content",
            event  : "tap"
        },
        init:function(){
            this.config = $.extend({},this.def,this.options);
            this.method();
            return this;
        },
        method: function () {
            //console.log(this.$elem.find(this.config.handler))
            var handler = this.$elem.find(this.config.handler),
                content = this.$elem.find(this.config.content);
            //_this   = this;
            $(document).on(this.config.event,handler,function(e){
                //console.log(handler)
                //console.log(e.target)
                var index = handler.index(e.target);
                //console.log(index);
                if (index>-1){
                    handler.removeClass("active");
                    handler.eq(index).addClass("active");
                    content.hide();
                    content.eq(index).show();
                }
            })
        }
    };

    $.fn.tab=function(options){
        return this.each(function(){
            console.log("qidong");
            new Tab(this,options).init();
        })
    }
})(Zepto,window,document);