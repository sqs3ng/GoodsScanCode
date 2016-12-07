/**
 * related to link.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-11-04
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_External = sm("do_External");
var style = require("do/style");

var do_ALayout_phone = ui("do_ALayout_phone");
var do_ALayout_email = ui("do_ALayout_email");

style.css(do_ALayout_phone, {
	parent : "dynamicButton"
})
style.css(do_ALayout_email, {
	parent : "dynamicButton"
})

// 当前页面下，订阅android系统返回键的事件
do_Page.on("back", function() {
	do_App.closePage();
});

//打电话
do_ALayout_phone.on("touch", function() {
	do_External.openDial("15806389535");
});

//发邮件
do_ALayout_email.on("touch", "", 2000, function() {
	do_External.openMail("sqs3ng@163.com", "我也想做个APP", "公司名称：\n联系方式：\n");
});

//点击退出
ui("$").on("touch", "", 2000, function() {
	do_App.closePage();
});



