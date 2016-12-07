/**
 * related to selectType.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-27
 */
//声明UI变量
var do_Page=sm("do_Page");
var do_Alayout_root=ui("do_Alayout_root");
var do_Picker_types=ui("do_Picker_types");

//初始化时隐藏
do_Alayout_root.visible=false;

//点击其它区域隐藏当前view
do_Alayout_root.on("touch",function(){
	do_Alayout_root.visible=false;
});

//绑定数据
var listdata=mm("do_ListData");
listdata.addData([
                  "问题反馈",
                  "修改建议",
                  "项目合作",
                  "其它留言"
                  ]);
do_Picker_types.bindItems(listdata);
//默认选择第1条
do_Picker_types.index=0;

//类型值变化
do_Picker_types.on("selectChanged",function(index){
	//在当前页面下发送TypeChanged自定义消息
	do_Page.fire("TypeChanged",listdata.getOne(index));
});