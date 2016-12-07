/**
 * related to buycar_edit.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-11-02
 */
var do_Page = sm("do_Page");
var style = require("do/style");

var root = ui("$");
var do_Button_del = ui("do_Button_del");
style.css(do_Button_del, {
	parent : "dynamicButton"
})

root.setMapping({
	"do_Button_del.tag" : "id"
});

//删除一个商品
do_Button_del.on("touch", "", 2000, function() {
	do_Page.fire("delone",do_Button_del.tag);
});

