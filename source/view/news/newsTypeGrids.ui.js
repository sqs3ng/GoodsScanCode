/**
 * related to newsTypeGrids.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-29
 */
//引用组件
var do_App=sm("do_App");
var do_Page=sm("do_Page");

//声明UI变量
var root=ui("$");
var do_GridView_Types=ui("do_GridView_Types");
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_Types=ui("do_ALayout_Types");
var typelistdata;

//初始隐藏
do_ALayout_root.visible=false;

//计算内容区域的高度
var totalHeight=parseInt(do_ALayout_Types.height);

//定义展示UI的动画
var animShow =mm("do_Animator");
for (var i = 0; i <= 15; i++) {
	animShow.append(15, {"height":parseInt(totalHeight/15*i)});
}
//定义收起UI的动画
var animHide =mm("do_Animator");
for (var i = 0; i <= 15; i++) {
	animHide.append(15, {"height":totalHeight-parseInt(totalHeight/15*i)});
}

//在当前页面下订阅RefreshNewsTypes自定义消息
do_Page.on("RefreshNewsTypes",function(data){
	if (typelistdata!=data) {
		typelistdata=data;
		do_GridView_Types.bindItems(typelistdata);
		return;	//下次显示时再刷新
	}
	do_GridView_Types.refreshItems();
});

//在当前页面下订阅ShowAllNewsTypes自定义消息
do_Page.on("ShowAllNewsTypes",function(){
	if (!do_ALayout_root.visible) {
		do_ALayout_Types.height=0;
		do_ALayout_Types.redraw();
		do_ALayout_root.visible=true;
		do_ALayout_Types.animate(animShow);
	}
});

//在当前页面下订阅selectOneTab自定义消息
do_Page.on("selectOneTab",function(){
	if (do_ALayout_root.visible) {
		do_ALayout_root.visible=false;
	}
});

//点击其它区域，则隐藏关闭当前View
do_ALayout_root.on("touch", "", 2000,function(){
	do_ALayout_Types.animate(animHide, function() {
		do_ALayout_root.visible=false;
	})
});