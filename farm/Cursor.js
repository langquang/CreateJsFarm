/**
 * Created by CPU001 on 9/21/2014.
 */

var Cursor = function () {
};

var p = Cursor.prototype;


p._sprite_cursor = null;
p._isoLastMouseDown = null;

p.handleOnStageMove = function (evt) {
    if (this._sprite_cursor != null) {
        var isoP = stageToIso(gStage.mouseX, gStage.mouseY);
        this._sprite_cursor.setCellPosition(getCell(isoP.e(1)), getCell(isoP.e(2)));

        // change frame if Road
        if( this._sprite_cursor.entityType == ENTITY_TYPE_ROAD ){
//            gMap.execRoad(this._sprite_cursor);
//            gIsoState.execRoad(this._sprite_cursor, true);
        }
    }
};

p.handleOnStageMouseDown = function (evt) {
    this._isoLastMouseDown = $V([evt.stageX, evt.stageY, 0]);
};

p.handleOnStageMouseUp = function (evt) {
};


p.setCursor = function (sprite) {
    gCursorsContainer.removeAllChildren();
    this._sprite_cursor = sprite;
    if( this._sprite_cursor != null ){
        var isoP = stageToIso(gStage.mouseX, gStage.mouseY);
        this._sprite_cursor.setCellPosition(getCell(isoP.e(1)), getCell(isoP.e(2)));
        gCursorsContainer.addChild(this._sprite_cursor);
    }
};

p.handleOnStageClick = function (evt) {

    if (this._sprite_cursor != null && this._isoLastMouseDown != null) {
        var curPos = $V([evt.stageX, evt.stageY, 0]);
        if (curPos.distanceFrom(this._isoLastMouseDown) <= 5) {
            this._sprite_cursor.onCursorClick();
            var new_instance = gIsoState.createIsoEntity(this._sprite_cursor.entityType, this._sprite_cursor.buildingId, this._sprite_cursor.cellX, this._sprite_cursor.cellY);
            new_instance.onCreatedByCursorClick(this._sprite_cursor);
        }
    }

    this._isoLastMouseDown = null;

};
