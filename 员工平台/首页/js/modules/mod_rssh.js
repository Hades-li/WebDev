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
    'template-loader',
    'modules/animation',
    'modules/url'
], function ($,jquery_ui, Backbone, _, tpl,loadAM,URL) {

    var rssh_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            title:"XXX",
            list:[],
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
            setTimeout(function () {
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),true);
                that.loadData(URL,that.model.get("dataId")).done(function (data) {
                    that.model.set("list",data["list"]) ;
                    that.model.set("title",data["title"]) ;
                    that.model.get("parent").render();
                    loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);
                }).fail(function () {
                        loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                        that.queryEvent();
                    })
                });
            },0);
            this.model.on("change", this.render, this);
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
        queryEvent: function () {
            var that = this;
            loadAM.loadingAnimation(that.$el.parents(".gs-w"),true);
            that.loadData(URL,that.model.get("dataId")).done(function (data) {
                that.model.set("list",data["list"]) ;
                that.model.set("title",data["title"]) ;
                that.model.get("parent").render();
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);
            }).fail(function () {
                loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                    that.queryEvent();
                })
            });
        },
        loadData:function (url,dataId) {
            return $.ajax({
                type: "post",
                url: url,
                data:{dataId:dataId},
                dataType: "json"
            });
        }
    });
    //创建对象
    var create = function (dataId,parent) {
        var qt_view = new rssh_view({
            model:new rssh_model({
                parent:parent,
                dataId:dataId
            })
        });
        return qt_view;
    };


    return{
        create:create
    }
});