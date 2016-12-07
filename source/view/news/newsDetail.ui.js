/**
 * related to newsDetail.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-29
 */
//引用组件
var do_Page=sm("do_Page");

//声明UI变量
var do_BorderView_1 = ui("do_BorderView_1");

//显示购物车按钮
do_Page.on("showButton",function(){
	//读取当前页面的传入参数
	do_BorderView_1.bottomView="source://view/news/newsDetail_buttom.ui";
	do_BorderView_1.redraw();
	
});


