/**
 * Created by h.jiali2 on 2015/8/4.
 */
define([
        'drop',
        'jquery',
        'upload'
    ],
    function (drop) {
        var uploadfile = function () {
            var module = undefined;
            //调用弹窗
            $("#imgModal").on("show.bs.modal", function (e) {
                module = $(e.relatedTarget).parents(".module");
            });
            /*$("#imgModal").on("hidden.bs.modal", function (e) {

            });*/

            $("#imgModal").on("click",".upload-confirm", function () {
                if(module != undefined){
                    var widget = drop.getWidget(module);
                    widget.setData("js/json/img.json",function () {
                        //todo
                    })
                }
            });
            //图片上传/查看
            $("#fileupload").fileupload({
                dataType:'json',
                url:"js/json/img.json",
                done: function (e,data) {
                    //$('#files').children().remove();
                    $.each(data.files, function (index, file) {
                        var dom = $('\
                    <li>\
                        <a href="javascript:" class="thumbnail">\
                            <img width="64" height="64" src="" alt="一张图片"/>\
                        </a>\
                    </li>');
                        //dom.find("a").attr("href","images/imgs/"+file.name);
                        dom.find("img").attr("alt",file.name).attr("src","images/imgs/"+file.name);
                        $('#files').append(dom);
                    });
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );
                }
            });
            //图片选中
            $("#imgModal").on("click",".files a",function () {
                if($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                }else{
                    $(this).addClass("selected");
                }
            })
        };

        return {
            uploadfile:uploadfile
        };
});