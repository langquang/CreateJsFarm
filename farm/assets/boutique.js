(function(window) {
sprite_33 = function() {
	this.initialize();
}
sprite_33._SpriteSheet = new SpriteSheet({images: ["boutique.png"], frames: [[0,0,195,123,0,96.5,74.94999999999999],[195,0,195,123,0,96.5,74.94999999999999],[0,123,237,229,0,96.5,180.95],[237,123,195,155,0,97.5,104.94999999999999]]});
var sprite_33_p = sprite_33.prototype = new BitmapAnimation();
sprite_33_p.BitmapAnimation_initialize = sprite_33_p.initialize;
sprite_33_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_33._SpriteSheet);
	this.paused = false;
}
window.sprite_33 = sprite_33;
}(window));

