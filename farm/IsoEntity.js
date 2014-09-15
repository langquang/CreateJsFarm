this.createjs = this.createjs || {};
this.stage = this.stage || {};

var IsoEntity = function (entityId, texture) {
    this.initialize(entityId, texture);
};

var p = IsoEntity.prototype;

p.entityId = "";
p.texture = "";
p.sprite = null;

// this != this
p.handleEvt = function (evt) {
    if (evt.type == "rollover") {
        this.sprite.scaleX = 1.1;
        this.sprite.scaleY = 1.1;
    }
    else if (evt.type == "rollout") {
        this.sprite.scaleX = 1.0;
        this.sprite.scaleY = 1.0;
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
    document.getElementById("loader").className = "";
    // Define a spritesheet. Note that this data was exported by Zoë.
    var ss = new createjs.SpriteSheet(loader.getResult("building"));
    this.sprite = new createjs.Sprite(ss);
    this.sprite.x = 360;
    this.sprite.y = 200;
    this.sprite.gotoAndPlay(0);
    // Add sprite to the stage, and add it as a listener to Ticker to get updates each frame.
    stage.addChild(this.sprite);

    this.sprite.on("click", this.handleEvt, this);
    this.sprite.on("dblclick", this.handleEvt, this);
    this.sprite.on("rollover", this.handleEvt, this);
    this.sprite.on("rollout", this.handleEvt, this);
    this.sprite.on("mousedown", this.handleEvt, this);
    this.sprite.on("pressmove", this.handleEvt, this);

};

p.loadData = function () {
    var manifest = [
        {src: this.texture, id: "building"}
    ];

    // loader is global
    loader = new createjs.LoadQueue(false);
    var listener = loader.on("complete", this.loadDataCompleted, this);
    loader.loadManifest(manifest);
};

p.initialize = function (entityId, texture) {
    this.entityId = entityId;
    this.texture = texture;
    this.loadData();
};
