(function(window) {
sprite_12 = function() {
	this.initialize();
}
sprite_12._SpriteSheet = new SpriteSheet({images: ["concert_hall.png"], frames: [[0,0,340,244,0,170,146],[0,244,339,215,0,169,119]]});
var sprite_12_p = sprite_12.prototype = new BitmapAnimation();
sprite_12_p.BitmapAnimation_initialize = sprite_12_p.initialize;
sprite_12_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_12._SpriteSheet);
	this.paused = false;
}
window.sprite_12 = sprite_12;
}(window));

