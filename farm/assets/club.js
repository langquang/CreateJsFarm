(function(window) {
sprite_15 = function() {
	this.initialize();
}
sprite_15._SpriteSheet = new SpriteSheet({images: ["club.png"], frames: [[0,0,220,174,0,102,123],[0,174,196,176,0,98,126]]});
var sprite_15_p = sprite_15.prototype = new BitmapAnimation();
sprite_15_p.BitmapAnimation_initialize = sprite_15_p.initialize;
sprite_15_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_15._SpriteSheet);
	this.paused = false;
}
window.sprite_15 = sprite_15;
}(window));

