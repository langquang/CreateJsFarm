(function(window) {
sprite_40 = function() {
	this.initialize();
}
sprite_40._SpriteSheet = new SpriteSheet({images: ["tokyo_tower.png"], frames: [[233,778,219,134,0,96,74],[242,294,236,242,0,96,182],[233,536,236,242,0,96,182],[0,757,233,259,0,96,199],[242,0,233,294,0,96,234],[0,408,233,349,0,96,289],[0,0,242,408,0,121,348]]});
var sprite_40_p = sprite_40.prototype = new BitmapAnimation();
sprite_40_p.BitmapAnimation_initialize = sprite_40_p.initialize;
sprite_40_p.initialize = function() {
	this.BitmapAnimation_initialize(sprite_40._SpriteSheet);
	this.paused = false;
}
window.sprite_40 = sprite_40;
}(window));

