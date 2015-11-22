/**
 * Created by h.jiali2 on 2015/8/4.
 */
/**
 * Created by h.jiali2 on 2015/7/31.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'template-loader',
    'modules/mod_artlist',
    'modules/animation' ,
    '../class',
], function ($,jquery_ui,Backbone,tpl,artlist,am,Class) {
    //文章模型
    /*var imgModel = Backbone.Model.extend({
        defaults:{
            imglist:[
                {"href":"images/imgs/1.gif"},
                {"href":"images/imgs/2.gif"}
            ]
        }
    });*/

    //组件-文章列表
    /*var imgList = function(widgetKey){
        //文章视图
        var imgView = Backbone.View.extend({
            className:"widget",
            attributes:{
                widget_key: widgetKey
            },
            title:"图片列表",
            initialize:function(){
                this.template = tpl['imgList'];
                this.model.on("change",this.render,this);
            },
            render: function(eventName) {
                this.html = this.template({
                    title: this.title,
                    items: this.model.toJSON().imglist
                });
                this.$el.html(this.html);
                return this;
            }
        });
        //实例化集合模型
        var M = new imgModel();
        //实例化视图
        var V = new imgView({
            model:M
        });

        var setData = function(url,cfunc){
            am.loadingAnimation(V.$el,true);
            $.ajax(
                {
                    type: "post",
                    url: url,
                    dataType: "json",
                    success: function(data){
                        //解析获取的数据
                        setTimeout(function () {
                            M.set({imglist:data.imglist});
                            am.loadingAnimation(V.$el,false);

                            if(cfunc){
                                cfunc();
                            }
                        },2000);
                    }
                }
            )
        };

        var refresh = function () {
            V.render();
        };
        var getEl = function(){
            V.render();
            return V.$el;
        };
        var init = function () {
            refresh();
            setData("js/json/img.json",function () {
                //todo 加载完毕后

            });
        };
        return{
            getEl:getEl,
            refresh:refresh,
            init:init,
            setData:setData
        }
    };*/

    var ImgList = Class.Create({
            M:Backbone.Model.extend({
                defaults:{
                    imglist:[
                        {"href":"images/imgs/1.gif"},
                        {"href":"images/imgs/2.gif"}
                    ]
                }
            }),
            V:Backbone.View.extend({
                className:"widget",
                attributes:{
                    widget_key: function () {
                        return Class.that.k
                    }
                },
                title:"图片列表",
                initialize:function(){
                    this.template = tpl['imgList'];
                    this.model.on("change",this.render,this);
                },
                render: function(eventName) {
                    this.html = this.template({
                        title: this.title,
                        items: this.model.toJSON().imglist
                    });
                    this.$el.html(this.html);
                    return this;
                }
            })
        },
        artlist.Artlist,
        {
           setData :function(url,cfunc){
               var that = this;
                am.loadingAnimation(that.v.$el,true);
                $.ajax(
                    {
                        type: "post",
                        url: url,
                        dataType: "json",
                        success: function(data){
                            //解析获取的数据
                            setTimeout(function () {
                                that.m.set({imglist:data.imglist});
                                am.loadingAnimation(that.v.$el,false);
                                if(cfunc){
                                    cfunc();
                                }
                            },2000);
                        }
                    }
                )
           },
           init:function () {
                this.refresh();
                this.setData("js/json/img.json",function () {
                    //todo 加载完毕后

                });
           }
        }
    );
    var init = function(key){
        var mod = new ImgList(key);
        mod.inits();
        return mod;
    };
    return{
        init:init,
        ImgList:ImgList
    }
});