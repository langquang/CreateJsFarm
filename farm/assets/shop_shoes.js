(function(window) {
sprite_37 = function() {
	this.initialize();
}
sprite_37._SpriteSheet = new SpriteSheet({images: ["shop_shoes.png"], frames: [[0,291,146,98,0,73,50],[0,0,212,173,0,137,125],[0,173,143,118,0,72,70]]});
var sprite_37_p = sprite_37.prototype = new BitmapAnimation();
sprite_37_p.BitmapAnimation_initialize = sprite_37_p.initialize;
sprite_37_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_37._SpriteSheet);
	this.paused = false;
}
window.sprite_37 = sprite_37;
}(window));

