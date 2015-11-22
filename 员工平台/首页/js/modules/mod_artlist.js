/**
 * Created by h.jiali2 on 2015/7/31.
 */
define([
        'jquery',
        'backbone',
        'template-loader',
        'modules/animation',
        '../class',
        'modules/mod_base'
], function ($,Backbone,tpl,am,Class,Base) {
 		var Artlist = Class.Create(
            {
                M : Backbone.Model.extend({
                defaults:
                    [
                        {"context":"假数据5", "time":"2018-09-05"},
                        {"context":"假数据6", "time":"2018-09-06"},
                        {"context":"假数据7", "time":"2018-09-07"},
                        {"context":"假数据8", "time":"2018-09-08"}
                    ]
            }),
                V : Backbone.View.extend({
                    className:"widget",
                    attributes: {
                        widget_key: function () {
                            return Class.that.k
                        }
                    },
                        title: "发文公告",
                        more:"https://www.suning.com",
                        initialize: function () {
                            console.log(tpl);
                            this.template = tpl['articleList'];
                            this.model.on("change", this.render, this);
                        },
                        render: function (eventName) {
                            this.html = this.template({
                                title: this.title,
                                items: this.model.toJSON()
                            });
                            this.$el.html(this.html);
                            return this;
                        }
                    })

            },Base,
            {
                setData: function(url,cfunc){
                    var that = this;
                    am.loadingAnimation(that.v.$el,true);
                    $.ajax(
                        {
                            type: "post",
                            url: url,
                            dataType: "json",
                            success: function(data){
                                //解析获取的数据
                                var list = data.list;
                                var target = [];
                                $(list).each(function () {
                                    target.push({
                                        "context":$(this)[0].title,
                                        "time":$(this)[0].activeTime,
                                        "href":$(this)[0].href
                                    });
                                });
                                that.m.set(target);
                                am.loadingAnimation(that.v.$el,false);
                                if(cfunc){
                                    cfunc();
                                }
                            }
                        }
                    )
                },
                refresh:function () {
                    this.v.render();
                },
                getEl : function(){
                    return this.v.$el;
                },
                getTitle: function () {
                   return this.v.title;
                },
                getMore: function () {
                    return this.v.more;
                },
                init : function () {
                    this.refresh();
                    this.setData("js/json/testset.json",function () {
                     //todo 加载完毕后

                    });
                }
            }
        );
        var init = function(key){
            var mod = new Artlist(key);
            mod.inits();
            return mod;
        };
        return{
            init:init,
            Artlist:Artlist
        };

    }


) ;