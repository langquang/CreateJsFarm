//this.createjs = this.createjs || {};
//this.stage = this.stage || {};

var IsoEntity = function (entityId, texture) {
    this.initialize(entityId, texture);
};

var p = IsoEntity.prototype;

p.entityId = "";
p.texture = "";
p.sprite = null;
p._x = 0;
p._y = 0;
p.loader = null;


p.setPosition = function (x, y) {
    if (this.sprite != null) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    else {
        this._x = x;
        this._y = y;
    }
};


// this != this
p.handleEvt = function (evt) {
    if (evt.type == "rollover") {
        this.sprite.scaleX = 1.1;
        this.sprite.scaleY = 1.1;
        canpan = false;
    }
    else if (evt.type == "rollout") {
        this.sprite.scaleX = 1.0;
        this.sprite.scaleY = 1.0;
        canpan = true;
    }
    else if (evt.type == "mousedown") {
        this.sprite.scaleX = 1.0;
        this.sprite.scaleY = 1.0;
        this.sprite.offset = {x: this.sprite.x - evt.stageX, y: this.sprite.y - evt.stageY};
    }
    else if (evt.type == "pressmove") {
        this.sprite.x = evt.stageX + this.sprite.offset.x;
        this.sprite.y = evt.stageY + this.sprite.offset.y;
    }
};

// this != this
p.loadDataCompleted = function (evt) {
//    document.getElementById("loader").className = "";
    // Define a spritesheet. Note that this data was exported by Zoë.
    var ss = new createjs.SpriteSheet(this.loader.getResult(this.entityId));
    this.sprite = new createjs.Sprite(ss);
    this.sprite.x = this._x;
    this.sprite.y = this._y;
    this.sprite.gotoAndPlay(0);

//    this.sprite = new createjs.Shape();
//    this.sprite .graphics.beginFill("red").drawCircle(0, 0, 50);
//    this.sprite .x = this._x;
//    this.sprite .y = this._y;

    // Add sprite to the isoContainer, and add it as a listener to Ticker to get updates each frame.
    isoContainer.addChild(this.sprite);

    this.sprite.on("click", this.handleEvt, this);
    this.sprite.on("dblclick", this.handleEvt, this);
    this.sprite.on("rollover", this.handleEvt, this);
    this.sprite.on("rollout", this.handleEvt, this);
    this.sprite.on("mousedown", this.handleEvt, this);
    this.sprite.on("pressmove", this.handleEvt, this);

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

p.initialize = function (entityId, texture) {
    this.entityId = entityId;
    this.texture = texture;
    this.loadData();
};
