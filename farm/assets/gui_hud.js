(function(window) {
export = function() {
	this.initialize();
}
export._SpriteSheet = new SpriteSheet({images: ["gui_hud.png"], frames: [[849,135,85,115,0,39,52],[760,135,89,119,0,41,53],[706,151,54,54,0,25,26],[962,0,56,56,0,26,26],[226,197,54,54,0,25,26],[962,56,56,56,0,26,27],[280,197,54,54,0,25,26],[594,151,56,56,0,26,26],[79,200,54,54,0,25,26],[650,151,56,56,0,26,26],[934,135,79,104,0,42,52],[0,151,79,104,0,42,52],[334,197,37,39,0,19,20],[133,200,34,34,0,15,15],[167,200,34,34,0,15,15],[706,205,34,34,0,15,15],[575,207,34,34,0,15,15],[375,151,83,76,0,41,38],[0,0,760,151,0,379,150],[458,151,136,42,0,20,18],[79,151,147,49,0,12,23],[226,151,149,46,0,19,21],[458,193,117,26,0,-9,13],[760,0,202,135,0,0,135]]});
var export_p = export.prototype = new BitmapAnimation();
export_p.BitmapAnimation_initialize = export_p.initialize;
export_p.initialize = function() {
	this.BitmapAnimation_initialize(export._SpriteSheet);
	this.paused = false;
}
window.export = export;
}(window));

