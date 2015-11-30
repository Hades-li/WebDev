/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore',
    'modules/animation',
    'modules/url'
], function ($,jquery_ui,Backbone,_,loadAM,URL) {

    var Query_table_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:false,
            title:"XXX",
            more:"http://XXXX.do",
            data:{
                quanguo:{
                    zoom:"全国",
                    rwzs:"10000"
                },
                others:[
                    {
                        zoom: "南京地区",
                        rwzs:"20000"
                    },
                    {
                        zoom:"上海",
                        rwzs:"30000"
                    }
                ]
            }
        },
        initialize: function () {

        },
        //读取数据
        queryData: function (callback_done,callback_err,zoom,time) {
            var that = this;
            var url = URL;
            var dataId = this.get("dataId");
                $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                data:{dataId:dataId,zoom:zoom,time:time}
            }).done(function (data) {
                    that.set("title",data["content"].title) ;
                    that.set("more",data["content"].more);
                    that.set("data",data["content"].data);
                    if(callback_done){
                        callback_done();
                    }
            }).fail(function () {
                    if(callback_err){
                        callback_err();
                    }
                })
        }
    });
    var Query_table_view = Backbone.View.extend({
        //模板
        template: _.template(["<div class=\"queryInput\">",
            "                <label for=\"input1\">工号：</label><input id=\"input1\" type=\"text\" class=\"normal-input\"/>",
            "                <label for=\"input2\" class=\"ml10\">姓名：</label><input id=\"input2\" type=\"text\" class=\"input-date\"/>",
            "                <a href=\"javascript:\" class=\"normal-btn btn-1 ml10 q-btn\">搜索</a>",
            "            </div>",
            "            <div class=\"tonglan-table \">",
            "                <table>",
            "                    <tr>",
            "                        <th>区域</th>",
            "                        <th>任务总数</th>",
            "                        <th>已完成</th>",
            "                        <th>进行中</th>",
            "                        <th>超期为报</th>",
            "                        <th>超期7天以内</th>",
            "                        <th>超期8-15天</th>",
            "                        <th>超期16-30天</th>",
            "                        <th>超期30天以上</th>",
            "                        <th>操作</th>",
            "                    </tr>",
            "                    <tr class=\"quanguo\">",
            "                        <td><%= zoom %></td>",
            "                        <td>120004</td>",
            "                        <td>8970</td>",
            "                        <td>8970</td>",
            "                        <td>8970</td>",
            "                        <td>20%</td>",
            "                        <td>9876</td>",
            "                        <td>正常</td>",
            "                        <td>2015-05-10 18:00</td>",
            "                        <td>",
            "                            9777",
            "                        </td>",
            "                    </tr>",
            "                    <%  _.each(items, function(i) { %>",
            "                    <tr>",
            "                        <td><%= i.zoom %></td>",
            "                        <td>",
            "                            <a href=\"javascript:\">1500</a>",
            "                        </td>",
            "                        <td>8970</td>",
            "                        <td>8970</td>",
            "                        <td>8970</td>",
            "                        <td>20%</td>",
            "                        <td>9876</td>",
            "                        <td>正常</td>",
            "                        <td>2015-05-10 18:00</td>",
            "                        <td>",
            "                            9777",
            "                        </td>",
            "                    </tr>",
            "                    <% }); %>",
            "                </table>",
            "            </div>"].join("")),
        className:"query-table",
        initialize: function () {
            var that = this;
            setTimeout(function () {
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),true);
                that.model.queryData(function () {
                    that.model.get("parent").render();
                    loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);
                }, function () {
                    loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                        that.queryEvent();
                    })
                });
            },0);
            this.model.on("change", this.render, this);
        },
        render: function () {
            //console.log("渲染查询表格");
            this.$el.html(this.template({
                zoom:this.model.get("data").quanguo.zoom,
                items:this.model.get("data").others
            }));
            return this;
        },
        events:{
            "click .q-btn":"queryEvent"
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
            var zoom = this.$el.find("#input1").val();
            var time = this.$el.find("#input2").val();
            var that = this;
            loadAM.loadingAnimation(this.$el.parents(".gs-w"),true);
            this.model.queryData(function () {
            loadAM.loadingAnimation(this.$el.parents(".gs-w"),false);
            }, function () {
                    loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                    that.queryEvent();
                })
            },zoom,time);
        }
    });
    //创建对象
    var create = function (dataId,parent) {
        var qt_view = new Query_table_view({
            model:new Query_table_model({
                dataId:dataId,
                parent:parent
            })
        });
        return qt_view;
    };

    return{
        create:create
    }
});