(function(window) {
sprite_18 = function() {
	this.initialize();
}
sprite_18._SpriteSheet = new SpriteSheet({images: ["house.png"], frames: [[0,113,152,104,0,76,53],[0,0,146,113,0,72,63]]});
var sprite_18_p = sprite_18.prototype = new BitmapAnimation();
sprite_18_p.BitmapAnimation_initialize = sprite_18_p.initialize;
sprite_18_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_18._SpriteSheet);
	this.paused = false;
}
window.sprite_18 = sprite_18;
}(window));

