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
var do_SwitchView_HorV = ui("do_SwitchView_HorV");
var do_Label_HorV = ui("do_Label_HorV");

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

//横向或竖向显示
do_SwitchView_HorV.on("changed", function(data) {
	if (data) {
		do_Page.fire("Vshow");
		do_Label_HorV.text="竖向";
	} else {
		do_Page.fire("Hshow");
		do_Label_HorV.text="横向";
	}
});


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
