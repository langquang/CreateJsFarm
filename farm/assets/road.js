(function(window) {
sprite_48 = function() {
	this.initialize();
}
sprite_48._SpriteSheet = new SpriteSheet({images: ["road.png"], frames: [[0,0,98,50,0,49,25],[98,0,98,50,0,49,25],[0,50,98,50,0,49,25],[98,50,98,50,0,49,25],[0,100,98,50,0,49,25],[98,100,98,50,0,49,25],[0,150,98,50,0,49,25],[98,150,98,50,0,49,25],[0,200,98,50,0,49,25],[98,200,98,50,0,49,25],[0,250,98,50,0,49,25],[98,250,98,50,0,49,25],[0,300,98,50,0,49,25],[98,300,98,50,0,49,25],[0,350,98,50,0,49,25],[98,350,98,50,0,49,25]]});
var sprite_48_p = sprite_48.prototype = new BitmapAnimation();
sprite_48_p.BitmapAnimation_initialize = sprite_48_p.initialize;
sprite_48_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_48._SpriteSheet);
	this.paused = false;
}
window.sprite_48 = sprite_48;
}(window));

