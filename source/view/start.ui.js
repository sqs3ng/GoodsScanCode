/**
 * related to start.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-27
 */
//引入相关组件
var style=require("do/style");
var do_App = sm("do_App");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_SQLite = mm("do_SQLite");

//引入当前视图的相关UI
var do_Button_submit = ui("do_Button_submit");
var do_ALayout_submit = ui("do_ALayout_submit");
var do_TextField_phone = ui("do_TextField_phone");
var do_TextField_pwd = ui("do_TextField_pwd");
var do_CheckBox_remember = ui("do_CheckBox_remember");
var do_CheckBox_autologin = ui("do_CheckBox_autologin");
var do_ProgressBar_update = ui("do_ProgressBar_update");
var do_ALayout_link = ui("do_ALayout_link");

style.css(do_Button_submit,{
	parent:"dynamicButton"
});
style.css(do_ALayout_link, {
	parent : "dynamicButton"
})


// 当前页面下，订阅android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function() {
	delay3.stop();
	canBack = false;
});
do_Page.on("back", function() {
	if (canBack) {
		do_Global.exit();
	} else {
		do_Notification.toast("再次点击退出应用");
		canBack = true;
		delay3.start();
	}
});

do_Button_submit.on("touchDown",function(data,e){
	do_Button_submit.fontColor="C0C0C0FF";
	do_Button_submit.bgColor="0080C0FF";
});

do_Button_submit.on("touchUp",function(data,e){
	do_Button_submit.fontColor="FFFFFFFF";
	do_Button_submit.bgColor="00000000";
});

//注释
do_Button_submit.on("touch", "", 2000, function() {
	if (do_TextField_phone.text.trim().length==0) {
		do_Notification.toast("请输入手机号码！");
		return;
	}
	if (do_TextField_phone.text.trim().length!=11) {
		do_Notification.toast("请输入正确的手机号码！");
		return;
	}
	if (do_TextField_pwd.text.trim().length==0) {
		do_Notification.toast("请输入密码！");
		return;
	}
	if (do_TextField_pwd.text.trim().length<6 || do_TextField_pwd.text.trim().length>12) {
		do_Notification.toast("请输入正确的密码！6-12位");
		return;
	}

	do_SQLite.open("data://jyh_client.db");
	var sql = "delete from accounts";
	var data=do_SQLite.executeSync(sql);
	
	if (do_CheckBox_remember.checked) {
		sql="insert into accounts (phone,pwd,autoLogin) values ('" + do_TextField_phone.text + "','" + do_TextField_pwd.text + "'," + (do_CheckBox_autologin.checked?"1":"0") + ")";
		data=do_SQLite.executeSync(sql);
	}
	
	//验证身份
	var validateOK=true;
	
	if (validateOK) {
		sm("do_Page").hideKeyboard();
		do_ProgressBar_update.visible=true;
		//只更新本商场卖的产品信息
		//http方式获取
		var _http=false;
		var dataCount=50;
		var sqls=[];
		
		if (_http) {
 			var sql="delete from product;";
			sqls.push(sql);
			var sql="delete from product_pic;";
			sqls.push(sql);
			for (var i = 0; i < dataCount; i++) {
				sql="insert into product (barcodeid,type,name,price,soldnum,pic,describe) values ('SJ000000" + i + "','SJ','宝石蝶真丝围巾 重磅丝绸桑蚕丝女士秋冬丝巾披肩大方巾高档丝巾"+i+"',138+"+i+",200+"+i+",'http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg','  早在公元前3000年，埃及人所采用的缠腰布、有流苏的长裙、古希腊时代的缠布服装等都能找到类似领巾的痕迹，可以说丝巾的历史就是从一块布开始。丝巾最初并不作为装饰用，而是以御寒为主要功能。大约在中世纪以前，始于北欧或古时的北法兰西等地，这些布巾被认为是现代丝巾的始祖。\n  十六世纪中期以后，原本的保暖功能逐渐被装饰所取代，轻薄的绢丝成为主流，后来渐渐演变为所谓的三角领巾(Fichu)、饰巾IKerchiefl等。"+i+"');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SJ000000" + i + "','http://cms-bucket.nosdn.127.net/d7f3341d556c44b3a1842c1a2aee335620161023122948.jpeg','http://cms-bucket.nosdn.127.net/d7f3341d556c44b3a1842c1a2aee335620161023122948.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SJ000000" + i + "','http://cms-bucket.nosdn.127.net/abda4dc1f6544445b1068d6682b370aa20161023071455.jpeg','http://cms-bucket.nosdn.127.net/abda4dc1f6544445b1068d6682b370aa20161023071455.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SJ000000" + i + "','http://cms-bucket.nosdn.127.net/5c48e664deaf4e978016653caa1e73fc20161023085555.jpeg','http://cms-bucket.nosdn.127.net/5c48e664deaf4e978016653caa1e73fc20161023085555.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SJ000000" + i + "','http://cms-bucket.nosdn.127.net/8b6f156e7525478592f296f04b259e2f20161023105621.png','http://cms-bucket.nosdn.127.net/8b6f156e7525478592f296f04b259e2f20161023105621.png');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SJ000000" + i + "','http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg','http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg');"
				sqls.push(sql);
			}
			for (var i = 0; i < dataCount; i++) {
				sql="insert into product (barcodeid,type,name,price,soldnum,pic,describe) values ('TH000000" + i + "','TH','头花万事利盛世繁花20国花G20丝巾明信片丝巾套装长巾围巾女披肩两用"+i+"',238+"+i+",200+"+i+",'http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg','  早在公元前3000年，埃及人所采用的缠腰布、有流苏的长裙、古希腊时代的缠布服装等都能找到类似领巾的痕迹，可以说丝巾的历史就是从一块布开始。丝巾最初并不作为装饰用，而是以御寒为主要功能。大约在中世纪以前，始于北欧或古时的北法兰西等地，这些布巾被认为是现代丝巾的始祖。\n  十六世纪中期以后，原本的保暖功能逐渐被装饰所取代，轻薄的绢丝成为主流，后来渐渐演变为所谓的三角领巾(Fichu)、饰巾IKerchiefl等。"+i+"');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('TH000000" + i + "','http://cms-bucket.nosdn.127.net/d7f3341d556c44b3a1842c1a2aee335620161023122948.jpeg','http://cms-bucket.nosdn.127.net/d7f3341d556c44b3a1842c1a2aee335620161023122948.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('TH000000" + i + "','http://cms-bucket.nosdn.127.net/abda4dc1f6544445b1068d6682b370aa20161023071455.jpeg','http://cms-bucket.nosdn.127.net/abda4dc1f6544445b1068d6682b370aa20161023071455.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('TH000000" + i + "','http://cms-bucket.nosdn.127.net/5c48e664deaf4e978016653caa1e73fc20161023085555.jpeg','http://cms-bucket.nosdn.127.net/5c48e664deaf4e978016653caa1e73fc20161023085555.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('TH000000" + i + "','http://cms-bucket.nosdn.127.net/8b6f156e7525478592f296f04b259e2f20161023105621.png','http://cms-bucket.nosdn.127.net/8b6f156e7525478592f296f04b259e2f20161023105621.png');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('TH000000" + i + "','http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg','http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg');"
				sqls.push(sql);
			}
			for (var i = 0; i < dataCount; i++) {
				sql="insert into product (barcodeid,type,name,price,soldnum,pic,describe) values ('SB000000" + i + "','SB','手表2016新款杭州丝绸丝巾女100%桑蚕丝真丝围巾春秋季百搭秋冬季披肩"+i+"',338+"+i+",200+"+i+",'http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg','  早在公元前3000年，埃及人所采用的缠腰布、有流苏的长裙、古希腊时代的缠布服装等都能找到类似领巾的痕迹，可以说丝巾的历史就是从一块布开始。丝巾最初并不作为装饰用，而是以御寒为主要功能。大约在中世纪以前，始于北欧或古时的北法兰西等地，这些布巾被认为是现代丝巾的始祖。\n  十六世纪中期以后，原本的保暖功能逐渐被装饰所取代，轻薄的绢丝成为主流，后来渐渐演变为所谓的三角领巾(Fichu)、饰巾IKerchiefl等。"+i+"');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SB000000" + i + "','http://cms-bucket.nosdn.127.net/d7f3341d556c44b3a1842c1a2aee335620161023122948.jpeg','http://cms-bucket.nosdn.127.net/d7f3341d556c44b3a1842c1a2aee335620161023122948.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SB000000" + i + "','http://cms-bucket.nosdn.127.net/abda4dc1f6544445b1068d6682b370aa20161023071455.jpeg','http://cms-bucket.nosdn.127.net/abda4dc1f6544445b1068d6682b370aa20161023071455.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SB000000" + i + "','http://cms-bucket.nosdn.127.net/5c48e664deaf4e978016653caa1e73fc20161023085555.jpeg','http://cms-bucket.nosdn.127.net/5c48e664deaf4e978016653caa1e73fc20161023085555.jpeg');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SB000000" + i + "','http://cms-bucket.nosdn.127.net/8b6f156e7525478592f296f04b259e2f20161023105621.png','http://cms-bucket.nosdn.127.net/8b6f156e7525478592f296f04b259e2f20161023105621.png');"
				sqls.push(sql);
				sql="insert into product_pic (barcodeid,pic,bigpic) values ('SB000000" + i + "','http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg','http://cms-bucket.nosdn.127.net/754411cda78248639a10a6c5bcaa4a0420161017084106.jpeg');"
				sqls.push(sql);
			}
			do_SQLite.execute1(sqls, false, function(data, e) {
				do_Notification.toast("更新完毕");
				do_ProgressBar_update.visible=false;
				
				do_Global.setMemory("phone", do_TextField_phone.text);
				do_SQLite.close();
				do_App.openPage({
					source : "source://view/index.ui",
					statusBarState : "transparent",
					animationType : "fade"
				});		
			})
		}else {
			do_Global.setMemory("phone", do_TextField_phone.text);
			do_App.openPage({
				source : "source://view/index.ui",
				statusBarState : "transparent",
				animationType : "fade"
			});		
		}
		
	}else {
		do_Notification.toast("登录不成功!\n可能未开通或密码不对");
	}
});


do_SQLite.open("data://jyh_client.db");
var sql = "select phone,pwd,autoLogin from accounts limit 1";
var data=do_SQLite.querySync(sql);

if (data.length>0) {
	do_CheckBox_remember.checked=true;
	do_CheckBox_autologin.checked=data[0].autoLogin==1?true:false;
	do_TextField_phone.text=data[0].phone;
	do_TextField_pwd.text=data[0].pwd;
	
	if (do_CheckBox_autologin.checked) {
		do_Button_submit.fire("touch");
	}
}
do_SQLite.close();


//上层Page关闭时的事件
do_Page.on("result", function(data) {
	if (data == null || data.length <= 0)
		return;
	if (data=="init") {
		do_ProgressBar_update.visible=false;
		do_CheckBox_remember.checked=false;
		do_CheckBox_autologin.checked=false;
		do_TextField_phone.text="";
		do_TextField_pwd.text="";
	}
});

//打开联系方式
do_ALayout_link.on("touch", "", 2000, function() {
	do_App.openPage({
	source : "source://view/link.ui",
	statusBarState : "transparent",
	animationType : "fade"
	});
});



