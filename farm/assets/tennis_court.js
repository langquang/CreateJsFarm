(function(window) {
sprite_7 = function() {
	this.initialize();
}
sprite_7._SpriteSheet = new SpriteSheet({images: ["tennis_court.png"], frames: [[0,118,178,117,0,76.95,65],[0,0,178,118,0,75.95,68],[0,235,170,119,0,72.95,71]]});
var sprite_7_p = sprite_7.prototype = new BitmapAnimation();
sprite_7_p.BitmapAnimation_initialize = sprite_7_p.initialize;
sprite_7_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_7._SpriteSheet);
	this.paused = false;
}
window.sprite_7 = sprite_7;
}(window));

