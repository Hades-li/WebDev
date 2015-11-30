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

    var usualSys_model = Backbone.Model.extend({
        defaults:{
            title:"XXX",
            list: [],
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
            setTimeout(function () {
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),true);
                that.loadData(URL,that.model.get("dataId")).done(function (data) {
                    that.model.set("list",data["list"]) ;
                    that.model.set("title",data["title"]);
                    that.model.get("parent").render();
                    loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);
                }).fail(function () {
                        loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                        that.queryEvent();
                    })
                });
            },0);
            this.model.on("change", this.render,this);
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
        var qt_view = new usualSys_view({
            model:new usualSys_model({
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