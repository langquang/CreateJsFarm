//this.createjs = this.createjs || {};

var IsoState = function () {
    this.initialize();
};

var p = IsoState.prototype;

// ===========================  properties =====================================
p._data = null;
p._entities = new HashTable({});
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

p.isPanning = function () {
    return this._isoIsPanning;
};

p.createEnities = function () {
//    for (var i = 20; i >= 0; i--) {
//        for (var j = 20; j >= 0; j--) {
//             this.createIsoEntity("building", i*2,j*2);
//        }
//
//    }

//    var entity = this.createIsoEntity(ENTITY_TYPE_BUILDING, "buildings_025_cottage", 10, 10);
//    gCursor.setCursor(entity);

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
p.createIsoEntity = function (entity_type, building_type, cellX, cellY) {
    this._genId++;
    var entity_data = gShop._data_items[building_type];
    var entity = null;
    if (entity_type == ENTITY_TYPE_ROAD) {
        entity = new IsoRoad(building_type, this._genId, "assets/" + entity_data.texture + ".json");
    }
    else if( entity_type == ENTITY_TYPE_BUILDING )
    {
        entity = new IsoBuidling(building_type, this._genId, "assets/" + entity_data.texture + ".json");
    }
    else {
        entity = new IsoEntity(building_type, this._genId, "assets/" + entity_data.texture + ".json");
    }
    entity.setCellPosition(cellX, cellY);
    this.add(entity);
    return entity;
};

p.canAdd = function (isoEntity) {
    if (isoEntity.cellX - isoEntity.half_sizeX < 0) {
        return false;
    }
    if (isoEntity.cellX + isoEntity.half_sizeX >= MAP_SIZE) {
        return false;
    }
    if (isoEntity.cellY - isoEntity.half_sizeY < 0) {
        return false;
    }
    if (isoEntity.cellY + isoEntity.half_sizeY >= MAP_SIZE) {
        return false;
    }

    var i, j, maxX = isoEntity.cellX + isoEntity.half_sizeX, maxY = isoEntity.cellY + isoEntity.half_sizeY;
    for (i = isoEntity.cellX - isoEntity.half_sizeX; i < maxX; i++) {
        for (j = isoEntity.cellY - isoEntity.half_sizeY; j < maxY; j++) {
            if (this._data[i][j] > 0) {
                return false;
            }
        }
    }
    return true;
};

/**
 *Add obj to Map
 * @param isoEntity : IsoEntity
 * @return true if success
 */
p.add = function (isoEntity) {
    if (!this.canAdd(isoEntity)) {
        return false;
    }

    var i, j, maxX = isoEntity.cellX + isoEntity.half_sizeX, maxY = isoEntity.cellY + isoEntity.half_sizeY;
    for (i = isoEntity.cellX - isoEntity.half_sizeX; i < maxX; i++) {
        for (j = isoEntity.cellY - isoEntity.half_sizeY; j < maxY; j++) {
            this._data[i][j] = isoEntity.entityId;
        }
    }

    this._entities.setItem(isoEntity.entityId, isoEntity);
    this.children.push(isoEntity);
    gIsoContainer.addChild(isoEntity);

    return true;

};

p.remove = function (isoEntity) {
    var i, j, maxX = isoEntity.cellX + isoEntity.half_sizeX, maxY = isoEntity.cellY + isoEntity.half_sizeY;
    for (i = isoEntity.cellX - isoEntity.half_sizeX; i < maxX; i++) {
        for (j = isoEntity.cellY - isoEntity.half_sizeY; j < maxY; j++) {
            this._data[i][j] = 0;
        }
    }

    this._entities.removeItem(isoEntity.entityId);
    var index = this.children.indexOf(isoEntity);
    if (index > -1) {
        this.children.splice(index, 1);
    }
    gIsoContainer.remove(isoEntity);
};

p.getEntityAt = function (cellX, cellY) {
    if (this.validCell(cellX, cellY)) {
        var isoEntity = this._entities.getItem(this._data[cellX][cellY]);
        return isoEntity;
    }
    return null;
};

p.validCell = function (cellX, cellY) {
    if (cellX < 0) return false;
    if (cellX >= MAP_SIZE) return false;
    if (cellY < 0) return false;
    if (cellY >= MAP_SIZE) return false;
    return true;
};

p.execRoad = function (road, recursive) {
    if (!this.validCell(road.cellX, road.cellY)) {
        return;
    }

    var x = road.cellX;
    var y = road.cellY;
    var top = this.getEntityAt(x, y - 2);
    var bottom = this.getEntityAt(x, y + 1);
    var left = this.getEntityAt(x - 2, y);
    var right = this.getEntityAt(x + 1, y);
    if (top == null) {
        top = this.getEntityAt(x - 1, y - 2);
    }
    if (bottom == null) {
        bottom = this.getEntityAt(x - 1, y + 1);
    }
    if (left == null) {
        left = this.getEntityAt(x - 2, y - 1);
    }
    if (right == null) {
        right = this.getEntityAt(x + 1, y - 1);
    }


//    console.log(x, y, top != null ? "top": "", bottom != null ? "bottom" : "", left != null ? "left": "", right != null ? "right" : "");


    if (left != null && top != null && right != null && bottom != null) {
        road.gotoAndStop(14);
    }
    else if (left != null && top != null && bottom != null) {
        road.gotoAndStop(0);
    }
    else if (top != null && right != null && bottom != null) {
        road.gotoAndStop(2);
    }
    else if (left != null && top != null && right != null) {
        road.gotoAndStop(6);
    }
    else if (left != null && right != null && bottom != null) {
        road.gotoAndStop(9);
    }
    else if (left != null && top != null) {
        road.gotoAndStop(5);
    }
    else if (left != null && right != null) {
        road.gotoAndStop(7);
    }
    else if (left != null && bottom != null) {
        road.gotoAndStop(8);
    }
    else if (top != null && right != null) {
        road.gotoAndStop(1);
    }
    else if (top != null && bottom != null) {
        road.gotoAndStop(3);
    }
    else if (right != null && bottom != null) {
        road.gotoAndStop(12);
    }
    else if (left != null) {
        road.gotoAndStop(10);
    }
    else if (top != null) {
        road.gotoAndStop(4);
    }
    else if (right != null) {
        road.gotoAndStop(11);
    }
    else if (bottom != null) {
        road.gotoAndStop(13);
    }
    else {
        road.gotoAndStop(15);
    }

    if (recursive && left != null) {
        this.execRoad(left, false);
    }
    if (recursive && top != null) {
        this.execRoad(top, false);
    }
    if (recursive && right != null) {
        this.execRoad(right, false);
    }
    if (recursive && bottom != null) {
        this.execRoad(bottom, false);
    }

};


p.initialize = function () {
    this._data = [];
    for (var i = 0; i < MAP_SIZE; i++) {
        this._data[i] = [];
        for (var j = 0; j < MAP_SIZE; j++) {
            this._data[i][j] = 0;
        }
    }
    this.createEnities();
    this.centerOnCell(0, 0);

};
