/**
 * related to newDetail_buttom.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-11-01
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");

var style = require("do/style");

var do_ALayout_AddBuy = ui("do_ALayout_AddBuy");
var do_ALayout_BuyAndScan = ui("do_ALayout_BuyAndScan");

style.css(do_ALayout_AddBuy, {
	parent : "dynamicButton"
})

style.css(do_ALayout_BuyAndScan, {
	parent : "dynamicButton"
})

//加入购物车
do_ALayout_AddBuy.on("touch", "", 2000, function() {
	do_Page.fire("buy");
});

//加入购物车后继续扫码。
do_ALayout_BuyAndScan.on("touch", "", 2000, function() {
	do_Page.fire("buyandscan");
});
