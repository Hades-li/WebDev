/**
 * 学习成长
 */
define([
        'jquery',
        'backbone',
        'template-loader',
        'modules/animation',
        '../class',
        'modules/mod_base'
    ], function ($,Backbone,tpl,am,Class,Base) {
        var Daydayup = Class.Create(
            {
                M : Backbone.Model.extend({}),
                V : Backbone.View.extend({
                    className:"widget",
                    attributes: {
                        widget_key: function () {
                            return Class.that.k
                        }
                    },
                    initialize: function () {
                        this.template = tpl['daydayup'];
                        this.model.on("change", this.render, this);
                    },
                    render: function (eventName) {
                        this.html = this.template({
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