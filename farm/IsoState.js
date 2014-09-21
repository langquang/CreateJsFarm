//this.createjs = this.createjs || {};

var IsoState = function () {
    this.initialize();
};

var p = IsoState.prototype;

// ===========================  properties =====================================

// ============
p._isoLastMouseDown = null;
p._isoIsPanning = false;
p.children = [];
p._genId = 0;

// =========================== functions ======================================
p.handleOnStageMove = function (evt) {

    if (gCanpan == false || this._isoLastMouseDown == null) {
        return;
    }
    var curPos = $V([evt.stageX, evt.stageY, 0]);
    this._isoIsPanning = curPos.distanceFrom(this._isoLastMouseDown) > 5;
    if (this._isoIsPanning) {
        gGameContainer.x += curPos.e(1) - this._isoLastMouseDown.e(1);
        gGameContainer.y += curPos.e(2) - this._isoLastMouseDown.e(2);
        this._isoLastMouseDown = curPos;

        var bgLocal = gBackground.localToGlobal(0, 0);
        if (bgLocal.x > 0)
            gGameContainer.x = 0;
        if (bgLocal.x + gBackground.getBounds().width < stageWidth)
            gGameContainer.x = stageWidth - gBackground.getBounds().width;
        if (bgLocal.y > 0)
            gGameContainer.y = 0;
        if (bgLocal.y + gBackground.getBounds().height < stageHeight)
            gGameContainer.y = stageHeight - gBackground.getBounds().height;

    }

};

p.handleOnStageMouseDown = function (evt) {
    this._isoLastMouseDown = $V([evt.stageX, evt.stageY, 0]);
};

p.handleOnStageMouseUp = function (evt) {
    this._isoLastMouseDown = null;
    this._isoIsPanning = false;
};

p.isPanning = function(){
  return this._isoIsPanning;
};

p.createEnities = function () {
//    for (var i = 20; i >= 0; i--) {
//        for (var j = 20; j >= 0; j--) {
//             this.createIsoEntity("building", i*2,j*2);
//        }
//
//    }

    var entity = this.createIsoEntity("building", 10,10);
    gCursor.setCursor(entity);

    this.showGrid(true, 0, 0, 40);
};

/**
 *
 * @param isVisible : bool
 * @param cellX : int posX of Grid
 * @param cellY : int posY of Grid
 * @param size : int size of Grid
 */
p.showGrid = function (isVisible, cellX, cellY, size) {
    gGridContainer.removeAllChildren();
    var g = new createjs.Graphics().beginStroke("#FFF");
    var s = new createjs.Shape(g);
    var pos = cellToScreen(cellX, cellY);
    s.x = pos.e(1);
    s.y = pos.e(2);

    // draw x
    var i = 0;
    var vbegin;
    var vend;
    while (i <= size) {
        vbegin = cellToScreen(cellX, cellY + i);
        vend = cellToScreen(cellX + size, cellY + i);
        g.moveTo(vbegin.e(1), vbegin.e(2));
        g.lineTo(vend.e(1), vend.e(2));
        i++;
    }

    i = 0;
    while (i <= size) {
        vbegin = cellToScreen(cellX + i, cellY);
        vend = cellToScreen(cellX + i, cellY + size);
        g.moveTo(vbegin.e(1), vbegin.e(2));
        g.lineTo(vend.e(1), vend.e(2));
        i++;
    }

    gGridContainer.addChild(s);
    this.centerOnCell(0, 0);


};

/**
 *
 * @param cellX : int
 * @param cellY : int
 */
p.centerOnCell = function (cellX, cellY) {
    var screenP = cellToScreen(cellX, cellY);
    gGameContainer.x = screenP.e(1) - gAnchorX + stageWidth / 2;
    gGameContainer.y = screenP.e(2) - gAnchorY + stageHeight / 2;

};

/**
 *
 */
p.createIsoEntity = function (building_type, cellX, cellY) {
    this._genId++;
    var entity = new IsoEntity(building_type, this._genId, "assets/" + building_type + ".json");
    entity.setCellPosition(cellX, cellY);
    gIsoContainer.addChild(entity);
    this.children.push(entity);
    return entity;
};


p.initialize = function () {
    this.createEnities();
};
