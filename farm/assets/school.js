(function(window) {
sprite_40 = function() {
	this.initialize();
}
sprite_40._SpriteSheet = new SpriteSheet({images: ["school.png"], frames: [[251,498,242,148,0,120,76],[253,249,251,249,0,131,177],[253,0,252,249,0,131,177],[0,0,253,289,0,131,217],[0,289,251,206,0,125,129],[0,495,251,197,0,125,120]]});
var sprite_40_p = sprite_40.prototype = new BitmapAnimation();
sprite_40_p.BitmapAnimation_initialize = sprite_40_p.initialize;
sprite_40_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_40._SpriteSheet);
	this.paused = false;
}
window.sprite_40 = sprite_40;
}(window));

