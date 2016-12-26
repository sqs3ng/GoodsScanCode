//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App=sm("do_App");
var style = require("do/style");
// 声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_b0=ui("do_ALayout_b0");
var do_ALayout_b1=ui("do_ALayout_b1");
var do_ALayout_b2=ui("do_ALayout_b2");
var do_ALayout_b3=ui("do_ALayout_b3");
var do_ImageView_b0=ui("do_ImageView_b0");
var do_ImageView_b1=ui("do_ImageView_b1");
var do_ImageView_b2=ui("do_ImageView_b2");
var do_ImageView_b3=ui("do_ImageView_b3");
var do_Label_b0=ui("do_Label_b0");
var do_Label_b1=ui("do_Label_b1");
var do_Label_b2=ui("do_Label_b2");
var do_Label_b3=ui("do_Label_b3");
var do_ViewShower_main=ui("do_ViewShower_main");

//添加header
var addhead = do_ALayout_root.add("top", "source://view/top1.ui");
var header = ui(addhead);
var do_HashData_top = mm("do_HashData");
header.bindData(do_HashData_top);
do_HashData_top.addData({
	"showback" : false,
	"title" : "商品扫描员工端"
});
header.refreshData();

style.css(do_ALayout_b2, {
	parent : "dynamicButton"
})
style.css(do_ALayout_b3, {
	parent : "dynamicButton"
})

// 绑定ViewShower的3个页面
var viewShower_data=[
                     {
                    	 "id":"goods",
                    	 "path":"source://view/news/main.ui"
                     },
                     {
                    	 "id":"self",
                    	 "path":"source://view/self/main.ui"
                     },
                     {
                    	 "id":"sale",
                    	 "path":"source://view/sale/main.ui"
                     }
                     ];
do_ViewShower_main.addViews(viewShower_data);
do_ViewShower_main.showView("goods");

// 定义每个按钮的touch事件
do_ALayout_b0.on("touch", "", 2000, function(){
	do_ImageView_b0.source = "source://image/s0.png";
	do_ImageView_b1.source = "source://image/d1.png";
	do_ImageView_b2.source = "source://image/d2.png";
	do_ImageView_b3.source = "source://image/d3.png";
	do_Label_b0.fontColor = "008C00FF";
	do_Label_b1.fontColor = "000000FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "000000FF";
	do_ViewShower_main.showView("goods");
});
do_ALayout_b1.on("touch", "", 2000, function(){
	do_ImageView_b0.source = "source://image/d0.png";
	do_ImageView_b1.source = "source://image/s1.png";
	do_ImageView_b2.source = "source://image/d2.png";
	do_ImageView_b3.source = "source://image/d3.png";
	do_Label_b0.fontColor = "000000FF";
	do_Label_b1.fontColor = "008C00FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "000000FF";
	do_ViewShower_main.showView("self");
});
do_ALayout_b2.on("touch", "", 2000, function(){
//	do_ImageView_b0.source = "source://image/d0.png";
//	do_ImageView_b1.source = "source://image/d1.png";
//	do_ImageView_b2.source = "source://image/s2.png";
//	do_ImageView_b3.source = "source://image/d3.png";
//	do_Label_b0.fontColor = "000000FF";
//	do_Label_b1.fontColor = "000000FF";
//	do_Label_b2.fontColor = "008C00FF";
//	do_Label_b3.fontColor = "000000FF";
//	do_ViewShower_main.showView("sale");
	do_App.openPage({
		source:"source://view/self/buycar.ui",
		statusBarState:"transparent",
		animationType:"push_r2l"
	});
});
do_ALayout_b3.on("touch", "", 2000, function(){
//	do_ImageView_b0.source = "source://image/d0.png";
//	do_ImageView_b1.source = "source://image/d1.png";
//	do_ImageView_b2.source = "source://image/d2.png";
//	do_ImageView_b3.source = "source://image/s3.png";
//	do_Label_b0.fontColor = "000000FF";
//	do_Label_b1.fontColor = "000000FF";
//	do_Label_b2.fontColor = "000000FF";
//	do_Label_b3.fontColor = "008C00FF";
	do_App.openPage({
		source:"source://view/sale/main.ui",
		statusBarState:"transparent",
		animationType:"push_r2l"
	});
});

do_ViewShower_main.on("viewChanged",function(data,e){
	if (data=="self") {
		do_Page.fire("refreshBuyNum");
	}
});

// 当前页面下，订阅android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function(){
	delay3.stop();
    canBack = false;
}); 
do_Page.off("back");
do_Page.on("back", function(){
    if (canBack) {
    	do_Global.exit();
    } else {
    	do_Notification.toast("再次点击退出应用");
        canBack = true;
        delay3.start();
    }
});
