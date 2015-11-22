/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore'
], function ($,jquery_ui,Backbone) {

    var Art_list_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:true,
            "title": "XXX",
            "more": "http://www.taobao.com",
            "list": [
                {
                    "date": "2015-10-28",
                    "title": "测试数据",
                    "href": "http://10.19.250.95:9080/soa-promotion-web-in/workitemAllDispatch.do?wid=3587422"
                },
                {
                    "date": "2015-10-28",
                    "title": "测试数据",
                    "href": "http://10.19.250.95:9080/soa-promotion-web-in/workitemAllDispatch.do?wid=3587407"
                },
                {
                    "date": "2015-10-28",
                    "title": "测试数据",
                    "href": "http://spessit.cnsuning.com:9080/spes-web-in/workitemAllDispatch.do?wid=3587403"
                },
                {
                    "date": "2015-10-28",
                    "title": "咨询审计费用流程",
                    "href": "http://ps7pre.cnsuning.com/ChainStoreProject/workitemAllDispatch.do?wid=289413579"
                },
                {
                    "date": "2015-10-28",
                    "title": "咨询审计费用流程",
                    "href": "http://ps7pre.cnsuning.com/ChainStoreProject/workitemAllDispatch.do?wid=289413572"
                },
                {
                    "date": "2015-10-28",
                    "title": "苏宁云商集团股份有限公司苏宁采购中心 陈文明 徐庄住宿申请",
                    "href": "http://ps7pre.cnsuning.com/XuZhuangPro/workitemAllDispatch.do?wid=289413570"
                }
            ]
        },
        initialize: function () {

        },
        //读取数据
        queryData: function (callback,zoom,time) {
            var that = this;
            var url ="js/json/daiban.json";
            var dataId = this.get("dataId");
                $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                data:{dataId:dataId,zoom:zoom,time:time}
            }).done(function (data) {
                that.set("title",data["title"]) ;
                that.set("more",data["more"]);
                that.set("list",data["list"]);
                if(that.get("list").length == 0){
                    that.set("hasTask",false);
                }
                if(callback){
                    callback();
                }
            })
        }
    });
    var Art_list_view = Backbone.View.extend({
        //模板
        template: _.template(
            [
                "<div class=\"ul-wrap\">",
                "                <ul>",
                "                    <%  _.each(list, function(i) { %>",
                "                    <li class=\"clearfix\">",
                "                        <p class=\"context\">",
                "                            <em></em>",
                "                            <a href=\"<%= i.href %>\"><%= i.title %></a>",
                "                        </p>",
                "                        <p class=\"quantity\">",
                "                            <%= i.date %>",
                "                        </p>",
                "                    </li>",
                "                    <% }); %>",
                "                </ul>",
                "            </div>"
            ].join("")
        ),
        className:"daydayup",
        initialize: function () {
            var that = this;
            this.model.queryData(function () {
                that.model.get("parent").render();
            });
            this.model.on("change", this.render, this);
        },
        render: function () {
            console.log("渲染artList");
            this.$el.html(this.template({
                list:this.model.get("list")
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
        getHasTask: function () {
           return this.model.get("hasTask");
        },
        queryEvent: function () {
            var zoom = this.$el.find("#input1").val();
            var time = this.$el.find("#input2").val();
            this.model.queryData(function () {
            },zoom,time);
        }
    });
    //创建对象
    var create = function (dataId,parent) {
        var al_view = new Art_list_view({
            model:new Art_list_model({
                dataId:dataId,
                parent:parent
            })
        });
        return al_view;
    };

    return{
        create:create
    }
});