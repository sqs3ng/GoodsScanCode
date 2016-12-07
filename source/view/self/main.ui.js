/**
 * related to main.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-11-24
 */
var do_Page = sm("do_Page");

var do_FragmentView_1 = ui("do_FragmentView_1");
var do_ListData = mm("do_ListData");
do_ListData.addData([
		{
			leftTemplate:1,
			template:0
		}
		]);
do_FragmentView_1.bindItems(do_ListData);

do_Page.on("openleft",function(){
	do_FragmentView_1.showLeft();
})