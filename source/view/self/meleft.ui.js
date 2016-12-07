/**
 * related to meleft.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-12
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");
var do_External = sm("do_External");
var do_SQLite = mm("do_SQLite");
var do_Notification = sm("do_Notification");
var style = require("do/style");
var do_Label_addr = ui("do_Label_addr");
var do_Label_phone = ui("do_Label_phone");
var do_ALayout_call = ui("do_ALayout_call");
var do_ALayout_photo = ui("do_ALayout_photo");
var do_ImageView_photo = ui("do_ImageView_photo");
var do_ALayout_camera = ui("do_ALayout_camera");
var do_ALayout_quit = ui("do_ALayout_quit");
var do_ALayout_link = ui("do_ALayout_link");
var do_Album=sm("do_Album");
var do_Camera=sm("do_Camera");
var do_DataCache=sm("do_DataCache");

style.css(do_ALayout_photo, {
	parent : "dynamicButton"
})

style.css(do_ALayout_call, {
	parent : "dynamicButton"
})

style.css(do_ALayout_quit, {
	parent : "dynamicButton"
})

style.css(do_ALayout_link, {
	parent : "dynamicButton"
})

//加载头像
if (do_DataCache.hasData("photo")) {
	do_ImageView_photo.source=do_DataCache.loadData("photo");
}

//更换头像
do_ALayout_photo.on("touch", "", 2000, function() {
	do_Album.select(1, 280, 280, 100, true, function(data, e) {
		do_ImageView_photo.source=data[0];
		do_DataCache.saveData("photo", data[0]);
		do_Page.fire("refreshPhoto");
	});
});

//拍照
do_ALayout_camera.on("touch", "", 1000, function() {
	do_Camera.capture(280,280,100,true,true,function(data){
		do_ImageView_photo.source=data;
		do_DataCache.saveData("photo", data);
		do_Page.fire("refreshPhoto");
	});
});

//打电话
do_ALayout_call.on("touch", "", 2000, function() {
	do_External.openDial(do_Label_phone.text);
});


//退出登录
do_ALayout_quit.on("touch", function() {
	do_Notification.confirm("确定要重新登录吗？", "提示", "退出", "取消", function(index) {
		if (index==1) {
			do_SQLite.open("data://jyh_client.db");
			var sql = "delete from accounts";
			var data=do_SQLite.executeSync(sql);
			if (data) {
				do_SQLite.close();
				do_App.closePageToID("init","fade","login");
			}else {
				sm("do_Notification").toast("退出失败，请重试！");
			}
		}
		if (index==2) {
			return;
		}
	})
});

//打开关于
do_ALayout_link.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/link.ui",
		statusBarState : "transparent",
		animationType : "fade"
	});
});

