(function(window) {
sprite_12 = function() {
	this.initialize();
}
sprite_12._SpriteSheet = new SpriteSheet({images: ["buildings_025_cottage.png"], frames: [[0,0,154,118,0,77,67],[0,118,151,112,0,76,60],[0,230,150,150,0,75,99]]});
var sprite_12_p = sprite_12.prototype = new BitmapAnimation();
sprite_12_p.BitmapAnimation_initialize = sprite_12_p.initialize;
sprite_12_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_12._SpriteSheet);
	this.paused = false;
}
window.sprite_12 = sprite_12;
}(window));

