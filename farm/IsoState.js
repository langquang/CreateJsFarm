//this.createjs = this.createjs || {};

var MAP_SIZE = 80;
var ZONE_PER_ROW = 8;
var ZONE_PER_COLUMN = 8;
var ZONE_SIZE = 10;

var IsoState = function () {
    this.initialize();
};

var p = IsoState.prototype;

// ===========================  properties =====================================
p.map_data = null;
p._entities = new HashTable({});
// ============
p._isoLastMouseDown = null;
p._isoIsPanning = false;
p.children = [];
p.zorderList = [];
p.product_gold = [];
p._genId = 0;
p._characterPoints = [];
p.characters = [];
p._zoneMap = null;
p._zones = [];

// =========================== functions ======================================
p.handleOnStageMove = function (evt) {

    if (this._isoLastMouseDown == null) {
        return;
    }
    var curPos = $V([evt.stageX, evt.stageY, 0]);
    this._isoIsPanning = curPos.distanceFrom(this._isoLastMouseDown) > 5;
    if (this._isoIsPanning) {
        gGameContainer.x += (curPos.e(1) - this._isoLastMouseDown.e(1))/gGameZoom;
        gGameContainer.y += (curPos.e(2) - this._isoLastMouseDown.e(2))/gGameZoom;
        this._isoLastMouseDown = curPos;
        reLocationGameContainer();

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
//    gCursor.attachIsoEntity(entity);

   // this.showGrid(true, 0, 0, 40);
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
    var screenP = cellToScreen(-cellX, -cellY);
    gGameContainer.x = screenP.e(1) - gAnchorX + stageWidth / 2;
    gGameContainer.y = screenP.e(2) - gAnchorY + stageHeight / 2;

};

/**
 *
 */
p.createIsoEntity = function (shop_data, cellX, cellY) {
    this._genId++;
    var entity = null;
    if (shop_data.type == ENTITY_TYPE_DECO) {
        entity = new IsoDeco(shop_data, this._genId);
    }
    else if (shop_data.type == ENTITY_TYPE_ROAD) {
        entity = new IsoRoad(shop_data, this._genId);
    }
    else if (shop_data.type == ENTITY_TYPE_BUILDING) {
        entity = new IsoBuidling(shop_data, this._genId);
    }
    else if (shop_data.type == ENTITY_TYPE_CHARACTER) {
        entity = new Character(this._genId);
    }
    else {
        entity = new IsoEntity(shop_data, this._genId);
    }
    entity.setCellPosition(cellX, cellY);
    return entity;
};


/**
 *
 */
p.createStableIsoEntity = function (shop_data, cellX, cellY, entityId) {
    var entity = this.createIsoEntity(shop_data, cellX, cellY);
    entity.entityId = entityId;
    return entity;
};


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

    var _x, _y;
    for (var i = 0; i < isoEntity.sizeX; i++) {
        for (var j = 0; j < isoEntity.sizeY; j++) {
            _x = isoEntity.cellX - isoEntity.anchorX + i;
            _y = isoEntity.cellY - isoEntity.anchorY + j;
            if(this.map_data[_x][_y] != "0"){
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
    if (isoEntity.entityType != ENTITY_TYPE_CHARACTER &&  !this.canAdd(isoEntity)) {
        return false;
    }

    var _x, _y;
    for (var i = 0; i < isoEntity.sizeX; i++) {
        for (var j = 0; j < isoEntity.sizeY; j++) {
            _x = isoEntity.cellX - isoEntity.anchorX + i;
            _y = isoEntity.cellY - isoEntity.anchorY + j;
            this.map_data[_x][_y] = isoEntity.entityId;
        }
    }

    this._entities.setItem(isoEntity.entityId, isoEntity);
    this.children.push(isoEntity);

    if( isoEntity.entityType == ENTITY_TYPE_BUILDING ){
        this.product_gold.push(isoEntity);
        gIsoContainer.addChild(isoEntity);
        this.zorderList.push(isoEntity);
    }
    else if(isoEntity.entityType == ENTITY_TYPE_ROAD){
        this.execRoad(isoEntity, true);
        gRoadsContainer.addChild(isoEntity);
    }
    else if( isoEntity.entityType == ENTITY_TYPE_DECO ){
        gIsoContainer.addChild(isoEntity);
        this.zorderList.push(isoEntity);
    }
    else if( isoEntity.entityType == ENTITY_TYPE_CHARACTER ){
         var exception;
         console.log(exception.error);
    }

    return true;

};

p.get = function(entityId){
    return this._entities.getItem(entityId);
};

p.remove = function (isoEntity) {
    var _x, _y;
    for (var i = 0; i < isoEntity.sizeX; i++) {
        for (var j = 0; j < isoEntity.sizeY; j++) {
            _x = isoEntity.cellX - isoEntity.anchorX + i;
            _y = isoEntity.cellY - isoEntity.anchorY + j;
            this.map_data[_x][_y] = "0";
        }
    }

    this._entities.removeItem(isoEntity.entityId);
    var index = this.children.indexOf(isoEntity);
    if (index > -1) {
        this.children.splice(index, 1);
    }

    index = this.zorderList.indexOf(isoEntity);
    if (index > -1) {
        this.zorderList.splice(index, 1);
    }

    if( isoEntity.entityType == ENTITY_TYPE_BUILDING ){
        index = this.product_gold.indexOf(isoEntity);
        if (index > -1) {
            this.product_gold.splice(index, 1);
        }
    }else if( isoEntity.entityType == ENTITY_TYPE_ROAD ){
        gRoadsContainer.removeChild(isoEntity);
    }else if( isoEntity.entityType == ENTITY_TYPE_CHARACTER ){
        var exception;
        console.log(exception.error);
    }


    gIsoContainer.removeChild(isoEntity);
};

p.removeAll = function(){
    this.initialize();
    gIsoContainer.removeAllChildren();
    gRoadsContainer.removeAllChildren();
    this.children = [];
    this.zorderList = [];
    this._characterPoints = [];
};

p.getEntityAt = function (cellX, cellY) {
    if (this.validCell(cellX, cellY)) {
        var isoEntity = this._entities.getItem(this.map_data[cellX][cellY]);
        return isoEntity;
    }
    return null;
};

p.getRoadAt = function (cellX, cellY) {
    if (this.validCell(cellX, cellY)) {
        var isoEntity = this._entities.getItem(this.map_data[cellX][cellY]);
        if( isoEntity != null && isoEntity.entityType == ENTITY_TYPE_ROAD ){
            return isoEntity;
        }
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
    var top = this.getRoadAt(x, y - 2);
    var bottom = this.getRoadAt(x, y + 1);
    var left = this.getRoadAt(x - 2, y);
    var right = this.getRoadAt(x + 1, y);
    if (top == null) {
        top = this.getRoadAt(x - 1, y - 2);
    }
    if (bottom == null) {
        bottom = this.getRoadAt(x - 1, y + 1);
    }
    if (left == null) {
        left = this.getRoadAt(x - 2, y - 1);
    }
    if (right == null) {
        right = this.getRoadAt(x + 1, y - 1);
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

p.createCharacters = function(){
    this.findAllCharacterPoints();
    var length = this._characterPoints.length < 20 ? this._characterPoints.length : 20;
    for (var i = 0; i < length; i++) {
        var character = this.createIsoEntity({type: ENTITY_TYPE_CHARACTER}, this._characterPoints[i].e(1), this._characterPoints[i].e(2));
        this.addCharacter(character);
    }
};

p.findAllCharacterPoints = function(){
    this._characterPoints = [];
    for (var i = 0; i < MAP_SIZE; i++)
    {
        for (var j = 0; j < MAP_SIZE; j++)
        {
            var road = this.getRoadAt(i, j);
            if (road != null)
            {
                var top = this.getRoadAt(i, j - 1);
                var bottom = this.getRoadAt(i, j + 1);
                var left = this.getRoadAt(i - 1, j);
                var right = this.getRoadAt(i + 1, j);

                if (left == null && top == null && right != null && bottom != null)	// left-top
                {
                    this._characterPoints.push($V([i, j]));
                }
                else if (left == null && top != null && right != null && bottom == null)	// left-bottom
                {
                    this._characterPoints.push($V([i, j]));
                }
                else if (left != null && top == null && right == null && bottom != null)	// right-top
                {
                    this._characterPoints.push($V([i, j]));
                }
                else if (left != null && top != null && right == null && bottom == null)	// right-bottom
                {
                    this._characterPoints.push($V([i, j]));
                }
                else if(left != null && top != null && right != null && bottom != null){
                    var left_bottom = this.getRoadAt(i-1, j + 1);
                    if( left_bottom == null ){
                        this._characterPoints.push($V([i, j]));
                    }

                    var right_bottom = this.getRoadAt(i+1, j + 1);
                    if( right_bottom == null ){
                        this._characterPoints.push($V([i, j]));
                    }

                    var left_top = this.getRoadAt(i-1, j - 1);
                    if( left_top == null ){
                        this._characterPoints.push($V([i, j]));
                    }

                    var right_top = this.getRoadAt(i+1, j - 1);
                    if( left_top == null ){
                        this._characterPoints.push($V([i, j]));
                    }
                }
            }
        }
    }
};

p.findNextWalkingPoint = function(src)
{
    if( src.e(1) == 57 && src.e(2) == 14 )
    {
        var aa =0
        aa++;
    }
    var targetPoints = [];
    var j, begin, end, add;
    for(var i = 0; i< this._characterPoints.length; i++)
    {
        var p = this._characterPoints[i];
        add = false;
        if ((p.e(1) != src.e(1) && p.e(2) == src.e(2)))
        {
            add = true;
            if(p.e(1) < src.e(1) )
            {
                begin = p.e(1);
                end = src.e(1);
                for(j=begin; j<end;j++){
                    if( this.getRoadAt(j, p.e(2)) == null){
                        add = false;
                        break;
                    }
                }

            }
            else{
                begin = src.e(1);
                end = p.e(1);
                for(j=begin; j<end;j++){
                    if( this.getRoadAt(j, p.e(2)) == null){
                        add = false;
                        break;
                    }
                }
            }
        }
        else if((p.e(1) == src.e(1) && p.e(2) != src.e(2)))
        {
            add = true;
            if(p.e(2) < src.e(2) )
            {
                begin = p.e(2);
                end = src.e(2);
                for(j=begin; j<end;j++){
                    if( this.getRoadAt(p.e(1), j) == null){
                        add = false;
                        break;
                    }
                }
            }
            else{
                begin = src.e(2);
                end = p.e(2);
                for(j=begin; j<end;j++){
                    if( this.getRoadAt(p.e(1),j) == null){
                        add = false;
                        break;
                    }
                }
            }
        }

        if( add )
        {
            targetPoints.push($V([p.e(1), p.e(2), 0]));
        }
    }

    if (targetPoints.length == 0)
    {
        return null;
    }

    return targetPoints[getRandomInt(0, targetPoints.length - 1)];
};

p.getRandomCharacterPoint = function(){
    return this._characterPoints[getRandomInt(0, this._characterPoints.length - 1)];
};


p.addCharacter = function(character){
    this.characters.push(character);
    gIsoContainer.addChild(character);
    this.zorderList.push(character);
};

p.removeCharacter = function(character){
    var index = this.characters.indexOf(character);
    if (index > -1) {
        this.characters.splice(index, 1);
    }

    index = this.zorderList.indexOf(character);
    if (index > -1) {
        this.zorderList.splice(index, 1);
    }

    gIsoContainer.removeChild(character);
};

p.unlockZone = function(blockId){

    var beginX = Math.floor((blockId - 1) / ZONE_PER_ROW);
    var beginY = Math.floor((blockId - 1) % ZONE_PER_ROW);
    this._zoneMap[beginX][beginY] = blockId;

    beginX *= ZONE_SIZE;
    beginY *= ZONE_SIZE;
    var endX = beginX + ZONE_SIZE;
    var endY = beginY + ZONE_SIZE;

    for (var i = beginX; i < endX; i++)
    {
        for (var j = beginY; j < endY; j++)
        {
            this.map_data[i][j] = 0;
        }
    }

    this._zones.push(blockId);
};

p.validZonePos = function(cellX, cellY){
    return !!(cellX >= 0 && cellX < ZONE_PER_COLUMN && cellY >= 0 && cellY < ZONE_PER_ROW);
};

p.renderMyZoneBorders = function(){

    gGridContainer.removeAllChildren();
    var g = new createjs.Graphics().beginStroke("#FFF");
    var s = new createjs.Shape(g);
//    gGridContainer.addChild(s);

//    g.beginFill("#ff0000");
//    g.drawRect(0,0,100,100);
//
//    var ppoint = cellToScreen(0, 0);
//    g.moveTo();


    var _this = this;
    this._zones.forEach(function (elemment, index, array) {
        var i = Math.floor((elemment - 1) / ZONE_PER_ROW);
        var j = Math.floor((elemment - 1) % ZONE_PER_ROW);

        var _x;
        var _y;

        var top = 0;
        var bottom = 0;
        var left = 0;
        var right = 0;

        _x = i - 1;
        _y = j;
        if (_this.validZonePos(_x, _y))
        {
            top = _this._zoneMap[_x][_y];
        }

        _x = i + 1;
        _y = j;
        if (_this.validZonePos(_x, _y))
        {
            bottom = _this._zoneMap[_x][_y];
        }

        _x = i;
        _y = j - 1;
        if (_this.validZonePos(_x, _y))
        {
            left = _this._zoneMap[_x][_y];
        }

        _x = i;
        _y = j + 1;
        if (_this.validZonePos(_x, _y))
        {
            right = _this._zoneMap[_x][_y];
        }

        if (top == 0 || bottom == 0 || left == 0 || right == 0)
        {

            var beginX;
            var beginY;
            var endX;
            var endY;
            var p;

            if (top == 0)
            {
                beginX = i * ZONE_SIZE;
                beginY = j * ZONE_SIZE;

                endX = beginX;
                endY = beginY + ZONE_SIZE;

                p = cellToScreen(beginX, beginY);
                g.moveTo(p.e(1), p.e(2));
                p = cellToScreen(endX, endY);
                g.lineTo(p.e(1), p.e(2));
            }

            if (bottom == 0)
            {
                beginX = (i + 1) * ZONE_SIZE;
                beginY = j * ZONE_SIZE;

                endX = beginX;
                endY = beginY + ZONE_SIZE;

                p = cellToScreen(beginX, beginY);
                g.moveTo(p.e(1), p.e(2));
                p = cellToScreen(endX, endY);
                g.lineTo(p.e(1), p.e(2));
            }

            if (left == 0)
            {
                beginX = i * ZONE_SIZE;
                beginY = j * ZONE_SIZE;

                endX = beginX + ZONE_SIZE;
                endY = beginY;

                p = cellToScreen(beginX, beginY);
                g.moveTo(p.e(1), p.e(2));
                p = cellToScreen(endX, endY);
                g.lineTo(p.e(1), p.e(2));
            }

            if (right == 0)
            {
                beginX = i * ZONE_SIZE;
                beginY = (j + 1) * ZONE_SIZE;

                endX = beginX + ZONE_SIZE;
                endY = beginY;

                p = cellToScreen(beginX, beginY);
                g.moveTo(p.e(1), p.e(2));
                p = cellToScreen(endX, endY);
                g.lineTo(p.e(1), p.e(2));
            }
        }
    });

    gGridContainer.addChild(s);

};

p.initialize = function () {
    this.map_data = [];
    for (var i = 0; i < MAP_SIZE; i++) {
        this.map_data[i] = [];
        for (var j = 0; j < MAP_SIZE; j++) {
            this.map_data[i][j] = -1;
        }
    }
    this.createEnities();
    this.centerOnCell(0, 0);

    this._zoneMap = [];
    for ( i = 0; i < ZONE_PER_ROW; i++) {
        this._zoneMap[i] = [];
        for ( j = 0; j < ZONE_PER_COLUMN; j++) {
            this._zoneMap[i][j] = 0;
        }
    }
    this._zones = [];

    var _this = this;
    var unlockZone = [1,2,3,4,5,6,9,10,11,12,13,14,17,18,19,20,21,22,25,26,27,28,29,30,33,34,35,36,37,38,41,42,43,44,45,46];
    unlockZone.forEach(function (elemment, index, array) {

        _this.unlockZone(elemment);

    });

    this.renderMyZoneBorders()

};
