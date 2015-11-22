/**
 * Created by h.jiali2 on 2015/7/31.
 */
define([
        'jquery',
        'jquery-ui',
        'backbone',
        'template-loader',
        'modules/animation',
        'echarts',
        '../class',
        'modules/mod_artlist',
], function ($,jquery_ui,Backbone,tpl,am,ec,Class,artlist) {
        //ECHart模型的定义
       /* var EChart_model = Backbone.Model.extend({
            defaults:{
                "type":"pie",
                "title" : {
                    "text": "标题1",
                    "subtext": "副标题1"
                },
                "series_pie":[
                    {
                        "name":"饼图的名称",
                        "data":[
                            {"value":335, "name":"一"},
                            {"value":310, "name":"二"},
                            {"value":234, "name":"三"},
                            {"value":135, "name":"四"},
                            {"value":1548, "name":"五"}
                        ]
                    }
                ],
                "xAxis" : [
                    {
                        "data" : ["周一","周二","周三","周四","周五","周六","周日"]
                    }
                ],
                "series_bar":[
                    {
                        "name":"一",
                        "data":[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        "name":"二",
                        "data":[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        "name":"三",
                        "data":[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        "name":"四",
                        "data":[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        "name":"五",
                        "data":[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ],
                "other":{}
            },
            //输出echart配置信息
            toOption: function (type) {
                //柱状图的op模版
                var tmp_bar_op = {
                    "title" : {
                        "text": "标题",
                        "subtext": "副标题"
                    },
                    "tooltip": {
                        show: true
                    },
                    toolbox: {
                        orient:'vertical',
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    legend: {
                        "data" : ["类一","类二","类三","类四","类五"]
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","毛衣"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"类一",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        }
                    ]
                };
                //饼图的op模版
                var tmp_pie_op = {
                    "title" : {
                        "text": "标题",
                        "subtext": "副标题",
                        "x":"center"
                    },
                    "tooltip": {
                        show: true
                    },
                    "legend": {
                        orient : "vertical",
                        x:"left",
                        "data" : ["类一","类二","类三","类四","类五"]
                    },
                    "series":[
                        {
                            "name":"饼图的名称",
                            "type":"pie",
                            "radius" : "55%",
                            //"center": ["50%", 225],
                            "data":[
                                {"value":335, "name":"类一"},
                                {"value":310, "name":"类二"},
                                {"value":234, "name":"类三"},
                                {"value":135, "name":"类四"},
                                {"value":1548, "name":"类五"}
                            ]
                        }
                    ]
                };

                switch(this.get("type")){
                    case "bar":
                        //标题
                        tmp_bar_op.title.text = this.get("title").text;
                        tmp_bar_op.title.subtext = this.get("title").subtext;
                        //series
                        var this_series = this.get("series_bar");
                        var model = tmp_bar_op.series[0];
                        tmp_bar_op.series = [];
                        for(var i in this_series){
                            //series
                            var tmp = new Object();
                            for(var j in model){
                                tmp[j] = model[j];
                            }
                            tmp.type = this.get("type");
                            tmp.name = this_series[i].name;
                            tmp.data = this_series[i].data;
                            tmp_bar_op.series.push(tmp);
                            //legend
                            tmp_bar_op.legend.data[i] = this_series[i].name;
                        }
                        //xAxis
                        tmp_bar_op.xAxis[0].data = this.get("xAxis")[0].data;
                        return tmp_bar_op;
                        break;

                    case "pie":
                        //标题
                        tmp_pie_op.title.text = this.get("title").text;
                        tmp_pie_op.title.subtext = this.get("title").subtext;
                        //series
                        var this_series = this.get("series_pie");
                        tmp_pie_op.series[0].type = this.get("type");
                        tmp_pie_op.series[0].name = this_series[0].name;
                        tmp_pie_op.series[0].data = this_series[0].data;
                        //legend
                        for(var x in this_series[0].data){
                            tmp_pie_op.legend.data[x] = this_series[0].data[x].name;
                        }
                        return tmp_pie_op;
                        break;
                }
            }
        });*/
        //组件-EChart
        /*var EChart_widget = function(widgetKey,eChart_type) {
            var EChart_view = Backbone.View.extend({
                className:"widget",
                attributes:{
                    widget_key:widgetKey
                },
                template:tpl['echart'],
                initialize:function(){
                    this.html = this.template();
                    this.$el.html(this.html);
                    this.echart = this.echart_init(this.el);
                    this.model.on("change",this.render,this)
                },
                render:function(eventName){
                    this.echart.resize();
                    this.echart.setOption(this.model.toOption(eChart_type),true);
                    return this;
                },
                echart_init: function (el) {
                    return ec.init(el.firstChild,'macarons');
                }
            });
            var M = new EChart_model();
            var V = new EChart_view({
                model: M
            });
            //刷新EChart显示，必须在节点渲染在页面上后进行调用
            var refresh = function () {
                V.render();
            };

            var getEl = function(){
                return V.$el;
            };

            var getEChart = function () {
                return V.echart;
            };

            var setOption = function (url,cfunc) {
                V.echart.showLoading({
                    text:"正在拼命读取中...",
                    effect:"whirling"
                });
                $.ajax(
                    {
                        type: "post",
                        url: url,
                        dataType: "json",
                        success: function(data){
                            setTimeout(function () {
                                //解析获取的数据
                                M.set({
                                    "title":data.title,
                                    "series_pie":data.series_pie,
                                    "xAxis":data.xAxis,
                                    "series_bar":data.series_bar,
                                    "other":data.other
                                });
                                V.echart.hideLoading();
                                if(cfunc){
                                    cfunc();
                                }
                            },2000);
                        },
                        error: function () {
                            alert("载入失败");
                            V.echart.hideLoading();
                        }
                    }
                )
            };
            //初始化组件：在将组件el放到页面节点中，调用一次函数，进行初始化，包括渲染和初始数据加载
            var init = function () {
                refresh();
                setOption("js/json/echart_data.json", function () {
                    //todo 加载完毕后
                })
            };

            return{
                getEl:getEl,
                refresh:refresh,
                init:init,
                setOption:setOption
            }
        };*/
        var EChart_widget = Class.Create({
            M : Backbone.Model.extend({
                defaults:{
                    "type":"pie",
                    "title" : {
                        "text": "标题1",
                        "subtext": "副标题1"
                    },
                    "series_pie":[
                        {
                            "name":"饼图的名称",
                            "data":[
                                {"value":335, "name":"一"},
                                {"value":310, "name":"二"},
                                {"value":234, "name":"三"},
                                {"value":135, "name":"四"},
                                {"value":1548, "name":"五"}
                            ]
                        }
                    ],
                    "xAxis" : [
                        {
                            "data" : ["周一","周二","周三","周四","周五","周六","周日"]
                        }
                    ],
                    "series_bar":[
                        {
                            "name":"一",
                            "data":[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            "name":"二",
                            "data":[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            "name":"三",
                            "data":[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            "name":"四",
                            "data":[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            "name":"五",
                            "data":[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ],
                    "other":{}
                },
                //输出echart配置信息
                toOption: function (type) {
                    //柱状图的op模版
                    var tmp_bar_op = {
                        "title" : {
                            "text": "标题",
                            "subtext": "副标题"
                        },
                        "tooltip": {
                            show: true
                        },
                        toolbox: {
                            orient:'vertical',
                            show : true,
                            feature : {
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        legend: {
                            "data" : ["类一","类二","类三","类四","类五"]
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","毛衣"]
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                "name":"类一",
                                "type":"bar",
                                "data":[5, 20, 40, 10, 10, 20]
                            }
                        ]
                    };
                    //饼图的op模版
                    var tmp_pie_op = {
                        "title" : {
                            "text": "标题",
                            "subtext": "副标题",
                            "x":"center"
                        },
                        "tooltip": {
                            show: true
                        },
                        "legend": {
                            orient : "vertical",
                            x:"left",
                            "data" : ["类一","类二","类三","类四","类五"]
                        },
                        "series":[
                            {
                                "name":"饼图的名称",
                                "type":"pie",
                                "radius" : "55%",
                                //"center": ["50%", 225],
                                "data":[
                                    {"value":335, "name":"类一"},
                                    {"value":310, "name":"类二"},
                                    {"value":234, "name":"类三"},
                                    {"value":135, "name":"类四"},
                                    {"value":1548, "name":"类五"}
                                ]
                            }
                        ]
                    };

                    switch(this.get("type")){
                        case "bar":
                            //标题
                            tmp_bar_op.title.text = this.get("title").text;
                            tmp_bar_op.title.subtext = this.get("title").subtext;
                            //series
                            var this_series = this.get("series_bar");
                            var model = tmp_bar_op.series[0];
                            tmp_bar_op.series = [];
                            for(var i in this_series){
                                //series
                                var tmp = new Object();
                                for(var j in model){
                                    tmp[j] = model[j];
                                }
                                tmp.type = this.get("type");
                                tmp.name = this_series[i].name;
                                tmp.data = this_series[i].data;
                                tmp_bar_op.series.push(tmp);
                                //legend
                                tmp_bar_op.legend.data[i] = this_series[i].name;
                            }
                            //xAxis
                            tmp_bar_op.xAxis[0].data = this.get("xAxis")[0].data;
                            return tmp_bar_op;
                            break;

                        case "pie":
                            //标题
                            tmp_pie_op.title.text = this.get("title").text;
                            tmp_pie_op.title.subtext = this.get("title").subtext;
                            //series
                            var this_series = this.get("series_pie");
                            tmp_pie_op.series[0].type = this.get("type");
                            tmp_pie_op.series[0].name = this_series[0].name;
                            tmp_pie_op.series[0].data = this_series[0].data;
                            //legend
                            for(var x in this_series[0].data){
                                tmp_pie_op.legend.data[x] = this_series[0].data[x].name;
                            }
                            return tmp_pie_op;
                            break;
                    }
                }
            }),
            V : Backbone.View.extend({
                className:"widget",
                attributes:{
                    widget_key: function () {
                        return Class.that.k
                    }
                },
                type: function () {
                    return Class.that.a
                },
                template:tpl['echart'],
                initialize:function(){
                    this.html = this.template();
                    this.$el.html(this.html);
                    this.echart = this.echart_init(this.el);
                    this.model.on("change",this.render,this)
                },
                render:function(eventName){
                    this.echart.resize();
                    this.echart.setOption(this.model.toOption(this.type()),true);
                    return this;
                },
                echart_init: function (el) {
                    return ec.init(el.firstChild,'macarons');
                }
            })
            },artlist.Artlist,{
            setOption : function (url,cfunc) {
                var that = this;
                that.v.echart.showLoading({
                    text:"正在拼命读取中...",
                    effect:"whirling"
                });
                $.ajax(
                    {
                        type: "post",
                        url: url,
                        dataType: "json",
                        success: function(data){
                            setTimeout(function () {
                                //解析获取的数据
                                that.m.set({
                                    "type":data.type,
                                    "title":data.title,
                                    "series_pie":data.series_pie,
                                    "xAxis":data.xAxis,
                                    "series_bar":data.series_bar,
                                    "other":data.other
                                });

                                that.v.echart.hideLoading();
                                if(cfunc){
                                    cfunc();
                                }
                            },2000);
                        },
                        error: function () {
                            alert("载入失败");
                            that.v.echart.hideLoading();
                        }
                    }
                )
            },
    //初始化组件：在将组件el放到页面节点中，调用一次函数，进行初始化，包括渲染和初始数据加载
            init : function (){
                this.refresh();
                this.setOption("js/json/echart_data.json", function () {
                    //todo 加载完毕后
                })
            }
        });
        var init = function(key){
            var mod = new EChart_widget(key);
            mod.inits();
            return mod;
        };
        return{
            init:init,
            EChart_widget:EChart_widget
        };

    }
);