(function(window) {
sprite_71 = function() {
	this.initialize();
}
sprite_71._SpriteSheet = new SpriteSheet({images: ["police.png"], frames: [[0,0,290,170,0,144,97.5],[290,0,290,259,0,145,186.5],[580,0,290,259,0,145,186.5],[0,259,290,259,0,145,186.5],[290,259,290,286,0,145,213.5],[580,259,290,264,0,145,191.5],[0,545,291,230,0,145,156.5],[291,545,292,215,0,146,141.5]]});
var sprite_71_p = sprite_71.prototype = new BitmapAnimation();
sprite_71_p.BitmapAnimation_initialize = sprite_71_p.initialize;
sprite_71_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_71._SpriteSheet);
	this.paused = false;
}
window.sprite_71 = sprite_71;
}(window));

