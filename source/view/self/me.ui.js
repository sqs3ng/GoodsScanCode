/**
 * related to me.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-12
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");
var do_SQLite = mm("do_SQLite");
var do_Notification = sm("do_Notification");
var style = require("do/style");
var do_Button_sale = ui("do_Button_sale");
var do_Button_stock = ui("do_Button_stock");
var do_Button_buy = ui("do_Button_buy");
var do_Button_updata = ui("do_Button_updata");
var do_ALayout_photo = ui("do_ALayout_photo");
var do_ImageView_photo = ui("do_ImageView_photo");
var do_Label_buycarcount = ui("do_Label_buycarcount");
var do_Label_buycount = ui("do_Label_buycount");
var do_Label_upcount = ui("do_Label_upcount");
var do_Album=sm("do_Album");
var do_Camera=sm("do_Camera");
var do_DataCache=sm("do_DataCache");

style.css(do_Button_sale, {
	parent : "dynamicButton"
})

style.css(do_Button_stock, {
	parent : "dynamicButton"
})

style.css(do_Button_buy, {
	parent : "dynamicButton"
})

style.css(do_Button_updata, {
	parent : "dynamicButton"
})

style.css(do_ALayout_photo, {
	parent : "dynamicButton"
})

//加载头像
do_Page.on("refreshPhoto",function(){
	if (do_DataCache.hasData("photo")) {
		do_ImageView_photo.source=do_DataCache.loadData("photo");
	}
});
do_Page.fire("refreshPhoto");

//销售记录
do_Button_sale.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/self/salelog.ui",
		statusBarState : "transparent",
		animationType : "fade"
	});
});

//盘点清单
do_Button_stock.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/self/check.ui",
		statusBarState : "transparent",
		animationType : "fade"
	});
});

//打开左侧UI，查看个人信息
do_ALayout_photo.on("touch", "", 2000, function() {
	do_Page.fire("openleft");
});

//显示购物车中的数量、订单数量/已上传数量
do_Page.on("refreshBuyNum",function(){
	do_SQLite.open("data://jyh_client.db");
	var phone=do_Global.getMemory("phone");
	
	//购物车数量
	var sql = "select count(*) as num from buycar where phone='" + phone + "'";
	var data=do_SQLite.querySync(sql);
	
	do_Label_buycarcount.text="0";
	if (data.length>0) {
		do_Label_buycarcount.text=data[0].num;
	}

	//订单数量
	sql = "select count(*) as num from (select distinct datetime from Buy where phone='" + phone + "')";
	data=do_SQLite.querySync(sql);
	
	do_Label_buycount.text="0";
	do_Label_buycount.tag=0;
	if (data.length>0) {
		do_Label_buycount.text=data[0].num;
		do_Label_buycount.tag=data[0].num;
	}

	//未上传的订单数量
	sql = "select count(*) as num from (select datetime from buy where phone='" + phone + "' group by datetime having min(isup)=0)";
	data=do_SQLite.querySync(sql);
	
	do_Label_upcount.text="0";
	do_Label_upcount.tag=0;
	if (data.length>0) {
		do_Label_upcount.text=data[0].num;
		do_Label_upcount.tag=data[0].num;
	}
	do_SQLite.close();
	
	if (do_Label_upcount.tag==0) {
		do_Button_updata.bgColor="008080FF";
	}else {
		do_Button_updata.bgColor="FF0000FF";
	}
})
do_Page.fire("refreshBuyNum");

//进入购物车
do_Button_buy.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/self/buycar.ui",
		statusBarState : "transparent",
		animationType : "fade"
	});
});

//上层Page关闭时的事件
do_Page.on("result", function(data) {
	if (data == null || data.length <= 0)
		return;
	var _data=data.split(",");
	for (var i = 0; i < _data.length; i++) {
		do_Page.fire(_data[i]);
	}
});
