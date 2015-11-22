/**
 * Created by ZLY on 2015/10/27.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore',
    'template-loader'
], function ($,jquery_ui, Backbone, _, tpl) {

    var usualSys_model = Backbone.Model.extend({
        defaults:{
            title:"XXX",
            list:
                [
                    {
                        "href":"http://XXXX.do",
                        "content":"请假申请22"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"调班申请"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"考勤异常"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"外出申请"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"加班申请"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"立项申请"
                    }
                ],
            parent:null
        }
    });
    var usualSys_view = Backbone.View.extend({
        //模板
        template:null,
        className:"",
        initialize: function () {
            var that = this;
            this.template = tpl["usual-menu"];

            this.loadData("js/json/usualSys.json").done(function (data) {

            that.model.set("list",data["list"]) ;
            that.model.set("title",data["title"]) ;

            that.model.on("change", that.render, that);
            that.render();
            that.model.get("parent").render();
            });
        },
        render: function () {
			var html = this.template({
                list:this.model.get("list")
            });
            this.$el.html(html);
            return this;
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
        var qt_view = new usualSys_view({
            model:new usualSys_model({
                parent:parent
            })
        });
        return qt_view;
    };


    return{
        create:create
    }
});