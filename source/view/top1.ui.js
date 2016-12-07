/**
 * related to top1.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-20
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");

var do_ALayout_back = ui("do_ALayout_back");
var do_ALayout_opt = ui("do_ALayout_opt");
var do_Label_title = ui("do_Label_title");

var root = ui("$");
root.setMapping({
	"do_ALayout_back.visible":"showback",
	"do_Label_title.text":"title",
	"do_Label_title.tag":"closefire",
	"do_ALayout_opt.visible":"canscan"
});

//关闭当前页面
do_ALayout_back.on("touch", function() {
	do_App.closePage(do_Label_title.tag);
});

// 当前页面下，订阅android系统返回键的事件
do_Page.on("back", function() {
	do_App.closePage(do_Label_title.tag);
});


//扫码
do_ALayout_opt.on("touch", "", 2000, function() {
	do_App.openPage({
		source:"source://view/self/scanBarcode.ui",
		statusBarState:"transparent",
		animationType:"fade"
	});
});