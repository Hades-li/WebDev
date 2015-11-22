/**
 * Created by ZLY on 2015/7/24.
 */
    define(function(){

        //定义基础组件的创建方法
        //var Create = function(o,obj){
        //    //创建组件子类
        //    function SubClass(o){
        //        this.age = 25;
        //        for(var prop in o){
        //            this[prop] = o[prop];
        //        }
        //        Class.call(this,name);
        //
        //    }
        //    //把超类的原型拷贝给子类
        //    inheritPrototype(SubClass,Class);
        //    //拓展子类的原型方法
        //    extend(SubClass,obj);
        //
        //    var c = new SubClass(o);
        //
        //    return c;
        //};
        var that={};
        //原型的继承
        function extend(o,p){
            for(var prop in p){
                o.prototype[prop] = p[prop];
            }
            return o;
        };

        //原型的继承
        function include(o,p){
            for(var prop in p){
                o[prop] = p[prop];
            }
            return o;
        };
        //对象构建
        function object(o){
            function F(){}
            F.prototype = o;
            return new F();
        }

        function inheritPrototype(subType,superType){
            var prototype = object(superType.prototype);
            prototype.constructor = subType;
            subType.prototype = prototype;

        }

        function Create(o,obj,ext){
            //return function(){
                function SubClass(){
                    obj.apply(this, arguments);
                    for(var prop in o){
                        this[prop] = o[prop];
                    }
                };
                //把超类的原型拷贝给子类
                inheritPrototype(SubClass,obj);
                //var pt = object(SuperClass.prototype);
                //pt.constructor = SubClass;
                //SubClass.prototype = pt;
                //拓展子类的原型方法
                extend(SubClass,ext);

                return SubClass;
           // }
        }



        /*function SuperClass(){
            this.name = 'zh';

        }
        SuperClass.prototype.sayHallo = function(){
            alert('hallo')
        };*/

        return {
            Create: Create,
            extend: extend,
            object: object,
            inheritPrototype:inheritPrototype,
            that: that
        }
    });
