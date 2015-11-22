/**
 * Created by muxiaoke on 15/7/28.
 */
define([
        'class',
        'modules/test'
    ],
    function(Class,test){
        function B(){
            this.name = 1;
            this.x = function(){
                console.log(this.name)  ;
            }
        }
        /*B.prototype.c = function(key){
            alert(key);
        };*/
        //组件类
        var T = Class.Create(
            {
                name:'2' ,
                s: function(){
                    console.log(this.name)
                }
            },
            B,
            {
                sayHallo1: function(){

                } ,
                s1: function(){
                    this.s();
                }
            }
        );

        var H = Class.Create(
            {},
            T,
            {
            sayHallo1:function(){
               console.log(this.name)
            }
        });
        //new H().s1();


        var t1 =  Class.Create(

            {
                m: Backbone.Model.extend({
                    defaults:{
                        price:1,
                        quantity:1
                    }
                }) ,
                v : Backbone.View.extend({
                    attributes:{
                        hah: function(){
                            return Class.that.a;
                        }
                    },
                    render : function(){
                        var html = '<label>'+this.model.get('price')+'</label>'+
                            '<label>'+this.model.get('quantity')+'</label>' +
                            Class.that.a;
                        this.$el.html(html);
                        $('body').append(this.$el);
                    }
                })
            },
            test.b,
            {


            }
        );
        return t1

    }
);