/**
 * related to salelog.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-19
 */

var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");
var do_Notification = sm("do_Notification");
var style = require("do/style");
var do_SQLite = mm("do_SQLite");

var do_SlideListView_lists = ui("do_SlideListView_lists");
var do_ALayout_root = ui("do_ALayout_root");
var do_Button_clearall = ui("do_Button_clearall");
var do_Label_sumprice = ui("do_Label_sumprice");
var do_Label_buy = ui("do_Label_buy");
var do_ALayout_buy = ui("do_ALayout_buy");
var do_ListData=mm("do_ListData");

style.css(do_Button_clearall, {
	parent : "dynamicButton"
})

style.css(do_ALayout_buy, {
	parent : "dynamicButton"
})

var phone=do_Global.getMemory("phone");

//添加header
var addhead = do_ALayout_root.add("top", "source://view/top1.ui");
var header = ui(addhead);
var do_HashData_top = mm("do_HashData");
header.bindData(do_HashData_top);
do_HashData_top.addData({
	"showback" : true,
	"title" : "购物车",
	"closefire":"refreshBuyCar,refreshBuyNum"
});
header.refreshData();

do_SlideListView_lists.bindItems(do_ListData);


//页面装载完成后，开始初始化工作
do_Page.on("refreshBuyCar", function() {
	do_SQLite.open("data://jyh_client.db");
	var sql = "select 0 as template,1 as rightTemplate,a.BarCodeID,b.name,a.price,b.pic,a.num,a.id from buycar a left outer join product b on a.BarCodeID=b.BarCodeID where a.phone='" + phone + "'";
	var data=do_SQLite.querySync(sql);
	var sql = "select sum(price*num) as sumprices,count(*) as count from buycar where phone='" + phone + "'";
	var sumbuy=do_SQLite.querySync(sql);
	do_SQLite.close();
	do_Label_sumprice.text="合计："+(sumbuy[0].sumprices==null?0:sumbuy[0].sumprices)+" 元";
	do_Label_buy.text="去结算("+ sumbuy[0].count + ")";
	do_Label_buy.tag=sumbuy[0].count;
	
	do_ListData.removeAll();
	do_SlideListView_lists.refreshItems();
	if (data.length>0) {
		var listdata=[];
		for (var i = 0; i < data.length; i++) {
			listdata.push(data[i]);
		}
		do_ListData.addData(listdata);
		do_SlideListView_lists.refreshItems();
	}
});
do_Page.fire("refreshBuyCar");

// 滚到顶端
var canTop = false;
var delay1 = mm("do_Timer");
delay1.delay = 1000;
delay1.on("tick", function() {
	delay1.stop();
	canTop = false;
});

var do_ALayout_title=ui(addhead+".do_ALayout_title")
do_ALayout_title.on("touch",function() {
	if (canTop) {
		do_SlideListView_lists.scrollToPosition(0, true);
	} else {
		canTop = true;
		delay1.start();
	}
});

//清空购物车
do_Button_clearall.on("touch", "", 2000, function() {
	do_SQLite.open("data://jyh_client.db");
	var sql = "delete from buycar where phone='" + phone + "'";
	var data=do_SQLite.querySync(sql);
	do_SQLite.close();
	do_Page.fire("refreshBuyCar");
	sm("do_Notification").toast("购物车已清空");
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

//去掉一个商品
do_Page.on("delone", function(data) {
	do_SQLite.open("data://jyh_client.db");
	var sql = "delete from buycar where phone='" + phone + "' and id=" + data;
	var data=do_SQLite.querySync(sql);
	do_SQLite.close();
	do_Page.fire("refreshBuyCar");
});

//去结算
do_ALayout_buy.on("touch", "", 2000, function() {
	if (do_Label_buy.tag<=0) {
		sm("do_Notification").toast("购物车为空");
		return;
	}
	do_App.closePage();
	do_App.openPage({
		source : "source://view/self/buy.ui",
		statusBarState : "transparent",
		animationType : "fade"
	});
	
});

