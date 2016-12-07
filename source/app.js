//引入组件库
var d1=require("deviceone");
var do_App = d1.sm("do_App");
var do_InitData=d1.sm("do_InitData");
var do_Storage=d1.sm("do_Storage");

if (!do_Storage.fileExist("data://jyh_client.db")) {
	do_InitData.copyFile("initdata://jyh_client.db", "data://jyh_client.db");
}

do_App.on("loaded", function () {
	//全屏方式打开主界面
	do_App.openPage({
		source:"source://view/start.ui", 
		statusBarState:"transparent",
		animationType: "fade",
		id:"login"
			});
});