(function(window) {
export = function() {
	this.initialize();
}
export._SpriteSheet = new SpriteSheet({images: ["map_icons.png"], frames: [[47,31,48,46,0,22.25,23.85],[0,31,47,48,0,21.25,22.85],[0,101,76,18,0,37.25,8.850000000000001],[0,79,82,22,0,40.25,10.850000000000001],[0,0,93,31,0,44.25,9.850000000000001]]});
var export_p = export.prototype = new BitmapAnimation();
export_p.BitmapAnimation_initialize = export_p.initialize;
export_p.initialize = function() {
	this.BitmapAnimation_initialize(export._SpriteSheet);
	this.paused = false;
}
window.export = export;
}(window));

