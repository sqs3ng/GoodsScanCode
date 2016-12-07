/**
 * related to main.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-12
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
var style = require("do/style");

var do_ALayout_root = ui("do_ALayout_root");
var do_WebView_chart = ui("do_WebView_chart");
var do_Button_bar = ui("do_Button_bar");
var do_Button_line = ui("do_Button_line");

style.css(do_Button_bar, {
	parent : "dynamicButton"
})

style.css(do_Button_line, {
	parent : "dynamicButton"
})

//添加header
var addhead = do_ALayout_root.add("top", "source://view/top1.ui");
var header = ui(addhead);
var do_HashData_top = mm("do_HashData");
header.bindData(do_HashData_top);
do_HashData_top.addData({
	"showback" : true,
	"title" : "销量报表",
	"canscan":"true"
});
header.refreshData();

do_Button_bar.on("touch", "", 2000,function(){
	do_Page.fire("refreshChar","bar");
	do_Button_bar.fontColor="FF8000FF";
	do_Button_line.fontColor="000000FF";
});

//注释
do_Button_line.on("touch", "", 2000, function() {
	do_Page.fire("refreshChar","line");
	do_Button_line.fontColor="FF8000FF";
	do_Button_bar.fontColor="000000FF";
});
