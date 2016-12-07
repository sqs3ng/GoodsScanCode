/**
 * related to scanBarcode.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-08
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Device = sm("do_Device");

var do_ALayout_back = ui("do_ALayout_back");
var do_ALayout_flash = ui("do_ALayout_flash");
var do_BarcodeView_scan = ui("do_BarcodeView_scan");
var do_Label_flash = ui("do_Label_flash");

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function() {
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function() {
	do_App.closePage();
});


var isOpenFlash=false;
//打开闪光灯
do_ALayout_flash.on("touch", "", 2000, function() {
	if (isOpenFlash) {
		isOpenFlash=false;
		do_BarcodeView_scan.flash("off");
		do_Label_flash.text="打开闪光灯";
	} else {
		isOpenFlash=true;
		do_BarcodeView_scan.flash("on");
		do_Label_flash.text="关闭闪光灯";
	}
});

//扫描二维码
do_BarcodeView_scan.start(function(data, e) {
	//扫描成功，执行回调
	do_Device.beep();
	do_App.closePage(data.value);
	do_App.openPage({
		source : "source://view/news/newsDetail.ui",
		animationType : "fade",
		data:JSON.stringify({id:data.value})	//传递页面之间的参数
	});
});
