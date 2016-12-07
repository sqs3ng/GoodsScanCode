/**
 * related to newsTypeGridTemplate.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-29
 */
var style = require("do/style");
var do_Page=sm("do_Page");
var root=ui("$");
var do_Label_title=ui("do_Label_title");
var do_ALayout_root=ui("do_ALayout_root");

style.css(do_ALayout_root, {
	parent : "dynamicButton"
})

root.setMapping({
	"do_Label_title.text":"name",
	"do_Label_title.tag":"selected"
});

root.on("dataRefreshed",function(data){
	var _selected=do_Label_title.tag;
	if (_selected=="1") {
		do_Label_title.fontColor="ff6666ff";
	}
	else {
		do_Label_title.fontColor="333333FF";
	}
});

//当按下一个cell，在当前页面中发出selectOneTab事件
do_ALayout_root.on("touch", "", 2000,function(data){
	do_Page.fire("selectOneTab", {name:do_Label_title.text});
});