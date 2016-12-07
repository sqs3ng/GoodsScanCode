/**
 * related to top2.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-20
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");

var do_ALayout_back = ui("do_ALayout_back");
//var do_Label_title = ui("do_Label_title");

//关闭当前页面
do_ALayout_back.on("touch", function() {
	do_App.closePage();
});

// 当前页面下，订阅android系统返回键的事件
do_Page.on("back", function() {
	do_App.closePage();
});

//var root = ui("$");
//root.setMapping({
//	"do_Label_title.text":"title"	
//});

