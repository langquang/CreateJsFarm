(function(window) {
sprite_22 = function() {
	this.initialize();
}
sprite_22._SpriteSheet = new SpriteSheet({images: ["flower_shop.png"], frames: [[0,128,140,127,0,53.5,88.5],[0,255,140,127,0,53.5,88.5],[0,0,141,128,0,56.5,89.5]]});
var sprite_22_p = sprite_22.prototype = new BitmapAnimation();
sprite_22_p.BitmapAnimation_initialize = sprite_22_p.initialize;
sprite_22_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_22._SpriteSheet);
	this.paused = false;
}
window.sprite_22 = sprite_22;
}(window));

