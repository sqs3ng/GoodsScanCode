/**
 * related to newsRowTemplate00.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-11
 */
var do_App = sm("do_App");

var root = ui("$");
var do_ALayout_root = ui("do_ALayout_root");
var do_ImageView_img = ui("do_ImageView_img");
var do_Label_title = ui("do_Label_title");
var do_ImageView_img2 = ui("do_ImageView_img2");
var do_Label_title2 = ui("do_Label_title2");
var do_Label_price = ui("do_Label_price");
var do_Label_price2 = ui("do_Label_price2");
var do_Label_stock = ui("do_Label_stock");
var do_Label_stock2 = ui("do_Label_stock2");
var do_ALayout_left = ui("do_ALayout_left");
var do_ALayout_right = ui("do_ALayout_right");

root.setMapping({
	"do_ImageView_img.source" : "pic",
	"do_Label_title.text" : "name",
	"do_Label_price.text":"price",
	"do_Label_stock.text":"soldNum",
	"do_ALayout_left.tag":"BarCodeID",
	"do_ImageView_img2.source" : "pic1",
	"do_Label_title2.text" : "name1",
	"do_Label_price2.text":"price1",
	"do_Label_stock2.text":"soldNum1",
	"do_ALayout_right.tag":"BarCodeID1"
});

root.on("dataRefreshed",function(){
	do_Label_stock.text+="人已买";
	do_Label_stock2.text+="人已买";
})

//点左边
do_ALayout_left.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/news/newsDetail.ui",
		animationType : "push_r2l", // 动画效果：从右向左推出
		data : JSON.stringify({
			id : do_ALayout_left.tag
		})
	// 传递页面之间的参数
	});
});

//点右边
do_ALayout_right.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/news/newsDetail.ui",
		animationType : "push_r2l", // 动画效果：从右向左推出
		data : JSON.stringify({
			id : do_ALayout_right.tag
		})
	// 传递页面之间的参数
	});
});

