(function(window) {
House2136 = function() {
	this.initialize();
}
House2136._SpriteSheet = new SpriteSheet({images: ["House2136.png"], frames: [[0,0,118,89,0,47,34.5]]});
var House2136_p = House2136.prototype = new BitmapAnimation();
House2136_p.BitmapAnimation_initialize = House2136_p.initialize;
House2136_p.initialize = function() {
	this.BitmapAnimation_initialize(House2136._SpriteSheet);
	this.paused = false;
}
window.House2136 = House2136;
}(window));

