(function(window) {
Buff_3258 = function() {
	this.initialize();
}
Buff_3258._SpriteSheet = new SpriteSheet({images: ["cay_mai.png"], frames: [[0,0,150,132,0,68.2,68.2]]});
var Buff_3258_p = Buff_3258.prototype = new BitmapAnimation();
Buff_3258_p.BitmapAnimation_initialize = Buff_3258_p.initialize;
Buff_3258_p.initialize = function() {
	this.BitmapAnimation_initialize(Buff_3258._SpriteSheet);
	this.paused = false;
}
window.Buff_3258 = Buff_3258;
}(window));

