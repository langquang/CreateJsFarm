(function(window) {
sprite_12 = function() {
	this.initialize();
}
sprite_12._SpriteSheet = new SpriteSheet({images: ["slims_villa.png"], frames: [[0,441,294,186,0,146.5,113],[0,0,293,219,0,145.5,146],[0,219,289,222,0,143.5,149]]});
var sprite_12_p = sprite_12.prototype = new BitmapAnimation();
sprite_12_p.BitmapAnimation_initialize = sprite_12_p.initialize;
sprite_12_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_12._SpriteSheet);
	this.paused = false;
}
window.sprite_12 = sprite_12;
}(window));

