(function(window) {
btn_zoom_in = function() {
	this.initialize();
}
btn_zoom_in._SpriteSheet = new SpriteSheet({images: ["game_icons.png"], frames: [[0,0,32,22,0,0,0]]});
var btn_zoom_in_p = btn_zoom_in.prototype = new BitmapAnimation();
btn_zoom_in_p.BitmapAnimation_initialize = btn_zoom_in_p.initialize;
btn_zoom_in_p.initialize = function() {
	this.BitmapAnimation_initialize(btn_zoom_in._SpriteSheet);
	this.paused = false;
}
window.btn_zoom_in = btn_zoom_in;
btn_zoom_out = function() {
	this.initialize();
}
btn_zoom_out._SpriteSheet = new SpriteSheet({images: ["game_icons.png"], frames: [[0,22,32,22,0,0,0]]});
var btn_zoom_out_p = btn_zoom_out.prototype = new BitmapAnimation();
btn_zoom_out_p.BitmapAnimation_initialize = btn_zoom_out_p.initialize;
btn_zoom_out_p.initialize = function() {
	this.BitmapAnimation_initialize(btn_zoom_out._SpriteSheet);
	this.paused = false;
}
window.btn_zoom_out = btn_zoom_out;
}(window));

