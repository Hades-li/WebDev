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

    var rssh_model = Backbone.Model.extend({
        defaults:{
            title:"XXX",
            list:
                [
                    {
                        "href":"http://XXXX.do",
                        "content":"我的排班111"
                    },
                    {
                        "href":"http://XXXX.do",
                        "content":"我的排班"
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
    var rssh_view = Backbone.View.extend({
        //模板
        template:null,
        className:"",
        initialize: function () {
            var that = this;
            this.template = tpl["hr-life"];

            this.loadData("js/json/rssh.json").done(function (data) {
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
            //改变颜色
            var color = ['#00c3e7','#00cd6f','#00d0d6','#ffb335','#f8796b','#8ccb42','#f78c3d','#6d94e3'];
            function randomVal(val){
                return Math.floor(Math.random()*8);
            }
            $(".hr-life ul a:not('.add')").each(function(i){
                $(this).css({
                    'background':  color[randomVal()]
                })
            });
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
        var qt_view = new rssh_view({
            model:new rssh_model({
                parent:parent
            })
        });
        return qt_view;
    };


    return{
        create:create
    }
});