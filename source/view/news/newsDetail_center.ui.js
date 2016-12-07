/**
 * related to newsDetail_center.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-29
 */
//引用组件
var do_App = sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var do_ImageBrowser = sm("do_ImageBrowser");
var do_SQLite = mm("do_SQLite");
var do_Global = sm("do_Global");
var style = require("do/style");

//声明UI变量
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_detail = ui("do_ALayout_detail");
var do_SlideView_pics = ui("do_SlideView_pics");
var do_Label_title=ui("do_Label_title");
var do_TextField_price = ui("do_TextField_price");
var do_Label_price = ui("do_Label_price");
var do_ALayout_cuxiao = ui("do_ALayout_cuxiao");
var do_Label_buys = ui("do_Label_buys");
var do_Label_stock = ui("do_Label_stock");
var do_Label_describe = ui("do_Label_describe");
var do_ALayout_subtract = ui("do_ALayout_subtract");
var do_ALayout_add = ui("do_ALayout_add");
var do_Label_num = ui("do_Label_num");

style.css(do_ALayout_subtract, {
	parent : "dynamicButton"
})
style.css(do_ALayout_add, {
	parent : "dynamicButton"
})

//装载动态加载的圆圈
var circles=[];

//添加header
var addhead = do_ALayout_root.add("top", "source://view/top2.ui");
var header = ui(addhead);
var do_ListData_top = mm("do_ListData");
header.bindData(do_ListData_top);
do_ListData_top.addData([ {
	"showback" : true,
	"title" : ""
} ]);
header.refreshData();


//页面装载完成后，开始初始化工作
do_Page.on("loaded",function(){
	//读取当前页面的传入参数
	var para=do_Page.getData();
	do_Label_num.text="1";
	do_Label_title.tag=para.id;

	//查询数据
	do_SQLite.open("data://jyh_client.db");
	var sql = "select * from product where BarCodeID='" + para.id + "'";
	var data=do_SQLite.querySync(sql);
	
	if (data.length>0) {
		do_Label_title.text=data[0].name;
		do_Label_price.text = data[0].price;
		do_TextField_price.text = data[0].price;
		do_ALayout_cuxiao.visible=data[0].cuxiao=="1"?true:false;
		do_Label_buys.text = data[0].soldNum+"人已买";
		do_Label_stock.text="库存："+data[0].stockNum;
		do_Label_describe.text = data[0].describe;
		do_Page.fire("showButton");
		
	}else {
		do_Notification.toast("获取产品数据错误");
		deviceone.print(para.id,"产品条形码不存在");
		
		do_SQLite.close();
		do_App.closePage();
		return;
	}

	//获取图片
	var sql = "select 0 as template,pic from product_pic where BarCodeID='" + para.id + "'";
	var data=do_SQLite.querySync(sql);
	
	var picdata=mm("do_ListData");
	do_SlideView_pics.bindItems(picdata);
	if (data.length>0) {
		picdata.addData(data);
	}else {
		do_Notification.toast("获取图片错误");
		do_SQLite.close();
	}
	do_SQLite.close();

	do_SlideView_pics.refreshItems();

	//动态加载圆圈
	var _width=eval((do_ALayout_detail.width-picdata.getCount()*50)/2);
	for (var i = 0; i < picdata.getCount(); i++) {
		var circle=do_ALayout_detail.add("c"+i, "source://view/news/circle.ui", _width+50*i, 550)
		var c1=ui(circle+".do_ALayout_root");
		circles.push(c1);
		if (i==0) {
			c1.bgColor="FF0000FF";
		}
	}
	
});

//显示大图
do_SlideView_pics.on("touch", "", 2000, function() {
	do_SQLite.open("data://jyh_client.db");
	var sql = "select pic as init,bigpic as source from product_pic where BarCodeID='" + do_Label_title.tag + "'";
	var data=do_SQLite.querySync(sql);
	
	var images=[];
	if (data.length>0) {
		for (var i = 0; i < data.length; i++) {
			images.push(data[i]);
		}
		do_ImageBrowser.show(images, do_SlideView_pics.index);
	}else {
		do_Notification.alert("获取图片错误");
	}
	do_SQLite.close();
});

//大图返回
do_ImageBrowser.on("result",function(data){
	do_SlideView_pics.index=data.index;
});

//同步圆圈
do_SlideView_pics.on("indexChanged",function(data,e){
	for (var i = 0; i < circles.length; i++) {
		if (i==data) {
			circles[i].bgColor="FF0000FF";
		}else {
			circles[i].bgColor="FFFFFFFF";
		}
	}
});

//加入购物车
do_Page.on("buy", "", 2000, function() {
	do_SQLite.open("data://jyh_client.db");
	var phone=do_Global.getMemory("phone");
	var sql = "insert into BuyCar (phone,BarCodeID,price,num) values ('" + phone + "','"+ do_Label_title.tag + "'," + do_TextField_price.text + "," + do_Label_num.text + ")";
	do_SQLite.execute(sql,function(data){
		if (data) {
			do_SQLite.close();
			do_Notification.toast("已经添加到购物车");
			do_App.closePage("refreshBuyCar,refreshBuyNum");
		}else {
			do_Notification.toast("添加到购物车错误！");
		}
	});
});

//加入购物车后继续扫码。
do_Page.on("buyandscan", "", 2000, function() {
	do_SQLite.open("data://jyh_client.db");
	var phone=do_Global.getMemory("phone");
	var sql = "insert into BuyCar (phone,BarCodeID,price) values ('" + phone + "','"+ do_Label_title.tag + "'," + do_TextField_price.text + "," + do_Label_num.text + ")";
	do_SQLite.execute(sql,function(data){
		if (data) {
			do_SQLite.close();
			do_Notification.toast("已经添加到购物车");
			do_App.closePage("refreshBuyCar,refreshBuyNum");
			do_App.openPage({
				source : "source://view/self/scanBarcode.ui",
				statusBarState : "transparent",
				animationType : "fade"
			});
		}else {
			do_Notification.toast("添加到购物车错误！");
		}
	});
	
});

//减少购买数量
do_ALayout_subtract.on("touch", function() {
	var buynum=Number.parseInt(do_Label_num.text);
	if (buynum<1) {
		do_Label_num.text="1";
	}
	if (buynum>1) {
		do_Label_num.text=buynum-1;
	}
	do_TextField_price.text=Number.parseInt(do_Label_price.text)*Number.parseInt(do_Label_num.text);
});

//增加购买数量
do_ALayout_add.on("touch", function() {
	var buynum=Number.parseInt(do_Label_num.text);
	if (buynum<1) {
		do_Label_num.text="1";
	}
	if (buynum<99) {
		do_Label_num.text=buynum+1;
	}
	do_TextField_price.text=Number.parseInt(do_Label_price.text)*Number.parseInt(do_Label_num.text);
});