/**
 * Created by ZLY on 2015/6/26.
 */
define(['jquery','underscore'],
function($,_){
    var tpl = {};
    $('script.template').each(function(index){
            tpl[$(this).attr('id')] = _.template($.trim($(this).html()));
            $(this).remove();

        });
    return tpl;
    }
);
