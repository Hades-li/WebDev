/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore',
    'modules/animation',
    'modules/url'
], function ($,jquery_ui,Backbone,_,loadAM,URL) {

    var Dbrw_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:false,
            "title": "XXX",
            "more": "http://www.google.com",
            "list": [
            ]
        },
        initialize: function () {

        },
        //读取数据
        queryData: function (callback_done,callback_err,zoom,time) {
            var that = this;
            var url = URL;
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
                /*if(that.get("list").length == 0){
                    that.set("hasTask",false);
                }*/
                if(callback_done){
                    callback_done();
                }
            }).fail(function () {
                    if(callback_err){
                        callback_err();
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
                //"                            <span class=\"cw\"><%= i.category %></span>",
                "                            <strong class=\"ys\">[<%= i.type %>]</strong>",
                "                            <a href=\"<%= i.href %>\" target=\"_blank\" title=\"<%= i.title?i.title:'无数据' %>\"><%= i.title?i.title:'无数据' %></a>",
                "                        </p>",
                "                        <p class=\"quantity\">",
                "                            <i class=\"man mr10\">创建人：<%= i.owner %></i>",
                "                            <i class=\"date\" ><%= i.date %></i>",
                "                            <i class=\"time\"><%= i.time %></i>",
                "                        </p>",
                "                    </li>",
                "                    <% }); %>",
                "                </ul>",
                "            </div>"
            ].join("")
        ),
        className:"m-dbrw",
        initialize: function () {
            var that = this;
            setTimeout(function () {
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),true);
                that.model.queryData(function () {
                    that.model.get("parent").render();
                    loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);
                }, function () {
                    loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                        that.queryEvent();
                    })
                });
            },0);

            this.model.on("change", this.render, this);
        },
        render: function () {
            //console.log("渲染待办任务");
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
            var that = this;
            loadAM.loadingAnimation(this.$el.parents(".gs-w"),true);
            this.model.queryData(function () {
                loadAM.loadingAnimation(this.$el.parents(".gs-w"),false);
            }, function () {
                loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                    that.queryEvent();
                })
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