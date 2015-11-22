/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore',
    'echarts'
], function ($,jquery_ui,Backbone,_,ec) {

    var EChart_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:false,
            title:"XXX",
            more:"http://XXXX.do",
            select:[],
            data:{},
            option:undefined
        },
        initialize: function () {

        },
        outToOption: function (data) {
            //柱状图的op模版
            var option = {
                grid:{
                    x:"60",
                    y:"10",
                    x2:"0",
                    y2:"60",
                    borderWidth:"0"
                },
                tooltip : {
                    trigger: "axis"
                },
                xAxis:[
                    {
                        "axisLine" : {
                            "show": true,
                            "lineStyle": {
                                "color": "#d6d0c1",
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
                            formatter: function(value){
                                var str = "";
                                for(var i = 0;i < value.length; i+=3){
                                    str = str.concat(value.substr(i,3)+"\n");
                                }
                                return str;
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        "axisLine" : {
                            "show": true,
                            "lineStyle": {
                                "color": "#d6d0c1",
                                "type": "solid",
                                "width": 1
                            }
                        },
                        splitLine : {
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
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#fca56c','#6acf8b'
                                    ];
                                    if(params.dataIndex == 0){
                                        return colorList[0]
                                    }else{
                                        return colorList[1]
                                    }
                                }
                            }
                        },
                        "name":"",
                        "type":"",
                        "data":[]
                    }
                ]
            };
            $.extend(true,option,data);
            console.log(option);
            this.set("option",option);
        },
        //读取数据
        queryData: function (callback,zoom,time) {
            var that = this;
            var url ="js/json/echart_new.json";
            var dataId = this.get("dataId");
                $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                data:{dataId:dataId,zoom:zoom,time:time}
            }).done(function (data) {
                that.set("title",data["title"]) ;
                that.set("more",data["more"]);
                that.set("select",data["select"]);
                that.set("data",data["data"]);
                that.outToOption(that.get("data"));
                if(callback){
                    callback();
                }
            })
        }
    });
    var EChart_view = Backbone.View.extend({
        //模板
        template: _.template(
            [
                "<div class=\"queryInput ec clearfix\">",
                "                <label class='fl'>科目选择：</label>",
                "                <div class=\"moni-select low-select fl\">",
                "                    <button class=\"sel-button\"></button>",
                "                    <ul>",
                "                        <% _.each(li,function(i,index){ %>",
                "                        <li class=\"\"><%= i %></li>",
                "                        <% }); %>",
                "                    </ul>",
                "                </div>",
                "                <label class=\"ml10 fl\">日期：</label><input type=\"text\" class=\"input-date fl\"/>",
                "                <a href=\"javascript:\" class=\"normal-btn btn-1 q-btn ml10\">查询</a>",
                "            </div>",
                "            <div class=\"echart-wrap\" style='height:260px'>",
                "            </div>"
            ].join("")
        ),
        className:"bar-x",
        ec:undefined,
        ecDom:undefined,
        initialize: function () {
            var that = this;
            //异步加载
            this.model.queryData(function () {
                setTimeout(function () {
                    that.$el.html(that.template({
                        li:that.model.get("select"),//载入sel初始值
                        zoom:that.model.get("data")//载入echart数据
                    }));
                    //初始化ec
                    that.ec = ec.init(that.$el.find(".echart-wrap")[0]);
                    that.ecDom = that.$el.find(".echart-wrap");
                    that.ec.setOption(that.model.get("option"),true);

                    //====
                    that.model.get("parent").render();
                    that.render();
                },1000);
            });
            this.model.on("change", this.render, this);

        },
        render: function () {
            console.log("渲染echar");
            this.$el.html(this.template({
                li:this.model.get("select"),//载入sel初始值
                zoom:this.model.get("data")//载入echart数据
            }));
            this.$el.find(".echart-wrap").replaceWith(this.ecDom);
            if(this.ec != undefined){
                this.ec.refresh();
            }
            return this;
        },
        events:{
            "click .q-btn":"queryEvent"
        },
        refresh: function () {
            this.render();
        },
        getEl: function () {
            return this.$el;
        },
        getTitle: function () {
            return this.model.get("title");
        },
        getMore: function () {
            return this.model.get("more");
        },
        queryEvent: function () {
            var zoom = this.$el.find("#input1").val();
            var time = this.$el.find("#input2").val();
            this.model.queryData(function () {

            },zoom,time);
        }
    });
    //创建对象
    var create = function (dataId,parent) {
        var view = new EChart_view({
            model:new EChart_model({
                dataId:dataId,
                parent:parent
            })
        });
        return view;
    };

    return{
        create:create
    }
});