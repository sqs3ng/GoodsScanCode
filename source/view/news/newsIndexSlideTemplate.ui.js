/**
 * related to newsIndexSlideTemplate.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-28
 */
// 引入组件库
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");
var do_DataCache = sm("do_DataCache");
var do_SQLite = mm("do_SQLite");
var do_Global = sm("do_Global");

// 声明UI变量
var root = ui("$"); // $表示当前视图的根UI
var do_ALayout_root = ui("do_ALayout_root");
var do_ListView_news = ui("do_ListView_news");
var do_ALayout_main = ui("do_ALayout_main");

// 定义do_ListView_news的数据model
var listdataNews = mm("do_ListData");

// 设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag" : "key",
	"do_ALayout_main.tag" : "name"
});

// 给do_ListView_news绑定数据
do_ListView_news.bindItems(listdataNews);

// 定义变量
var type_id;
var type_name;
var pageNum = 0;
var numOfPage = 20;

do_SQLite.open("data://jyh_client.db");

function refreshAllData(pageNum) {
	// 恢复do_ListView_news的headerview和footerview状态
	do_ListView_news.rebound();

	// 查询数据
	var sqls = [], sql = "";
	if (type_id == "redian") {
		sqls.push("delete from Product_Hot");
		sqls.push("INSERT INTO Product_Hot (BarCodeID,type,name,price,soldNum,pic,describe) SELECT BarCodeID,type,name,price,soldNum,pic,describe FROM Product order by soldnum desc limit " + numOfPage + " offset " + pageNum * numOfPage);
		sql = "select a.*,b.* from (select rowid,* from Product_Hot where rowid%2=1) a left outer join (select rowid-1 as rowid,BarCodeID as BarCodeID1,type as type1,name as name1,price as price1,soldNum as soldNum1,pic as pic1,describe as describe1 from Product_Hot where rowid%2=0) b on a.rowid=b.rowid";
	} else {
		var sql = "select * from product where type='" + type_id + "' limit "
				+ numOfPage + " offset " + pageNum * numOfPage;
	}

	// 先加到临时表中
	var ex = do_SQLite.executeSync1(sqls);
	// 查询
	do_SQLite.query(sql, function(data) {
		if (pageNum == 0) {
			listdataNews.removeAll();
		}
		listdataNews.addData(data);
		// do_SQLite.close();
		do_ListView_news.refreshItems();
	});
}

// 订阅每次绑定数据后的事件
root.on("dataRefreshed", function() {
	type_id = do_ALayout_root.tag;
	type_name = do_ALayout_main.tag;

	refreshAllData(0);
});

// 订阅下拉刷新
do_ListView_news.on("pull", function(data) {
	// 其中state=0：表示开始下拉headerview，；
	// state=1：表示下拉headerview超过headerview的高度，触发一次这个事件；
	// state=2：下拉超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2) {
		pageNum = 0;
		refreshAllData(pageNum);
	}
});

// 订阅上拉刷新，翻页数据
do_ListView_news.on("push", function(data) {
	if (data.state == 2) {
		pageNum++;
		refreshAllData(pageNum);
	}
});
