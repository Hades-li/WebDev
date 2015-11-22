/**
 * Created by h.jiali2 on 2015/8/3.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'template-loader',
    'modules/animation',
    'echarts' ,
    '../class'
], function ($,jquery_ui,Backbone,tpl,am,ec,Class) {
        //var that;
 function Base(widgetKey) {

            //this.k = arguments[0];
            //this.a = arguments[1];
            Class.that.a = arguments[1];
            Class.that.k = arguments[0];
            /*var len = arguments.length;
            for(var i =0;i<len;i++){
                Class.that.k[i]=arguments[i]
                for(var prop in arguments){
                    Class.that[prop] = arguments[i];
                }
            }*/
     //model
            this.M = Backbone.Model.extend({
                defaults:
                    [
                        {"context":"假数据1", "time":"2018-09-05"},
                        {"context":"假数据2", "time":"2018-09-06"},
                        {"context":"假数据3", "time":"2018-09-07"},
                        {"context":"假数据4", "time":"2018-09-08"}
                    ]
            });
            /*this.V = Backbone.View.extend({
                className:"widget",
                attributes:{
                    widget_key:Class.that.k
                },
                title:"标题",
                initialize:function(){
                    this.template = tpl['articleList'];
                    this.model.on("change",this.render,this);
                },
                render: function(eventName){
                    this.html = this.template({
                        title: this.title,
                        items: this.model.toJSON()
                    });
                    this.$el.html(this.html);
                    return this;
                }
            });*/
            //this.inits();
        };
        Base.prototype.inits = function () {
            this.m = new this.M();
            this.v = new this.V({model:this.m});
        };
        return Base;
    }
);