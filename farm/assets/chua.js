(function(window) {
CivBuilding_3002 = function() {
	this.initialize();
}
CivBuilding_3002._SpriteSheet = new SpriteSheet({images: ["chua.png"], frames: [[0,0,192,160,0,95.5,65.5]]});
var CivBuilding_3002_p = CivBuilding_3002.prototype = new BitmapAnimation();
CivBuilding_3002_p.BitmapAnimation_initialize = CivBuilding_3002_p.initialize;
CivBuilding_3002_p.initialize = function() {
	this.BitmapAnimation_initialize(CivBuilding_3002._SpriteSheet);
	this.paused = false;
}
window.CivBuilding_3002 = CivBuilding_3002;
}(window));

