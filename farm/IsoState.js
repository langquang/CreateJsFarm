//this.createjs = this.createjs || {};

var IsoState = function (rootContainer, background, isoContainer) {
    this.initialize(rootContainer, background, isoContainer);
};

var p = IsoState.prototype;

// ===========================  properties =====================================
p.rootContainer = null;
p.background = null;
p.isoContainer = null;
// ============
p._isoLastMouseDown = null;
p._isoIsPanning = false;

// =========================== functions ======================================
p.handleOnStageMove = function (evt) {

    if (canpan == false || this._isoLastMouseDown == null) {
        return;
    }
    var curPos = $V([evt.stageX, evt.stageY, 0]);
    this._isoIsPanning = curPos.distanceFrom(this._isoLastMouseDown) > 5;
    if (this._isoIsPanning) {
        this.rootContainer.x += curPos.e(1) - this._isoLastMouseDown.e(1);
        this.rootContainer.y += curPos.e(2) - this._isoLastMouseDown.e(2);
        this._isoLastMouseDown = curPos;

    }

};

p.handleOnStageMouseDown = function (evt) {
    this._isoLastMouseDown = $V([evt.stageX, evt.stageY, 0]);
};

p.handleOnStageMouseUp = function (evt) {
    this._isoLastMouseDown = null;
};

p.registerEvents = function () {
    stage.on("stagemousemove", this.handleOnStageMove, this);
    stage.on("stagemousedown", this.handleOnStageMouseDown, this);
    stage.on("stagemouseup", this.handleOnStageMouseUp, this);
};

p.createEnities = function () {

    for(var i = 0; i< 50; i++)
    {
        var  entity = new IsoEntity("butin", "assets/building.json");
        entity.setPosition(Math.random()*800, Math.random()*600);
    }


    var  entity2 = new IsoEntity("butin2", "assets/runningGrant.json");
    entity2.setPosition(600, 600);

    var  entity3 = new IsoEntity("butin", "assets/building.json");
    entity3.setPosition(400, 600);
};

p.initialize = function (rootContainer, background, isoContainer) {
    this.rootContainer = rootContainer;
    this.background = background;
    this.isoContainer = isoContainer;
    this.createEnities();
    this.registerEvents();
};
