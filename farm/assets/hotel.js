(function(window) {
sprite_43 = function() {
	this.initialize();
}
sprite_43._SpriteSheet = new SpriteSheet({images: ["hotel.png"], frames: [[0,661,300,173,0,149.5,97.65],[0,472,290,189,0,144.5,116.65],[0,233,290,239,0,144.5,166.65],[0,0,305,233,0,151.5,154.65]]});
var sprite_43_p = sprite_43.prototype = new BitmapAnimation();
sprite_43_p.BitmapAnimation_initialize = sprite_43_p.initialize;
sprite_43_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_43._SpriteSheet);
	this.paused = false;
}
window.sprite_43 = sprite_43;
}(window));

