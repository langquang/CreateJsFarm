(function(window) {
sprite_28 = function() {
	this.initialize();
}
sprite_28._SpriteSheet = new SpriteSheet({images: ["mansion.png"], frames: [[0,0,195,123,0,97,75],[0,123,195,149,0,98,100],[0,272,200,160,0,100,110]]});
var sprite_28_p = sprite_28.prototype = new BitmapAnimation();
sprite_28_p.BitmapAnimation_initialize = sprite_28_p.initialize;
sprite_28_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_28._SpriteSheet);
	this.paused = false;
}
window.sprite_28 = sprite_28;
}(window));

