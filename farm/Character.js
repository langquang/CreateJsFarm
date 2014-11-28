/**
 * Created by CPU001 on 11/28/2014.
 */
/**
 * Created by CPU001 on 9/22/2014.
 */

var Character = function (shop_data, entityId) {
    this.initialize(shop_data, entityId);
};


var p = Character.prototype = Object.create(IsoEntity.prototype);
//======================================= property ================================


//======================================= override ================================
Character.prototype.IsoEntity_onCreatedByCursorClick = p.onCreatedByCursorClick;
Character.prototype.onCreatedByCursorClick = function (current_cursor) {
};

Character.prototype.IsoEntity_loadData = p.loadData;
Character.prototype.loadData = function (current_cursor) {
    var manifest = [
        {src: "assets/" + this.texture + ".json", id: this.texture}
    ];

    // loader is global
    this.loader = new createjs.LoadQueue();
    this.loader.on("complete", this.loadDataCompleted, this);
    this.loader.loadManifest(manifest);
};

Character.prototype.IsoEntity_loadDataCompleted = p.loadDataCompleted;
Character.prototype.loadDataCompleted = function (evt) {
    var animation_data = this.loader.getResult(this.texture);
    this.sprite_sheet = new createjs.SpriteSheet(animation_data);
    this.sprite = new createjs.Sprite(this.sprite_sheet);
    this.sprite.gotoAndPlay("nw");
    this.addChild(this.sprite);
};

Character.prototype.IsoEntity_handleEvt = p.handleEvt;
Character.prototype.handleEvt = function (evt) {

};


// ====================================== Constructor =============================
Character.prototype.IsoEntity_initialize = p.initialize;
Character.prototype.initialize = function (entityId) {
    this.Container_initialize();
    this.entityId = entityId;
    this.texture = "fc_characters_common_010";
    this.sizeX = 1;
    this.sizeY = 1;
    this.anchorX = Math.floor(this.sizeX / 2);
    this.anchorY = Math.floor(this.sizeY / 2);

    if( this.anchorX == 0 )
        this.anchorX_2 = 1;
    else
        this.anchorX_2 = this.anchorX;

    if( this.anchorY == 0 )
        this.anchorY_2 = 1;
    else
        this.anchorY_2 = this.anchorY;

    this.loadData();
};