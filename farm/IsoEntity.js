//this.createjs = this.createjs || {};
//this.stage = this.stage || {};

var IsoEntity = function (buildingId, entityId, texture) {
    this.initialize(buildingId, entityId, texture);
};

var p = IsoEntity.prototype = new createjs.Container();


//============================== propertys
p.buildingId;
p.entityId = "";
p.texture = "";
p.sprite = null;
p.isoX = 0;
p.isoY = 0;
p.cellX = 0;
p.cellY = 0;
p.loader = null;
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
    var ss = new createjs.SpriteSheet(this.loader.getResult(this.entityId));
    this.sprite = new createjs.Sprite(ss);
    this.sprite.gotoAndPlay(0);
    this.addChild(this.sprite);

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
