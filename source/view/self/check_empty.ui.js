/**
 * New DeviceOne File
 */
var do_Button_sync = ui("do_Button_sync");
var do_ProgressBar_1 = ui("do_ProgressBar_1");
var style = require("do/style");

style.css(do_Button_sync, {
	parent : "dynamicButton"
})

//同步
do_Button_sync.on("touch", "", 2000, function() {
	do_Button_sync.enabled=false;

	
	
	do_Button_sync.enabled=true;	
});

