(function(window) {
export = function() {
	this.initialize();
}
export._SpriteSheet = new SpriteSheet({images: ["window_shop.png"], frames: [[0,0,714,494,0,357,278.2],[714,0,152,170,0,0,-0.8000000000000114],[714,170,64,51,0,0,-6.800000000000011],[714,221,64,51,0,0,-5.800000000000011],[714,272,31,65,0,15,31.19999999999999],[714,337,31,65,0,15,31.19999999999999],[0,494,35,37,0,17,17.19999999999999],[35,494,35,37,0,17,17.19999999999999],[714,402,31,65,0,15,31.19999999999999],[714,467,31,65,0,15,31.19999999999999]]});
var export_p = export.prototype = new BitmapAnimation();
export_p.BitmapAnimation_initialize = export_p.initialize;
export_p.initialize = function() {
	this.BitmapAnimation_initialize(export._SpriteSheet);
	this.paused = false;
}
window.export = export;
}(window));

