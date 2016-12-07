/**
 * related to salelog_row.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-19
 */
var do_App = sm("do_App");

var root = ui("$");
var do_Label_name = ui("do_Label_name");
var do_Label_price = ui("do_Label_price");
var do_Label_time = ui("do_Label_time");
var do_ALayout_row = ui("do_ALayout_row");
var do_Label_num = ui("do_Label_num");

root.setMapping({
	"do_Label_name.text":"name",
	"do_Label_price.text":"price",
	"do_Label_num.text":"num",
	"do_Label_time.text":"time",
	"do_Label_name.tag":"BarCodeID"
});

//转到产品详细页
do_ALayout_row.on("touch", "", 2000, function() {
	do_App.openPage({
		source : "source://view/news/newsDetail.ui",
		animationType : "fade",
		data:JSON.stringify({id:do_Label_name.tag})	//传递页面之间的参数
	});
});

