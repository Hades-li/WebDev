/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore'
], function ($,jquery_ui,Backbone,_) {

    var Daydayup_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:false,
            "title": "XXX",
            "more": "http://XXX",
            "list": []
        },
        initialize: function () {

        },
        //读取数据
        queryData: function (callback,zoom,time) {
            var that = this;
            var url ="js/json/daydayup.json";
            var dataId = this.get("dataId");
                $.ajax({
                type: "get",
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
    var Daydayup_view = Backbone.View.extend({
        //模板
        template: _.template(
            ["            <div class=\"ul-wrap\">",
                "                <ul>",
                "                    <%  _.each(list, function(i,index) { %>",
                "                     <% if(index == 0){%>",
                "                    <li class=\"fst clearfix\">",
                "                        <img src=\"<%= i.picUrl %>\" alt=\"\" width=\"100\" height=\"70\" class=\"show-pic\"/>",
                "                        <div class='wrap'>",
                "                        <p class=\"context\">",
                "                            <strong>[<%= i.classify %>]</strong>",
                "                            <a href=\"<%= i.href %>\"><%= i.title %></a>",
                "                        </p>",
                "                        <p class=\"quantity\">",
                "                        <span>",
                "                           点击量：<em><%= i.count %></em>",
                "                        </span>",
                "<%= i.date %>",
                "                        </p>",
                "                        </div>",
                "                    </li>",
                "<%}else{ %>",
                "                    <li class=\"clearfix\">",
                "                        <p class=\"context\">",
                "                            <em></em>",
                "                            <strong>[<%= i.classify %>]</strong>",
                "                            <i class=\"flag-mark\"></i>",
                "                            <a href=\"<%= i.href %>\"><%= i.title %></a>",
                "                        </p>",
                "                        <p class=\"quantity\">",
                "                        <span>",
                "                           点击量：<em><%= i.count %></em>",
                "                        </span>",
                "                            <%= i.date %>",
                "                        </p>",
                "                    </li>",
                "<% } %>",
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
            console.log("渲染daydayup");
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
        },
        loadData:function (url) {
            return $.ajax({
                type: "post",
                url: url,
                dataType: "json"
            });
        }
    });
    //创建对象
    var create = function (dataId,parent) {
        var daydayup_view = new Daydayup_view({
            model:new Daydayup_model({
                dataId:dataId,
                parent:parent
            })
        });
        return daydayup_view;
    };

    return{
        create:create
    }
});