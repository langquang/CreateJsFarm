/**
 * Created by CPU001 on 9/21/2014.
 */

var MAP_SIZE = 100;
var IsoMap = function () {
    this.initialize();
};

var p = IsoMap.prototype;

//========================== Propertys ====================
p._data = null;
p._entities = new HashTable({});

//========================== Functions ====================

p.canAdd = function (isoEntity) {
    if (isoEntity.cellX - isoEntity.anchorX < 0) {
        return false;
    }
    if (isoEntity.cellX + isoEntity.anchorX >= MAP_SIZE) {
        return false;
    }
    if (isoEntity.cellY - isoEntity.anchorY < 0) {
        return false;
    }
    if (isoEntity.cellY + isoEntity.anchorY >= MAP_SIZE) {
        return false;
    }

    var i, j;
    for (i = isoEntity.cellX - isoEntity.anchorX; i < isoEntity.sizeX; i++) {
        for (j = isoEntity.cellY - isoEntity.anchorY; i < isoEntity.sizeY; j++) {
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

    var i, j;
    for (i = isoEntity.cellX - isoEntity.anchorX; i < isoEntity.sizeX; i++) {
        for (j = isoEntity.cellY - isoEntity.anchorY; i < isoEntity.sizeY; j++) {
            this._data[i][j] = isoEntity.entityId;
        }
    }

    this._entities.setItem(isoEntity.entityId, isoEntity);
    gIsoContainer.addChild(isoEntity);

    return true;

};

p.remove = function (isoEntity) {
    var i, j;
    for (i = isoEntity.cellX - isoEntity.anchorX; i < isoEntity.sizeX; i++) {
        for (j = isoEntity.cellY - isoEntity.anchorY; i < isoEntity.sizeY; j++) {
            this._data[i][j] = 0;
        }
    }

    this._entities.removeItem(isoEntity.entityId);
    gIsoContainer.remove(isoEntity);
};

p.getEntityAt = function (cellX, cellY) {
    if (this.validCell(cellX, cellY)) {
        return this._entities.getItem(this._data[cellX][cellY]);
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

p.execRoad = function (road) {
    if (!this.validCell(road.cellX, road.cellY)) {
        return;
    }

    var x = road.cellX;
    var y = road.cellY;
    var top = this.getEntityAt(x, y - 1);
    var bottom = this.getEntityAt(x, y + 1);
    var left = this.getEntityAt(x - 1, y);
    var right = this.getEntityAt(x + 1, y);

    //console.log(x, y, top != null ? "top": "", bottom != null ? "bottom" : "", left != null ? "left": "", right != null ? "right" : "");


    if( left != null && top != null && right != null && bottom != null )
    {
        road.gotoAndStop(14);
    }
    else  if( left != null && top != null && bottom != null ){
        road.gotoAndStop(0);
    }
    else if( top != null && right != null && bottom != null)
    {
        road.gotoAndStop(2);
    }
    else if( left != null && top != null && right != null )
    {
        road.gotoAndStop(6);
    }
    else if( left != null && right != null && bottom != null )
    {
        road.gotoAndStop(9);
    }
    else if( left != null && top != null )
    {
        road.gotoAndStop(5);
    }
    else if( left != null && right != null )
    {
        road.gotoAndStop(7);
    }
    else if( left != null && bottom != null )
    {
        road.gotoAndStop(8);
    }
    else if( top != null && right != null )
    {
        road.gotoAndStop(1);
    }
    else if( top != null && bottom != null )
    {
        road.gotoAndStop(3);
    }
    else if(right != null && bottom != null )
    {
        road.gotoAndStop(12);
    }
    else if( left != null)
    {
        road.gotoAndStop(10);
    }
    else if( top != null )
    {
        road.gotoAndStop(4);
    }
    else if( right != null)
    {
        road.gotoAndStop(11);
    }
    else if( bottom != null)
    {
        road.gotoAndStop(13);
    }
    road.gotoAndStop(15);

};


//========================== Constructor =================
p.initialize = function () {
    this._data = [];
    for (var i = 0; i < MAP_SIZE; i++) {
        this._data[i] = [];
        for (var j = 0; j < MAP_SIZE; j++) {
            this._data[i][j] = 0;
        }
    }
};


