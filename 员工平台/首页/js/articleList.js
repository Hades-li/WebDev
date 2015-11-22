/**
 * Created by ZLY on 2015/6/26.
 */
define(['jquery','backbone','template-loader'],
    function($, Backbone, tpl){
        var M = Backbone.Model.extend({
        });
        var C = Backbone.Collection.extend({
            model: M
        });
        var V = Backbone.View.extend({
            initialize:function(){
                console.log(tpl);
                this.template = tpl['articleList'];
                /*this.$el.html($.tpl['items']({
                    items: this.collection.toJSON(),
                    itemTemplate: $.tpl['item']
                }));*/
            },
            render: function(eventName){
                $(this.el).html(this.template({
                    title: this.model.get('title'),
                    items: this.collection.toJSON()
                }));
                return this;
            }
        });
        return {
            M:M,
            C:C,
            V:V
        }
    }
);