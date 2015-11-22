/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore'
], function ($,jquery_ui,Backbone) {

    var Dbrw_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:true,
            "title": "XXX",
            "more": "http://www.google.com",
            "list": [
            ]
        },
        initialize: function () {

        },
        //读取数据
        queryData: function (callback,zoom,time) {
            var that = this;
            var url ="js/json/daibanrenwu.json";
            var dataId = this.get("dataId");
                $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                data:{dataId:dataId,zoom:zoom,time:time}
            }).done(function (data) {
                that.set("title",data["title"]) ;
                that.set("more",data["more"]);
                that.set("list",data["list"]);
                if(that.get("list").length == 0){
                    that.set("hasTask",false);
                }
                if(callback){
                    callback();
                }
            })
        }
    });
    var Dbrw_view = Backbone.View.extend({
        //模板
        template: _.template(
            [
                "<div class=\"ul-wrap\">",
                "                <ul>",
                "                    <%  _.each(list, function(i) { %>",
                "                    <li class=\"clearfix\">",
                "                        <p class=\"context\">",
                "                            <em></em>",
                "                            <span class=\"cw\"><%= i.category %></span>",
                "                            <span class=\"ys\"><%= i.type %></span>",
                "                            <a href=\"<%= i.href %>\"><%= i.title %></a>",
                "                        </p>",
                "                        <p class=\"quantity\">",
                "                            <i class=\"man mr10\"><%= i.owner %></i>",
                "                            <i class=\"date mr10\" ><%= i.date %></i>",
                "                            <i class=\"time\"><%= i.time %></i>",
                "                        </p>",
                "                    </li>",
                "                    <% }); %>",
                "                </ul>",
                "            </div>"
            ].join("")
        ),
        className:"daydayup",
        initialize: function () {
            var that = this;
            this.model.queryData(function () {
                that.model.get("parent").render();
            });
            this.model.on("change", this.render, this);
        },
        render: function () {
            console.log("渲染待办任务");
            this.$el.html(this.template({
                list:this.model.get("list")
            }));
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
        getHasTask: function () {
           return this.model.get("hasTask");
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
        var view = new Dbrw_view({
            model:new Dbrw_model({
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