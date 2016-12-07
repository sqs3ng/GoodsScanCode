/**
 * related to newsTypeTabTemplate.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-28
 */
//引入组件库
var do_Page=sm("do_Page");

//声明UI
var root=ui("$");
var do_Alayout_root=ui("do_Alayout_root");
var do_Label_title=ui("do_Label_title");
var do_ALayout_line = ui("do_ALayout_line");

//设置数据绑定的映射关系
root.setMapping({
	"do_Label_title.text":"name",
	"do_Label_title.tag":"selected"
})

//订阅每次绑定数据后的事件
root.on("dataRefreshed",function(){
	var _selected=do_Label_title.tag;
	if (_selected=="1") {
		do_Label_title.fontColor="ff6666ff";
		//do_Label_title.fontSize=38;
		do_ALayout_line.visible=true;
	} else {
		do_Label_title.fontColor="666666FF";
		//do_Label_title.fontSize=32;
		do_ALayout_line.visible=false;
	}
});

