//this.createjs = this.createjs || {};
//this.stage = this.stage || {};

var ENTITY_TYPE_ROAD = "road";
var ENTITY_TYPE_BUILDING = "buidling";

var IsoEntity = function (buildingId, entityId, texture) {
    this.initialize(buildingId, entityId, texture);
};

var p = IsoEntity.prototype = new createjs.Container();


//============================== propertys
p.buildingId = 0;   // ref to Constance
p.entityId = "";    // identify
p.entityType = ENTITY_TYPE_BUILDING;
p.texture = "";
p.sprite = null;
p.isoX = 0;
p.isoY = 0;
p.cellX = 0;
p.cellY = 0;
p.loader = null;
p.sizeX = 2;    // cell size
p.sizeY = 2;    // cell size
p.half_sizeX = 1;    // cell size
p.half_sizeY = 1;    // cell size
p._data = null; // constance data
p._startFrame = 0;
// ============================ function

p._setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

p._setIsoPosition = function (x, y) {
    this.isoX = x;
    this.isoY = y;
    var screenP = isoToScreen($V([x, y, 0]));
    this._setPosition(screenP.e(1), screenP.e(2));
};

p.setCellPosition = function (cellX, cellY) {
    this.cellX = cellX;
    this.cellY = cellY;
    this._setIsoPosition(cellX * CELL_SIZE, cellY * CELL_SIZE);
};


// this != this
p.handleEvt = function (evt) {
    if (evt.type == "rollover") {
        this.sprite.scaleX = 1.1;
        this.sprite.scaleY = 1.1;
        gCanpan = false;
    }
    else if (evt.type == "rollout") {
        this.sprite.scaleX = 1.0;
        this.sprite.scaleY = 1.0;
        gCanpan = true;
    }
    else if (evt.type == "mousedown") {
        this.sprite.scaleX = 1.0;
        this.sprite.scaleY = 1.0;
        this.sprite.offset = {x: this.sprite.x - evt.stageX, y: this.sprite.y - evt.stageY};
    }
    else if (evt.type == "pressmove") {
        this.sprite.x = evt.stageX + this.sprite.offset.x;
        this.sprite.y = evt.stageY + this.sprite.offset.y;

        var screenP = $V([this.sprite.x, this.sprite.y, 0]);
        var isoP = screenToIso(screenP);
        this._setIsoPosition(snap(isoP.e(1)), snap(isoP.e(2)));
    }
};

// this != this
p.loadDataCompleted = function (evt) {
    this._data = this.loader.getResult(this.entityId).data;
    this.sizeX = this._data.width;
    this.sizeY = this._data.height;
    this.half_sizeX = this.sizeX / 2;
    this.half_sizeY = this.sizeY / 2;
    var animation_data = this.loader.getResult(this.entityId).anim;
    var ss = new createjs.SpriteSheet(animation_data);
    this.sprite = new createjs.Sprite(ss);
    this.sprite.gotoAndStop(this._startFrame);
    this.addChild(this.sprite);

    // move anchor o top-left
//    var offset = $V([Math.floor((this.sizeX - 1) * CELL_SIZE / 2), Math.floor((this.sizeY - 1) * CELL_SIZE / 2)]);
//    offset = isoToScreen(offset);
//    this.sprite.x = +offset.e(1);
//    this.sprite.y = +offset.e(2);

//    this.sprite.x = this.x;
//    this.sprite.y = this.y;
//    gIsoContainer.addChild(this.sprite);
//    this.sprite.on("click", this.handleEvt, this);
//    this.sprite.on("dblclick", this.handleEvt, this);
//    this.sprite.on("rollover", this.handleEvt, this);
//    this.sprite.on("rollout", this.handleEvt, this);
//    this.sprite.on("mousedown", this.handleEvt, this);
//    this.sprite.on("pressmove", this.handleEvt, this);


};

p.onCursorClick = function () {
    console.log("onCursorClick");
};

p.onCreatedByCursorClick = function (current_cursor) {
    console.log("onCreatedByCursorClick");
};

p.gotoAndStop = function (frame_index) {
    this._startFrame = frame_index;
    if (this.sprite != null) {
        this.sprite.gotoAndStop(frame_index);
    }
};

p.gotoAndPlay = function (frame_index) {
    if (this.sprite == null) {
        this._startFrame = frame_index;
    } else {
        this.sprite.gotoAndPlay(frame_index);
        this.sprite.update();
    }
};


p.loadData = function () {
    var manifest = [
        {src: this.texture, id: this.entityId}
    ];

    // loader is global
    this.loader = new createjs.LoadQueue();
    this.loader.on("complete", this.loadDataCompleted, this);
    this.loader.loadManifest(manifest);
};

//======================================= Override==========================
//======================================= Constructor==========================
IsoEntity.prototype.Container_initialize = p.initialize;
IsoEntity.prototype.initialize = function (buildingId, entityId, texture) {
    this.Container_initialize();
    this.buildingId = buildingId;
    this.entityId = entityId;
    this.texture = texture;
    this.loadData();
};
