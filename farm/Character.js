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

p.walkTo = function(cellX, cellY){
    this.findMovieClip(cellX, cellY);

    var isoP  = $V([cellX*CELL_SIZE, cellY*CELL_SIZE, 0]);
    var distance = isoP.distanceFrom($V([this.isoX, this.isoY, 0]));
    var time  = distance/20;
    createjs.Tween.get(this).to({isoX: isoP.e(1), isoY:isoP.e(2)}, time*1000).call(this.onWalkComplete);
};

p.onWalking = function(){
    this._setIsoPosition(this.isoX, this.isoY);
    this.cellX = getCell(this.isoX);
    this.cellY = getCell(this.isoY);
};

p.onWalkComplete = function(){
    var nextDest  = gIsoState.findNextWalkingPoint($V([getCell(this.isoX), getCell(this.isoY), 0]));

    if( nextDest != null )
    {
        this.walkTo(nextDest.e(1), nextDest.e(2));
    }
    else
    {
        nextDest = gIsoState.getRandomCharacterPoint();
        if( nextDest != null )
        {
            this.setCellPosition(nextDest.e(1), nextDest.e(2));
        }
        else
        {
            gIsoState.removeCharacter(this);
        }
    }
};

p.findMovieClip = function(cellX, cellY){
    var cellPoint = $V([getCell(this.isoX), getCell(this.isoY), 0]);
    if( cellX == cellPoint.e(1) && cellY > cellPoint.e(2) )	// iso : n-s
    {
        this.sprite.gotoAndPlay("sw");
        return;
    }

    if( cellX == cellPoint.e(1) && cellY < cellPoint.e(2) )	// iso: s-n
    {
        this.sprite.gotoAndPlay("ne");
        return;

    }

    if( cellX > cellPoint.e(1) && cellY == cellPoint.e(2) )	// iso: w-e
    {
        this.sprite.gotoAndPlay("se");
        return;

    }

    this.sprite.gotoAndPlay("nw");
};

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
    this.onWalkComplete();
};

Character.prototype.IsoEntity_handleEvt = p.handleEvt;
Character.prototype.handleEvt = function (evt) {

};


var character_textures = ["fc_characters_common_010", "fc_characters_common_013"];
// ====================================== Constructor =============================
Character.prototype.IsoEntity_initialize = p.initialize;
Character.prototype.initialize = function (entityId) {
    this.Container_initialize();
    this.entityId = entityId;
    this.texture = character_textures[getRandomInt(0, character_textures.length - 1)];
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
    this.entityType = ENTITY_TYPE_CHARACTER;
};