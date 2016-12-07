/**
 * related to salelog.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-19
 */

var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");

var do_ListView_lists = ui("do_ListView_lists");
var do_ALayout_root = ui("do_ALayout_root");
var do_ListData=mm("do_ListData");

//添加header
var addhead = do_ALayout_root.add("top", "source://view/top1.ui");
var header = ui(addhead);
var do_HashData_top = mm("do_HashData");
header.bindData(do_HashData_top);
do_HashData_top.addData({
	"showback" : true,
	"title" : "销售记录",
	"closefire":"refreshBuyNum"
});
header.refreshData();

do_ListView_lists.bindItems(do_ListData);

var lastdate;

var do_SQLite = mm("do_SQLite");
do_SQLite.open("data://jyh_client.db");
var phone=do_Global.getMemory("phone");

function refreshAllData(_datetime){
	var sql="select count(*) as num,date(max(datetime)) as datetime from buy where phone='" + phone + "'" + (_datetime.length==0?"":" and datetime<'" + _datetime + "'");
	var data=do_SQLite.querySync(sql);
	if (data[0].num==0) {
		if (_datetime.length==0) {
			do_ListData.removeAll();
			do_ListData.addData([{template: 2}]);
			do_ListView_lists.refreshItems();
		}else {
			sm("do_Notification").toast("没有更早日期的销售记录");
		}
	}else {
		lastdate=data[0].datetime;
		var sql = "select 1 as template,b.name,a.price,strftime('%H:%M',a.datetime) as time,datetime,a.BarCodeID,a.num FROM Buy a left outer join product b on a.BarCodeID=b.BarCodeID where a.phone='" + phone + "' and date(datetime)='" + lastdate + "'";
		do_SQLite.query(sql,function(data){
			if (_datetime.length==0) {
				do_ListData.removeAll();
			}
			do_ListData.addData([{template: 0,datetime:lastdate}]);
			do_ListData.addData(data);
			do_ListView_lists.refreshItems();
		})	
	}
}

refreshAllData("");

do_ListView_lists.on("pull",function(data){
	if (data.state!=2) {
		return;
	}
	do_ListView_lists.rebound();
	refreshAllData("");
});

do_ListView_lists.on("push",function(data){
	if (data.state!=2) {
		return;
	}
	do_ListView_lists.rebound();
	refreshAllData(lastdate);
});

// 滚到顶端
var do_Notification = sm("do_Notification");
var canTop = false;
var delay1 = mm("do_Timer");
delay1.delay = 1000;
delay1.on("tick", function() {
	delay1.stop();
	canTop = false;
});

var do_ALayout_title=ui(addhead+".do_ALayout_title")
do_ALayout_title.on("touch",function() {
	if (canTop) {
		do_ListView_lists.scrollToPosition(0, true);
	} else {
		canTop = true;
		delay1.start();
	}
});

