(function(window) {
sprite_45 = function() {
	this.initialize();
}
sprite_45._SpriteSheet = new SpriteSheet({images: ["villa.png"], frames: [[242,249,242,148,0,120,76],[252,0,251,249,0,131,177],[0,0,252,249,0,131,177],[0,249,242,172,0,121,99]]});
var sprite_45_p = sprite_45.prototype = new BitmapAnimation();
sprite_45_p.BitmapAnimation_initialize = sprite_45_p.initialize;
sprite_45_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_45._SpriteSheet);
	this.paused = false;
}
window.sprite_45 = sprite_45;
}(window));

