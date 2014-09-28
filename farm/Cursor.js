/**
 * Created by CPU001 on 9/21/2014.
 */

var CURSOR_ARROW = 1;
var CURSOR_MOVE = 2;
var CURSOR_REMOVE = 3;
var CURSOR_BUY = 4;

var Cursor = function () {
    this.initialize();
};

var p = Cursor.prototype;


p._sprite_cursor = null;
p._grid_red = null;
p._grid_green = null;
p._grid_anchorX = 0;
p._grid_anchorY = 0;
p._isoLastMouseDown = null;
p.state = CURSOR_ARROW;

p.handleOnStageMove = function (evt) {
    if (this._sprite_cursor != null) {
        var isoP = stageToIso(gStage.mouseX, gStage.mouseY);
        this._sprite_cursor.setCellPosition(getCell(isoP.e(1)), getCell(isoP.e(2)));
        // render grid
        if (gIsoState.canAdd(this._sprite_cursor)) {
            this._grid_green.visible = true;
            this._grid_red.visible = false;
        }
        else {
            this._grid_green.visible = false;
            this._grid_red.visible = true;
        }
        this.updatePositionOfGrid();


        // change frame if Road
        if (this._sprite_cursor.entityType == ENTITY_TYPE_ROAD) {
//            gMap.execRoad(this._sprite_cursor);
//            gIsoState.execRoad(this._sprite_cursor, true);


        }
    }
};

p.setState = function( state ){
    this.state = state;
};

p.handleOnStageMouseDown = function (evt) {
    this._isoLastMouseDown = $V([evt.stageX, evt.stageY, 0]);
};

p.handleOnStageMouseUp = function (evt) {
};


p.attachIsoEntity = function (sprite) {
    gCursorsContainer.removeAllChildren();
    this._sprite_cursor = sprite;
    if (this._sprite_cursor != null) {
        // render  attach buidling
        var isoP = stageToIso(gStage.mouseX, gStage.mouseY);
        this._sprite_cursor.setCellPosition(getCell(isoP.e(1)), getCell(isoP.e(2)));
        this._sprite_cursor.alpha = 0.6;
        // render grid
        this.renderGrid(this._sprite_cursor.sizeX + 6, this._sprite_cursor.sizeY + 6);
        this.updatePositionOfGrid();
        this._grid_green.visible = false;

        gCursorsContainer.addChild(this._grid_red);
        gCursorsContainer.addChild(this._grid_green);
        gCursorsContainer.addChild(this._sprite_cursor);

    }else{
    }
};

p.handleOnStageClick = function (evt) {

    if (this._sprite_cursor != null && this._isoLastMouseDown != null) {
        var curPos = $V([evt.stageX, evt.stageY, 0]);
        if (curPos.distanceFrom(this._isoLastMouseDown) <= 5) {
            this._sprite_cursor.onCursorClick();
            if( this.state == CURSOR_BUY ){
                var new_instance = gIsoState.createIsoEntity(this._sprite_cursor.shop_data, this._sprite_cursor.cellX, this._sprite_cursor.cellY);
                gIsoState.add(new_instance);
                new_instance.onCreatedByCursorClick(this._sprite_cursor);
            }

        }
    }

    this._isoLastMouseDown = null;

};

p.renderGrid = function (width, height) {

    this._grid_anchorX = Math.floor(width / 2);
    this._grid_anchorY = Math.floor(height / 2);

    var g = this._grid_red.graphics;
    g.clear();
    g.beginStroke("#F00");
    // draw x
    var i = 0;
    var vbegin;
    var vend;
    while (i <= height) {
        vbegin = cellToScreen(0, i);
        vend = cellToScreen(width, i);
        g.moveTo(vbegin.e(1), vbegin.e(2));
        g.lineTo(vend.e(1), vend.e(2));
        i++;
    }

    i = 0;
    while (i <= width) {
        vbegin = cellToScreen(i, 0);
        vend = cellToScreen(i, height);
        g.moveTo(vbegin.e(1), vbegin.e(2));
        g.lineTo(vend.e(1), vend.e(2));
        i++;
    }
    g.endStroke();

    // Green
    g = this._grid_green.graphics;
    g.clear();
    g.beginStroke("#0F0");
    // draw x
    i = 0;
    while (i <= height) {
        vbegin = cellToScreen(0, i);
        vend = cellToScreen(width, i);
        g.moveTo(vbegin.e(1), vbegin.e(2));
        g.lineTo(vend.e(1), vend.e(2));
        i++;
    }

    i = 0;
    while (i <= width) {
        vbegin = cellToScreen(i, 0);
        vend = cellToScreen(i, height);
        g.moveTo(vbegin.e(1), vbegin.e(2));
        g.lineTo(vend.e(1), vend.e(2));
        i++;
    }
    g.endStroke();
};

p.updatePositionOfGrid = function () {
    var pos = isoToScreen($V([this._grid_anchorX * CELL_SIZE, this._grid_anchorY * CELL_SIZE, 0]));
    this._grid_red.x = this._sprite_cursor.x - pos.e(1);
    this._grid_red.y = this._sprite_cursor.y - pos.e(2);
    this._grid_green.x = this._grid_red.x;
    this._grid_green.y = this._grid_red.y;
};

//======================================= Constructor==========================
Cursor.prototype.initialize = function () {
    var g = new createjs.Graphics();
    this._grid_red = new createjs.Shape(g);
    g = new createjs.Graphics();
    this._grid_green = new createjs.Shape(g);
};
