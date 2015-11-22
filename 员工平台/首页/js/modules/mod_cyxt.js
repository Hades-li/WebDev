/**
 * Created by ZLY on 2015/10/28.
 */
/**
 * Created by ZLY on 2015/10/28.
 */
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

    var cyxt_model = Backbone.Model.extend({
        defaults:{
            title:"XXX",
            list:
                [
                    {
                        "href":"http://XXXX.do",
                        "content":"我的排班21",
                        "img":"temp/1.png"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"我的排班",
                        "img":"temp/1.png"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"考勤异常",
                        "img":"temp/1.png"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"外出申请",
                        "img":"temp/1.png"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"加班申请",
                        "img":"temp/1.png"
                    }

                ],
            parent:null
        }
    });
    var cyxt_view = Backbone.View.extend({
        //模板
        template:null,
        className:"",
        initialize: function () {
            var that = this;
            this.template = tpl["cfx-sys"];

            this.loadData("js/json/cyxt.json").done(function (data) {
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
        var qt_view = new cyxt_view({
            model:new cyxt_model({
                parent:parent
            })
        });
        return qt_view;
    };


    return{
        create:create
    }
});