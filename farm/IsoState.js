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
p.children = [];

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

    var id = 0;
    for (var i = 20; i >0; i--) {
        for(var j = 0; j < 10; j++)
        {
            var entity = new IsoEntity("butin" + id, "assets/building.json");
            entity.setIsoPosition(1000 + j*70, -500+ i*70);
            this.children.push(entity);
            id++;
        }

    }
//
//    var entity = new IsoEntity("butin0", "assets/building.json");
//    entity.setIsoPosition(500,  0);
//    this.children.push(entity);
//
//    var entity2 = new IsoEntity("butin1", "assets/building.json");
//    entity2.setIsoPosition(600,  0);
//    this.children.push(entity2);
};


p.initialize = function (rootContainer, background, isoContainer) {
    this.rootContainer = rootContainer;
    this.background = background;
    this.isoContainer = isoContainer;
    this.createEnities();
    this.registerEvents();
};
