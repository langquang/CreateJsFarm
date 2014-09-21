/**
 * Created by CPU001 on 9/21/2014.
 */

var Cursor = function () {};

var p = Cursor.prototype;


p._sprite_cursor = null;
p._isoLastMouseDown = null;

p.handleOnStageMove = function (evt) {
    if (this._sprite_cursor != null) {
        var isoP = stageToIso(gStage.mouseX, gStage.mouseY);
        this._sprite_cursor.setCellPosition(getCell(isoP.e(1)), getCell(isoP.e(2)));
    }
};

p.handleOnStageMouseDown = function (evt) {
    this._isoLastMouseDown = $V([evt.stageX, evt.stageY, 0]);
};

p.handleOnStageMouseUp = function (evt) {
};


p.setCursor = function (sprite) {
    this._sprite_cursor = sprite;
    gCursorsContainer.removeAllChildren();
    gCursorsContainer.addChild(this._sprite_cursor);
};

p.handleOnStageClick = function (evt) {

    if (this._sprite_cursor != null && this._isoLastMouseDown != null) {
        var curPos = $V([evt.stageX, evt.stageY, 0]);
        if (curPos.distanceFrom(this._isoLastMouseDown) <= 5) {
            this._sprite_cursor.onCursorClick();
            gIsoState.createIsoEntity(this._sprite_cursor.buildingId, this._sprite_cursor.cellX, this._sprite_cursor.cellY);
        }
    }

    this._isoLastMouseDown = null;

};
